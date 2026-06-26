import { createForm, formOptions } from "@tanstack/solid-form";
import { useInfiniteQuery, useMutation } from "@tanstack/solid-query";
import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import ArrowLeft from "lucide-solid/icons/arrow-left";
import ChevronRight from "lucide-solid/icons/chevron-right";
import Plus from "lucide-solid/icons/plus";
import Search from "lucide-solid/icons/search";
import Trash2 from "lucide-solid/icons/trash-2";
import { createMemo, createSignal, For, Show } from "solid-js";
import { orpc, orpcQuery } from "~/lib/orpc";

const HEADER_ROWS = ["id", "name", "description", ""];
const LIMIT = 5;

const FIND_BY_ID_FORM_OPTIONS = formOptions({
  defaultValues: {
    id: 0,
  } as {
    id: number;
  },
});

const CREATE_FORM_OPTIONS = formOptions({
  defaultValues: {
    name: "",
    description: "",
  } as {
    name: string;
    description: string;
  },
});

export default function Home() {
  const navigate = useNavigate();

  const [selectedPlanetId, setSelectedPlanetId] = createSignal<number | null>(
    null,
  );
  const [foundPlanet, setFoundPlanet] = createSignal<Awaited<
    ReturnType<typeof orpc.planet.find>
  > | null>(null);
  const [findByIdError, setFindByIdError] = createSignal<string | null>(null);
  const [planetIdToDelete, setPlanetIdToDelete] = createSignal<number | null>(
    null,
  );

  const planetsQuery = useInfiniteQuery(() =>
    orpcQuery.planet.list.infiniteOptions({
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      getPreviousPageParam: (firstPage) => firstPage.prevCursor,
      input: (pageParam) => ({ offset: pageParam, limit: LIMIT }),
    }),
  );

  const findPlanetMutation = useMutation(() => ({
    mutationFn: async (id: number) => {
      return orpc.planet.find({ id });
    },
    onMutate: () => {
      setFindByIdError(null);
      setFoundPlanet(null);
    },
    onSuccess: (planet) => {
      setFoundPlanet(planet);
    },
    onError: () => {
      setFindByIdError("Planet with this id was not found.");
    },
  }));

  const createPlanetMutation = useMutation(() =>
    orpcQuery.planet.create.mutationOptions({
      onSuccess: () => {
        planetsQuery.refetch();
        createPlanetForm.reset();
      },
    }),
  );

  const deletePlanetMutation = useMutation(() =>
    orpcQuery.planet.delete.mutationOptions({
      onSuccess: (_, variables) => {
        planetsQuery.refetch();

        if (selectedPlanetId() === variables.id) {
          setSelectedPlanetId(null);
        }

        setPlanetIdToDelete(null);
      },
    }),
  );

  const findByIdForm = createForm(() => ({
    ...FIND_BY_ID_FORM_OPTIONS,
    onSubmit: async ({ value }) => {
      setSelectedPlanetId(value.id);
      findPlanetMutation.mutate(value.id);
    },
  }));

  const createPlanetForm = createForm(() => ({
    ...CREATE_FORM_OPTIONS,
    onSubmit: async ({ value }) => {
      const name = value.name.trim();
      const description = value.description.trim();

      if (!name) {
        return;
      }

      createPlanetMutation.mutate({
        name,
        description: description || undefined,
      });
    },
  }));

  const planetListData = createMemo(() => {
    const totalCount = planetsQuery.data?.pages?.[0]?.total ?? 0;

    let lastCursor = (planetsQuery?.data?.pageParams?.at(-1) ?? 0) + LIMIT;
    if (lastCursor > totalCount) {
      lastCursor = totalCount;
    }

    const allPlanets =
      planetsQuery.data?.pages?.flatMap((page) => page.data) ?? [];

    return { totalCount, lastCursor, allPlanets };
  });

  const visibleFoundPlanet = createMemo(() => {
    const planet = foundPlanet();

    if (!planet) {
      return false;
    }

    return planetListData().allPlanets.some(
      (listPlanet) => listPlanet.id === planet.id,
    );
  });

  const nextPlanetId = createMemo(
    () => (planetListData().allPlanets.at(-1)?.id ?? 0) + 1,
  );

  return (
    <>
      <header class="px-8 py-4 w-full bg-base-100 border-b border-base-200 flex items-center justify-between">
        <button
          class="btn btn-link text-base-300 no-underline size-auto px-0 font-medium"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <code class="text-xs font-medium text-info">bunforge / example</code>
      </header>
      <main class="h-full bg-base max-w-6xl mx-auto px-8 py-10">
        <Title>Bunforge - Example</Title>

        <h1 class="text-3xl">Planets Explorer</h1>
        <p class="text-sm text-base-300 font-medium mt-1.5">
          Functional CRUD demo — list, find by ID, create, delete with cursor
          pagination.
        </p>

        <div class="grid grid-cols-[1fr_320px] gap-8 mt-10">
          <div class="flex flex-col gap-6">
            <span class="text-sm space-x-3">
              <span class="font-semibold">Planet List</span>
              <code class="text-xs py-1 px-2 border border-base-200 rounded-md text-base-200">
                {planetListData().totalCount} total
              </code>
              <code class="text-xs text-base-200">cursor:</code>
              <code class="text-xs text-base-300">
                {planetListData().lastCursor}
              </code>
            </span>
            <div class="overflow-x-auto rounded-box border border-base-200 bg-base-200">
              <table class="table">
                <thead>
                  <tr>
                    {HEADER_ROWS.map((col) => (
                      <th class="px-4 py-2 border-b border-base-200">
                        <code class="text-xs text-base-300">{col}</code>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <For each={planetListData().allPlanets}>
                    {(planet) => {
                      const isHighlighted = () =>
                        foundPlanet()?.id === planet.id && visibleFoundPlanet();

                      return (
                        <tr
                          classList={{
                            "bg-base-100 group": true,
                            "hover:bg-gray-200 hover:dark:bg-gray-800":
                              !isHighlighted(),
                            "bg-gray-300 dark:bg-gray-700": isHighlighted(),
                          }}
                        >
                          <th class="border-b border-base-200">
                            <code class="text-base-300">{planet.id}</code>
                          </th>
                          <td class="border-b border-base-200 font-medium">
                            {planet.name}
                          </td>
                          <td class="border-b text-base-300 border-base-200">
                            {planet.description}
                          </td>
                          <td class="border-b border-base-200 w-12">
                            <button
                              class="cursor-pointer p-2"
                              aria-label={`Delete ${planet.name}`}
                              onClick={() => setPlanetIdToDelete(planet.id)}
                            >
                              <Trash2
                                size={16}
                                class="invisible group-hover:visible text-base-300 hover:text-error"
                              />
                            </button>
                          </td>
                        </tr>
                      );
                    }}
                  </For>
                </tbody>
              </table>
            </div>
            <Show
              when={planetListData().lastCursor < planetListData().totalCount}
            >
              <button
                class="btn btn-outline border-base-200"
                onClick={() => planetsQuery.fetchNextPage()}
              >
                <ChevronRight size={16} />
                <span>Load More</span>
                <code class="text-sm text-base-300">
                  ({planetListData().totalCount - planetListData().lastCursor}{" "}
                  remaining)
                </code>
              </button>
            </Show>
          </div>
          <div class="flex flex-col gap-6">
            <findByIdForm.Field name="id">
              {(field) => (
                <div class="card border border-base-200 rounded-xl bg-base-200">
                  <div class="px-4 py-3 border-b border-base-200">
                    <code class="card-title text-sm text-base-300 uppercase">
                      <Search size={12} /> Find by ID
                    </code>
                  </div>
                  <div class="card-body p-4 bg-base-100 rounded-b-xl gap-4">
                    <form
                      class="flex flex-row gap-3"
                      onSubmit={(e) => {
                        e.preventDefault();
                        findByIdForm.handleSubmit();
                      }}
                    >
                      <input
                        id={field().name}
                        name={field().name}
                        value={field().state.value}
                        type="number"
                        min="1"
                        placeholder="e.g. 3"
                        class="input flex-1"
                        onInput={(e) =>
                          field().handleChange(e.target.valueAsNumber)
                        }
                      />
                      <button
                        type="submit"
                        class="btn btn-info text-sm"
                        disabled={
                          !field().state.value ||
                          Number.isNaN(field().state.value)
                        }
                      >
                        Find
                      </button>
                    </form>

                    <Show when={findPlanetMutation.isPending}>
                      <span class="loading loading-dots loading-sm text-info self-start" />
                    </Show>

                    <Show when={findByIdError()}>
                      <div class="alert alert-error alert-soft">
                        <span>{findByIdError()}</span>
                      </div>
                    </Show>

                    <Show when={foundPlanet()}>
                      {(planet) => (
                        <div class="card border border-base-200 bg-base-100 shadow-sm">
                          <div class="card-body p-4 gap-2">
                            <div class="flex items-center justify-between gap-3">
                              <div>
                                <p class="font-semibold">{planet().name}</p>
                                <code class="text-xs text-base-300">
                                  id: {planet().id}
                                </code>
                              </div>
                              <Show when={visibleFoundPlanet()}>
                                <span class="badge badge-info badge-soft">
                                  Highlighted in table
                                </span>
                              </Show>
                            </div>
                            <p class="text-sm text-base-300">
                              {planet().description || "No description"}
                            </p>
                          </div>
                        </div>
                      )}
                    </Show>
                  </div>
                </div>
              )}
            </findByIdForm.Field>
            <div class="card border border-base-200 rounded-xl bg-base-200">
              <div class="px-4 py-3 border-b border-base-200">
                <code class="card-title text-sm text-base-300 uppercase">
                  <Plus size={12} /> Create Planet
                </code>
              </div>
              <div class="card-body p-4 bg-base-100 rounded-b-xl gap-4">
                <createPlanetForm.Field name="name">
                  {(field) => {
                    const showNameError = () =>
                      field().state.meta.isBlurred &&
                      field().state.value.trim().length === 0;

                    return (
                      <fieldset class="fieldset">
                        <legend class="fieldset-legend text-base-300 pt-0">
                          <code>Name</code>
                        </legend>
                        <input
                          id={field().name}
                          name={field().name}
                          type="text"
                          class="input w-full"
                          placeholder="e.g. Pluto"
                          value={field().state.value}
                          onInput={(e) => field().handleChange(e.target.value)}
                          onBlur={field().handleBlur}
                        />
                        <Show when={showNameError()}>
                          <p class="text-sm text-error mt-2">
                            Name is required.
                          </p>
                        </Show>
                      </fieldset>
                    );
                  }}
                </createPlanetForm.Field>

                <createPlanetForm.Field name="description">
                  {(field) => (
                    <fieldset class="fieldset">
                      <legend class="fieldset-legend text-base-300 pt-0">
                        <code>Description</code>
                      </legend>
                      <input
                        id={field().name}
                        name={field().name}
                        type="text"
                        class="input w-full"
                        placeholder="Brief description"
                        value={field().state.value}
                        onInput={(e) => field().handleChange(e.target.value)}
                      />
                    </fieldset>
                  )}
                </createPlanetForm.Field>

                <code class="text-base-200 text-xs">
                  id will be assigned:{" "}
                  <span class="text-base-300">{nextPlanetId()}</span>
                </code>

                <Show when={createPlanetMutation.isError}>
                  <div class="alert alert-error alert-soft">
                    <span>
                      Unable to create planet. Please check the form and try
                      again.
                    </span>
                  </div>
                </Show>

                <createPlanetForm.Subscribe
                  selector={(state) => ({
                    name: state.values.name,
                  })}
                >
                  {(state) => (
                    <button
                      class="btn btn-info text-sm mt-2"
                      disabled={
                        createPlanetMutation.isPending ||
                        state().name.trim().length === 0
                      }
                      onClick={() => createPlanetForm.handleSubmit()}
                    >
                      <Plus size={16} />
                      {createPlanetMutation.isPending
                        ? "Creating..."
                        : "Create"}
                    </button>
                  )}
                </createPlanetForm.Subscribe>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Show when={planetIdToDelete() !== null}>
        <dialog open class="modal">
          <div class="modal-box">
            <h3 class="text-lg font-semibold">Delete planet?</h3>
            <p class="py-4 text-sm text-base-300">
              This action will remove the planet from the current in-memory
              list.
            </p>
            <div class="modal-action">
              <button
                class="btn btn-ghost"
                onClick={() => setPlanetIdToDelete(null)}
              >
                Cancel
              </button>
              <button
                class="btn btn-error"
                disabled={deletePlanetMutation.isPending}
                onClick={() => {
                  const id = planetIdToDelete();

                  if (id === null) {
                    return;
                  }

                  deletePlanetMutation.mutate({ id });
                }}
              >
                {deletePlanetMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
          <button
            class="modal-backdrop"
            aria-label="Close delete confirmation"
            onClick={() => setPlanetIdToDelete(null)}
          />
        </dialog>
      </Show>
    </>
  );
}
