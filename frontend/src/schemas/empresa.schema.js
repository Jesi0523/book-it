import { z } from 'zod';

// Tipos MIME permitidos
const validImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

// Extensiones de texto permitidas
const validExtensions = ['.png', '.jpeg', '.jpg', '.webp'];

// Validar si una imagen ya estaba en la BD o el tipo de formato
const isValidFile = (val) => {
  if (typeof val === 'string') return true; // Imagen que ya estaba en la BD

  if (val instanceof File) {
    const hasValidType = validImageTypes.includes(val.type);

    const fileName = val.name.toLowerCase();
    const hasValidExtension = validExtensions.some((ext) =>
      fileName.endsWith(ext),
    );

    return hasValidType && hasValidExtension;
  }

  return false;
};

export const empresaSchema = z.object({
  logo: z
    .any()
    .refine(
      (val) => val !== null && val !== '',
      'El logo de la empresa es obligatorio',
    )
    .refine(isValidFile, 'El logo debe ser PNG, JPEG, JPG o WEBP.'),
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(100, 'Máximo 100 caracteres'),
  correo: z.string().email('Correo electrónico inválido'),
  telefono: z
    .string()
    .regex(
      /^\d{10,15}$/,
      'El teléfono debe tener entre 10 y 15 dígitos numéricos',
    ),
  descripcion: z
    .string()
    .min(1, 'La descripción es obligatoria')
    .max(1000, 'Máximo 1000 caracteres')
    .refine(
      (val) => val.length === 0 || val.length >= 10,
      'La descripción es muy corta',
    ),
  slogan: z
    .string()
    .min(1, 'El slogan es obligatorio')
    .max(500, 'Máximo 500 caracteres'),
  direccion: z.string().min(1, 'La dirección es obligatoria'),

  horario: z
    .any()
    .refine(
      (map) => Object.values(map || {}).some((arr) => arr.length > 0),
      'Debes asignar al menos un horario laboral en la semana',
    ),

  imagenPrincipal: z
    .any()
    .refine(
      (val) => val !== null && val !== '',
      'La imagen principal es obligatoria',
    )
    .refine(isValidFile, 'La imagen principal debe ser PNG, JPEG, JPG o WEBP.'),

  galeria: z
    .any()
    .refine(
      (data) => data.urls.length > 0,
      'Debes subir al menos una imagen para la galería',
    )
    .refine(
      (data) => data.files.every(isValidFile),
      'Una o más imágenes de la galería tienen un formato inválido. Solo PNG, JPEG, JPG o WEBP.',
    ),
});
