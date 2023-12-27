import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Index";
import Register from "../pages/Register/Index";
import ViewMovie from "../pages/ViewMovie/Index";
import AddMovie from "../pages/AddMovie/Index";
export default function Movie() {
  return (
    <Routes>
      <Route path=":id" element={<ViewMovie />} />
      <Route path='add' element={<AddMovie />} />
    </Routes>
  );
}
