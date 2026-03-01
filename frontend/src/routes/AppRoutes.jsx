import { Routes, Route } from "react-router-dom";

import Login from "@/pages/auth/client/Login.jsx"; 
import Signup from "@/pages/auth/client/Signup.jsx";
import MainPage  from "@/pages/auth/client/MainPage";
import BookAppointment from "@/pages/auth/client/BookAppointment";
import ClientSchedule from "@/pages/auth/client/mySchedule";

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
      {/* Admin */}


    </Routes>
  );
};

export default AppRoutes;