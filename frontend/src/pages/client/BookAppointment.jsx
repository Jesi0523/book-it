// |  layout
import ClientLayout from '@/layouts/ClientLayout';

// Componentes propios
import AppointmentForm from '@/components/appointment/AppointmentForm';

function BookAppointment() {
  return (
    <ClientLayout>
      <AppointmentForm></AppointmentForm>
    </ClientLayout>
  );
}

export default BookAppointment;
