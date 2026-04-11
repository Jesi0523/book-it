// |  layout
import AdminLayout from '@/layouts/AdminLayout';

// Componentes propios
import AppointmentForm from '@/components/appointment/AppointmentForm';

function AdminBookAppointment() {
  return (
    <AdminLayout>
      <AppointmentForm></AppointmentForm>
    </AdminLayout>
  );
}

export default AdminBookAppointment;
