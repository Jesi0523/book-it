import { z } from 'zod';

export const empresaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  correo: z.string().email('Correo electrónico inválido'),
  telefono: z.string().regex(/^\d{10}$/, 'El teléfono debe tener 10 dígitos'),
  descripcion: z.string().min(10, 'La descripción es obligatoria'),
  slogan: z.string().min(1, 'El slogan es obligatorio'),
  direccion: z.string().min(1, 'La dirección es obligatoria'),
  horarioglobal: z.string().min(1, 'El horario laboral es obligatorio'),

  imagenPrincipal: z
    .any()
    .refine((file) => file?.length !== 0, 'La imagen principal es obligatoria'),

  nuevasfotosgaleria: z
    .any()
    .refine(
      (files) => files?.length > 0,
      'Debes subir al menos una foto para la galería',
    ),

  galeriaconservada: z.array(z.string()).optional(), // URL de fotos que ya existen
});
