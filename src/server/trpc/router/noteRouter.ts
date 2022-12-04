import { Note } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "./../trpc";
import { router } from "../trpc";
import { z } from "zod";

const noteRouter = router({
  addNote: publicProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { title, content } = input;
      if (ctx.session?.user?.id) {
        const note = await ctx.prisma.note.create({
          data: {
            title,
            content,
            userId: ctx.session.user.id,
          },
        });
        return note;
      }
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }),
  getAllNotes: publicProcedure.query(async ({ ctx }) => {
    if (ctx.session?.user?.id) {
      return await ctx.prisma.note.findMany({
        where: { userId: ctx.session.user.id },
      });
    }
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }),
  deleteNote: publicProcedure
    .input(z.object({ userId: z.string(), noteId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { userId, noteId } = input;
      if (userId === ctx.session?.user?.id) {
        return await ctx.prisma.note.delete({
          where: { id: noteId },
        });
      }
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }),

  updateNote: publicProcedure
    .input(
      z.object({ title: z.string(), content: z.string(), noteId: z.string() })
    )
    .mutation(async ({ input, ctx }) => {
      const { title, content, noteId } = input;
      if (ctx.session?.user) {
        return await ctx.prisma.note.update({
          where: {
            id: noteId,
          },
          data: {
            title: title,
            content: content,
          },
        });
      }
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }),
});

export default noteRouter;
