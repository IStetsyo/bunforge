import { RouterClient } from "@orpc/server";
export declare const router: {
    planet: {
        list: import("@orpc/server").DecoratedProcedure<Record<never, never>, Record<never, never>, import("zod").ZodObject<{
            limit: import("zod").ZodOptional<import("zod").ZodNumber>;
            cursor: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, import("zod/v4/core").$strip>, import("@orpc/server").Schema<{
            id: number;
            name: string;
        }[], {
            id: number;
            name: string;
        }[]>, Record<never, never>, Record<never, never>>;
        find: import("@orpc/server").DecoratedProcedure<Record<never, never>, Record<never, never>, import("zod").ZodObject<{
            id: import("zod").ZodNumber;
        }, import("zod/v4/core").$strip>, import("@orpc/server").Schema<{
            id: number;
            name: string;
        }, {
            id: number;
            name: string;
        }>, Record<never, never>, Record<never, never>>;
        create: import("@orpc/server").DecoratedProcedure<Record<never, never>, Record<never, never>, import("zod").ZodObject<{
            name: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
        }, import("zod/v4/core").$strip>, import("@orpc/server").Schema<{
            id: number;
            name: string;
        }, {
            id: number;
            name: string;
        }>, Record<never, never>, Record<never, never>>;
    };
};
export type AppRouter = typeof router;
export type AppRouterClient = RouterClient<AppRouter>;
//# sourceMappingURL=index.d.ts.map