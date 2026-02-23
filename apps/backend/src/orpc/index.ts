import { ORPCError, os } from "@orpc/server";

export async function createRPCContext(opts: {
  headers: Headers;
  request: Request;
}) {
  const session = {};

  return {
    headers: opts.headers,
    request: opts.request,
    session,
  };
}

const o = os.$context<Awaited<ReturnType<typeof createRPCContext>>>();
const logMiddleware = o.middleware(async ({ next, path, context }) => {
  const requestData = context.request?.body
    ? await context.request?.json()
    : null;
  let responseData = null;
  const start = Date.now();
  try {
    const response = await next();
    responseData = response.output;
    return response;
  } finally {
    console.info(
      `[${new Date().toISOString()}] ${path} - ${Date.now() - start}ms`,
    );
    console.info("Request:", JSON.stringify(requestData));
    console.info("Response:", JSON.stringify(responseData));
  }
});

export const publicProcedure = o.use(logMiddleware);

export const protectedProcedure = publicProcedure.use(({ context, next }) => {
  if (!("user" in context.session)) {
    throw new ORPCError("UNAUTHORIZED");
  }

  return next({
    context: {
      session: { ...context.session, user: context.session.user },
    },
  });
});
