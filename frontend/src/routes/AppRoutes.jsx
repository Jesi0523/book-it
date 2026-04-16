import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Layouts
import AuthLayout from '@/layouts/AuthLayout';
import ClientLayout from '@/layouts/ClientLayout';
import AdminLayout from '@/layouts/AdminLayout';

// Auth
const Login = lazy(() => import('@/pages/auth/Login.jsx'));
const Signup = lazy(() => import('@/pages/auth/Signup.jsx'));

// Client
const MainPage = lazy(() => import('@/pages/client/MainPage'));
const BookAppointment = lazy(() => import('@/pages/client/BookAppointment'));
const MyAppointments = lazy(() => import('@/pages/client/MyAppointments'));
const Profile = lazy(() => import('@/pages/client/Profile'));

// Admin
const AppointmentCalendar = lazy(
  () => import('@/pages/admin/AppointmentCalendar'),
);
const AdminBookAppointment = lazy(
  () => import('@/pages/admin/AdminBookAppointment'),
);
const Employees = lazy(() => import('@/pages/admin/Employees'));
const Services = lazy(() => import('@/pages/admin/Services'));
const CompanyInfo = lazy(() => import('@/pages/admin/CompanyInfo'));
const Suspensions = lazy(() => import('@/pages/admin/Suspensions'));
const Reports = lazy(() => import('@/pages/admin/Reports'));

// Error
const NotFound = lazy(() => import('@/pages/NotFound.jsx'));

const FallbackLoader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(180deg, #0c0c18 0%, #060511 100%)',
    }}
  >
    <CircularProgress color='primary' />
  </Box>
);

const SuspenseLayout = ({ children }) => (
  <Suspense fallback={<FallbackLoader />}>{children}</Suspense>
);

const AppRoutes = () => {
  return (
    // Cargando pantallas
    <Routes>
      {/* Auth */}
      <Route
        element={
          <SuspenseLayout>
            <AuthLayout />
          </SuspenseLayout>
        }
      >
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Route>

      {/* Usuario */}
      <Route
        element={
          <SuspenseLayout>
            <ClientLayout />
          </SuspenseLayout>
        }
      >
        <Route path='/' element={<MainPage />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/book-appointment' element={<BookAppointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/profile' element={<Profile />} />
      </Route>

      {/* Admin */}
      <Route
        path='/admin'
        element={
          <SuspenseLayout>
            <AdminLayout />
          </SuspenseLayout>
        }
      >
        <Route path='appointment-calendar' element={<AppointmentCalendar />} />
        <Route path='book-appointment' element={<AdminBookAppointment />} />
        <Route path='employees' element={<Employees />} />
        <Route path='services' element={<Services />} />
        <Route path='company-info' element={<CompanyInfo />} />
        <Route path='suspensions' element={<Suspensions />} />
        <Route path='reports' element={<Reports />} />
      </Route>

      {/* Error */}
      <Route path='/404' element={<NotFound />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default AppRoutes;
