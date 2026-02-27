import { Routes, Route } from "react-router-dom";

import Login from "@/pages/auth/Login.jsx"; 
import Signup from "@/pages/auth/Signup.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Usuario */}


      {/* Admin */}


    </Routes>
  );
};

export default AppRoutes;