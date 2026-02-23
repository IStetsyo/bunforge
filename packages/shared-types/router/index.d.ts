import * as _orpc_server from '@orpc/server';
import { RouterClient } from '@orpc/server';
import * as zod_v4_core from 'zod/v4/core';
import * as zod from 'zod';

declare const router: {
    planet: {
        list: _orpc_server.DecoratedProcedure<Record<never, never>, Record<never, never>, zod.ZodObject<{
            limit: zod.ZodOptional<zod.ZodNumber>;
            cursor: zod.ZodDefault<zod.ZodNumber>;
        }, zod_v4_core.$strip>, _orpc_server.Schema<{
            id: number;
            name: string;
        }[], {
            id: number;
            name: string;
        }[]>, Record<never, never>, Record<never, never>>;
        find: _orpc_server.DecoratedProcedure<Record<never, never>, Record<never, never>, zod.ZodObject<{
            id: zod.ZodNumber;
        }, zod_v4_core.$strip>, _orpc_server.Schema<{
            id: number;
            name: string;
        }, {
            id: number;
            name: string;
        }>, Record<never, never>, Record<never, never>>;
        create: _orpc_server.DecoratedProcedure<Record<never, never>, Record<never, never>, zod.ZodObject<{
            name: zod.ZodString;
            description: zod.ZodOptional<zod.ZodString>;
        }, zod_v4_core.$strip>, _orpc_server.Schema<{
            id: number;
            name: string;
        }, {
            id: number;
            name: string;
        }>, Record<never, never>, Record<never, never>>;
    };
};
type AppRouter = typeof router;
type AppRouterClient = RouterClient<AppRouter>;

export { type AppRouter, type AppRouterClient, router };
