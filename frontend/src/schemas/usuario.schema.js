import { z } from 'zod';

const calcularEdad = (dateString) => {
  const today = new Date();
  const [year, month, day] = dateString.split('-');
  const birthDate = new Date(year, month - 1, day);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export const updatePerfilSchema = z
  .object({
    nombre: z
      .string()
      .min(1, { message: 'El nombre no puede estar vacío.' })
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(80, 'El nombre no puede exceder los 80 caracteres')
      .regex(
        /^(?! )[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+(?<! )$/,
        'El nombre no puede iniciar ni terminar con espacios. Tampoco puede tener caracteres especiales.',
      ),
    fechaNacimiento: z
      .string()
      .min(1, 'Ingresa tu fecha de nacimiento')
      // Min 18 años
      .refine((dateString) => calcularEdad(dateString) >= 18, {
        message: 'Debes ser mayor de 18 años para registrarte',
      })
      // Max 150 años
      .refine((dateString) => calcularEdad(dateString) <= 150, {
        message: 'Ingresa una fecha de nacimiento válida',
      }),
    sexo: z
      .string({
        invalid_type_error: 'Selecciona tu sexo',
        required_error: 'Selecciona tu sexo',
      })
      .regex(/^[MF]$/, 'Selecciona tu sexo'),
    correo: z
      .string({ required_error: 'El correo es obligatorio' })
      .min(1, 'El correo es obligatorio')
      .email('Ingresa un correo electrónico válido'),
    telefono: z
      .string()
      .min(1, 'El teléfono es requerido')
      .regex(/^\d{10}$/, 'Ingresa un número de celular válido de 10 dígitos'),

    password: z.string().optional().or(z.literal('')),

    confirmPassword: z.string().optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    // Si el usuario escribio una contraseña, aplicamos todas las reglas
    if (data.password && data.password.length > 0) {
      if (/\s/.test(data.password)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'La contraseña no puede contener espacios',
          path: ['password'],
        });
      }
      if (data.password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Mínimo 8 caracteres',
          path: ['password'],
        });
      }
      if (data.password.length > 20) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Máximo 20 caracteres',
          path: ['password'],
        });
      }
      if (!/[a-z]/.test(data.password)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Debe contener al menos una minúscula',
          path: ['password'],
        });
      }
      if (!/[A-Z]/.test(data.password)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Debe contener al menos una mayúscula',
          path: ['password'],
        });
      }
      if (!/[0-9]/.test(data.password)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Debe contener al menos un número',
          path: ['password'],
        });
      }
      if (!/[^a-zA-Z0-9]/.test(data.password)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Debe contener al menos un carácter especial',
          path: ['password'],
        });
      }

      // Confirmar contraseña debe coincidir con contraseña
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Las contraseñas no coinciden',
          path: ['confirmPassword'],
        });
      }
    }
  });
