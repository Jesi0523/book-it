import { Routes, Route } from "react-router-dom";

import NotFound from "@/pages/NotFound.jsx";
import Login from "@/pages/auth/Login.jsx"; 
import Signup from "@/pages/auth/Signup.jsx";
import MainPage  from "@/pages/client/MainPage";
import BookAppointment from "@/pages/client/BookAppointment";
import ClientSchedule from "@/pages/client/ClientSchedule";
import Profile from '@/pages/client/Profile';
import AppointmentCalendar from "@/pages/admin/AppointmentCalendar";
import AdminBookAppointment from "@/pages/admin/AdminBookAppointment";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Usuario */}
      <Route path="/main" element ={<MainPage />} />
      <Route path="/bookAppointment" element ={<BookAppointment />} />
      <Route path="/clientSchedule" element ={<ClientSchedule />} />
      <Route path="/profile" element ={<Profile />} />
      
      {/* Admin */}
      <Route path="/appointmentCalendar" element ={<AppointmentCalendar />} />
      <Route path="/adminBookAppointment" element ={<AdminBookAppointment />} />

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;