import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

/** Upper bound for a post name, to keep stored strings reasonable. */
export const MAX_POST_NAME_LENGTH = 255;

export const postRouter = createTRPCRouter({
  /** Scaffold example; remove once real public routes exist. */
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({ name: z.string().trim().min(1).max(MAX_POST_NAME_LENGTH) }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  /** Scaffold example used by the home page to demo protected routes. */
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
