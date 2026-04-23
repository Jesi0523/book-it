import { z } from 'zod';

export const loginSchema = z.object({
  correo: z.string().email('Ingresa un correo electrónico válido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});
