import { z } from 'zod';

// reusable zod
const StringScalar = z.string().trim().min(1, 'Required');

export const signupSchema = z.object({
  email: StringScalar.email('Invalid email address'),
  username: StringScalar.regex(
    /^[a-zA-Z0-9_-]+$/,
    'Only letters, numbers, - and _n allowed'
  ),
  password: StringScalar.min(8, 'Password must be at least 8 chars'),
});

export type SignUpValues = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  username: StringScalar,
  password: StringScalar.min(8, 'Password must be at least 8 chars'),
});

export type LoginValues = z.infer<typeof loginSchema>;
