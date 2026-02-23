import { createSignal } from "solid-js";
import "./Counter.css";
import { createQuery } from "@tanstack/solid-query";
import { orpcQuery } from "~/lib/orpc";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const query = createQuery(() =>
    orpcQuery.planet.find.queryOptions({
      input: { id: 1 },
    }),
  );

  console.log("Query result:", query.data);
  return (
    <button
      class=" bg-black text-white w-fit"
      onClick={() => setCount(count() + 1)}
      type="button"
    >
      Web Clicks: {count()}
    </button>
  );
}
