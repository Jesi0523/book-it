import { Routes, Route } from "react-router-dom";

import Login from "@/pages/auth/Login.jsx"; 
import Signup from "@/pages/auth/Signup.jsx";
import MainPage  from "@/pages/auth/MainPage";
import BookAppointment from "@/pages/auth/BookAppointment";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Usuario */}
      <Route path="/main" element ={<MainPage />} />
      <Route path="/bookAppointment" element ={<BookAppointment />} />

      {/* Admin */}


    </Routes>
  );
};

export default AppRoutes;