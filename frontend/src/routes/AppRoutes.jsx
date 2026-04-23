// React
import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// MUI
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Constantes
import { ROUTES, ROLES } from '@/constants/routes';

// Layouts
import AuthLayout from '@/layouts/AuthLayout';
import ClientLayout from '@/layouts/ClientLayout';
import AdminLayout from '@/layouts/AdminLayout';

// Paginas Auth
const Login = lazy(() => import('@/pages/auth/Login.jsx'));
const Signup = lazy(() => import('@/pages/auth/Signup.jsx'));

// Paginas Client
const MainPage = lazy(() => import('@/pages/client/MainPage'));
const BookAppointment = lazy(() => import('@/pages/client/BookAppointment'));
const MyAppointments = lazy(() => import('@/pages/client/MyAppointments'));
const Profile = lazy(() => import('@/pages/client/Profile'));

// Paginas Admin
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

// Pagina Error
const NotFound = lazy(() => import('@/pages/NotFound.jsx'));

// Rutas protegidas
import PublicRoute from '@/routes/PublicRoute';
import ProtectedRoute from '@/routes/ProtectedRoute';

// <--------------------------------------------------------->

// Pantalla de carga
const FallbackLoader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: (theme) => theme.customGradients.mainBackground,
    }}
  >
    <CircularProgress color='primary' />
  </Box>
);

// Muestra algo mientras se carga un componente
const SuspenseLayout = ({ children }) => (
  <Suspense fallback={<FallbackLoader />}>{children}</Suspense>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas publicas */}
      <Route element={<PublicRoute />}>
        {/* Landing Page */}
        <Route
          element={
            <SuspenseLayout>
              <ClientLayout />
            </SuspenseLayout>
          }
        >
          <Route path={ROUTES.PUBLIC.ROOT} element={<MainPage />} />
        </Route>

        {/* Auth */}
        <Route
          element={
            <SuspenseLayout>
              <AuthLayout />
            </SuspenseLayout>
          }
        >
          <Route path={ROUTES.PUBLIC.LOGIN} element={<Login />} />
          <Route path={ROUTES.PUBLIC.SIGNUP} element={<Signup />} />
        </Route>
      </Route>

      {/* Usuario */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]} />}>
        <Route
          element={
            <SuspenseLayout>
              <ClientLayout />
            </SuspenseLayout>
          }
        >
          <Route path={ROUTES.CLIENT.MAIN} element={<MainPage />} />
          <Route path={ROUTES.CLIENT.BOOK} element={<BookAppointment />} />
          <Route
            path={ROUTES.CLIENT.APPOINTMENTS}
            element={<MyAppointments />}
          />
          <Route path={ROUTES.CLIENT.PROFILE} element={<Profile />} />
        </Route>
      </Route>

      {/* Admin */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route
          element={
            <SuspenseLayout>
              <AdminLayout />
            </SuspenseLayout>
          }
        >
          <Route
            path={ROUTES.ADMIN.CALENDAR}
            element={<AppointmentCalendar />}
          />
          <Route path={ROUTES.ADMIN.BOOK} element={<AdminBookAppointment />} />
          <Route path={ROUTES.ADMIN.EMPLOYEES} element={<Employees />} />
          <Route path={ROUTES.ADMIN.SERVICES} element={<Services />} />
          <Route path={ROUTES.ADMIN.COMPANY} element={<CompanyInfo />} />
          <Route path={ROUTES.ADMIN.SUSPENSIONS} element={<Suspensions />} />
          <Route path={ROUTES.ADMIN.REPORTS} element={<Reports />} />
        </Route>
      </Route>

      {/* Error */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      <Route path='*' element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
    </Routes>
  );
};

export default AppRoutes;
