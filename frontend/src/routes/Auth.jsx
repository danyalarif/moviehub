import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Index";
import Register from "../pages/Register/Index";
import Logout from "../pages/Logout/Index";

export default function Auth() {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path='logout' element={<Logout />} />
    </Routes>
  );
}
