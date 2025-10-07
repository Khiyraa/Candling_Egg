import z from 'zod';

export const profileSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.email('Email tidak valid'),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Password minimal 6 karakter'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    confirmPassword: z
      .string()
      .min(6, 'Konfirmasi password minimal 6 karakter'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password dan konfirmasi password harus sama',
    path: ['confirmPassword'],
  });
