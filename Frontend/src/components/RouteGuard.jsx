import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

const RouteGuard = ({children}) => {
    if (!isTokenValid()) {
        return <Navigate to="/" replace/>;
    }
    return children;
};

export default RouteGuard;