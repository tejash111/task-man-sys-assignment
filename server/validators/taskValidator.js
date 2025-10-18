import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string()
        .min(1, 'Title is required')
        .max(200, 'Title must not exceed 200 characters')
        .trim(),
    description: z.string()
        .max(1000, 'Description must not exceed 1000 characters')
        .optional()
        .nullable(),
    priority: z.enum(['Low', 'Medium', 'High'], {
        errorMap: () => ({ message: 'Priority must be Low, Medium, or High' })
    }),
    status: z.enum(['Todo', 'In Progress', 'Completed'], {
        errorMap: () => ({ message: 'Status must be Todo, In Progress, or Completed' })
    }).default('Todo'),
    dueDate: z.string()
        .datetime({ message: 'Invalid date format' })
        .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (use YYYY-MM-DD or ISO 8601)'))
        .optional()
        .nullable()
});

export const updateTaskSchema = z.object({
    title: z.string()
        .min(1, 'Title is required')
        .max(200, 'Title must not exceed 200 characters')
        .trim()
        .optional(),
    description: z.string()
        .max(1000, 'Description must not exceed 1000 characters')
        .optional()
        .nullable(),
    priority: z.enum(['Low', 'Medium', 'High'], {
        errorMap: () => ({ message: 'Priority must be Low, Medium, or High' })
    }).optional(),
    status: z.enum(['Todo', 'In Progress', 'Completed'], {
        errorMap: () => ({ message: 'Status must be Todo, In Progress, or Completed' })
    }).optional(),
    dueDate: z.string()
        .datetime({ message: 'Invalid date format' })
        .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (use YYYY-MM-DD or ISO 8601)'))
        .optional()
        .nullable()
}).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update'
});

export const taskIdSchema = z.object({
    id: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid task ID format')
});
