import * as z from "zod";

export const schema = z.object({
  title: z.string().min(1),
  content: z.string(),
  completed: z.boolean().default(false),
});

export type ToDoFormData = z.infer<typeof schema>;
