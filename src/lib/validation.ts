import { z } from 'zod';

// reusable zod
const StringScalar = z.string().trim().min(1, 'Required');

export const signupSchema = z.object({
  email: StringScalar.email('Invalid email address'),
  username: StringScalar.regex(
    /^[a-zA-Z0-9_-]+$/,
    'Only letters, numbers, - and _n allowed'
  ),
  password: StringScalar,
});
