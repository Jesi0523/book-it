import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Auth
const Login = lazy(() => import('@/pages/auth/Login.jsx'));
const Signup = lazy(() => import('@/pages/auth/Signup.jsx'));

// Client
const MainPage = lazy(() => import('@/pages/client/MainPage'));
const BookAppointment = lazy(() => import('@/pages/client/BookAppointment'));
const MySchedule = lazy(() => import('@/pages/client/MySchedule'));
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

const AppRoutes = () => {
  return (
    // Cargando pantallas
    <Suspense
      fallback={
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
      }
    >
      <Routes>
        {/* Auth */}
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Usuario */}
        <Route path='/main' element={<MainPage />} />
        <Route path='/book-appointment' element={<BookAppointment />} />
        <Route path='/my-schedule' element={<MySchedule />} />
        <Route path='/profile' element={<Profile />} />

        {/* Admin */}
        <Route
          path='/admin/appointment-calendar'
          element={<AppointmentCalendar />}
        />
        <Route
          path='/admin/book-appointment'
          element={<AdminBookAppointment />}
        />
        <Route path='/admin/employees' element={<Employees />} />
        <Route path='/admin/services' element={<Services />} />
        <Route path='/admin/company-info' element={<CompanyInfo />} />
        <Route path='/admin/suspensions' element={<Suspensions />} />
        <Route path='/admin/reports' element={<Reports />} />

        {/* Error */}
        <Route path='/404' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;