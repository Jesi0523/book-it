import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const token = sessionStorage.getItem('token');
  const userRole = sessionStorage.getItem('role');

  // Si el usuario ya tiene token, se le expulsa de las ruta publica
  if (token) {
    const fallbackRoute =
      userRole === 'ADMIN' ? '/admin/appointment-calendar' : '/main';
    return <Navigate to={fallbackRoute} replace />;
  }

  // Si no tiene token, puede ver las rutas hijas
  return <Outlet />;
};

export default PublicRoute;
