import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(3, { message: 'Name must be 3 or more characters long' }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Email must have valid format' }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(6, { message: 'Password must be 3 or more characters long' }),
  role: z.string({
    required_error: 'Role is required',
    invalid_type_error: 'Role must be a string',
  }),
});

export type User = z.infer<typeof userSchema>;
