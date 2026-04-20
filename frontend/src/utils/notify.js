import toast from 'react-hot-toast';

const baseStyle = {
  borderRadius: '10px',
  background: '#1b1c37',
  color: '#fff',
  duration: 3000,
};

// Notificacion de exito
export const toastSuccess = (message, toastId) => {
  toast.success(message, {
    id: toastId,
    style: {
      ...baseStyle,
      border: '1px solid #4caf50',
    },
    iconTheme: { primary: '#4caf50', secondary: '#fff' },
  });
};

// Notificacion de cancelar
export const toastNeutral = (message, toastId) => {
  toast.success(message, {
    id: toastId,
    style: {
      ...baseStyle,
      border: '1px solid #757575',
    },
    iconTheme: { primary: '#757575', secondary: '#fff' },
  });
};