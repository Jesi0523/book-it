import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "@/pages/auth/Login.jsx"; 
import Signup from "@/pages/auth/Signup.jsx";

// Client
import MainPage  from "@/pages/client/MainPage";
import BookAppointment from "@/pages/client/BookAppointment";
import MySchedule from "@/pages/client/MySchedule";
import Profile from '@/pages/client/Profile';

// Admin
import AppointmentCalendar from "@/pages/admin/AppointmentCalendar";
import AdminBookAppointment from "@/pages/admin/AdminBookAppointment";
import Employees from "@/pages/admin/Employees";
import Services from "@/pages/admin/Services";
import CompanyInfo from "@/pages/admin/CompanyInfo";
import Suspensions from "@/pages/admin/Suspensions";
import Reports from "@/pages/admin/Reports";

// Error
import NotFound from "@/pages/NotFound.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Usuario */}
      <Route path="/main" element ={<MainPage />} />
      <Route path="/book-appointment" element ={<BookAppointment />} />
      <Route path="/my-schedule" element ={<MySchedule />} />
      <Route path="/profile" element ={<Profile />} />
      
      {/* Admin */}
      <Route path="/admin/appointment-calendar" element ={<AppointmentCalendar />} />
      <Route path="/admin/book-appointment" element ={<AdminBookAppointment />} />
      <Route path="/admin/employees" element ={<Employees />} />
      <Route path="/admin/services" element ={<Services />} />
      <Route path="/admin/company-info" element ={<CompanyInfo />} />
      <Route path="/admin/suspensions" element ={<Suspensions />} />
      <Route path="/admin/reports" element ={<Reports />} />

      {/* Error */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />

    </Routes>
  );
};

export default AppRoutes;