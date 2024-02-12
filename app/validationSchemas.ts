import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string().min(1, { message: 'Title is required'}).max(255),
    description: z
    .string()
    .min(1, "Description is required.")
    .max(65535),
    dueDate: z.union([z.string(), z.date()]) 
        .refine((value) => {
            if (typeof value === 'string') {
                const date = new Date(value);
                return !isNaN(date.getTime());
            } else if (value instanceof Date) {
                return true;
            }
            return false;
        }, { message: "Invalid date" })
        .transform((value) => {
            if (typeof value === 'string') {
                return new Date(value);
            } else {
                return value;
            }
        }),
});

export const patchTaskSchema = z.object({
    title: z
      .string()
      .min(1, "Title is required.")
      .max(255)
      .optional(),
    description: z
      .string()
      .min(1, "Description is required.")
      .max(65535)
      .optional(),
  });