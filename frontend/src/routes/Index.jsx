import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Home from "../pages/Home/Index";
import Movie from "./Movie";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/movie/*' element={<Movie />} />
      <Route path="/auth/*" element={<Auth />} />
    </Routes>
  );
};

export default AppRoutes;
