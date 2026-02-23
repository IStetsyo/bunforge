import z from "zod";
declare const _default: {
    list: import("@orpc/server").DecoratedProcedure<Record<never, never>, Record<never, never>, z.ZodObject<{
        limit: z.ZodOptional<z.ZodNumber>;
        cursor: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>, import("@orpc/server").Schema<{
        id: number;
        name: string;
    }[], {
        id: number;
        name: string;
    }[]>, Record<never, never>, Record<never, never>>;
    find: import("@orpc/server").DecoratedProcedure<Record<never, never>, Record<never, never>, z.ZodObject<{
        id: z.ZodNumber;
    }, z.core.$strip>, import("@orpc/server").Schema<{
        id: number;
        name: string;
    }, {
        id: number;
        name: string;
    }>, Record<never, never>, Record<never, never>>;
    create: import("@orpc/server").DecoratedProcedure<Record<never, never>, Record<never, never>, z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>, import("@orpc/server").Schema<{
        id: number;
        name: string;
    }, {
        id: number;
        name: string;
    }>, Record<never, never>, Record<never, never>>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map