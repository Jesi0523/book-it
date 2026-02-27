import { Routes, Route } from "react-router-dom";

import Login from "@/pages/auth/Login.jsx"; 
import Signup from "@/pages/auth/Signup.jsx";
import MainPage  from "@/pages/auth/MainPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Usuario */}
      <Route path="/main" element ={<MainPage />} />

      {/* Admin */}


    </Routes>
  );
};

export default AppRoutes;