import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
   const token = window.localStorage.getItem("token");

   return <>{token ? <Component /> : <Navigate to={"/signin"} />}</>;
};

export default PrivateRoute;
