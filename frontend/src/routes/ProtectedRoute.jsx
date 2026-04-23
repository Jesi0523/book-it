import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  // Se verifica si existen el token y el rol en sessionStorage
  const token = sessionStorage.getItem('token');
  const userRole = sessionStorage.getItem('role');

  // Bandera para saber si la ruta que intentan ver es de admin
  const isAdminRoute = allowedRoles && allowedRoles.includes('ADMIN');

  // Si no ha iniciado sesion
  if (!token) {
    // Si consulta una ruta de admin, redirige 404
    if (isAdminRoute) {
      return <Navigate to='/404' replace />;
    }
    // Si es una ruta del cliente, lo mandamos a login
    return <Navigate to='/login' replace />;
  }

  // Si inicio sesion pero no tiene permisos
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Si un cliente trata de ir a una ruta del admin,
    // se le muestra 404
    if (isAdminRoute) {
      return <Navigate to='/404' replace />;
    }

    // Si un admin intenta ver una pagina del cliente, se redirige al calendario, si es cliente
    const fallbackRoute =
      userRole === 'ADMIN' ? '/admin/appointment-calendar' : '/main';
    return <Navigate to={fallbackRoute} replace />;
  }

  // Si hay token, se permite el acceso a las rutas hijas
  return <Outlet />;
};;;

export default ProtectedRoute;
