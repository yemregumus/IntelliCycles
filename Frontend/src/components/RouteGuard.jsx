import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";
import PropTypes from "prop-types";

const RouteGuard = ({children}) => {
    if (!isTokenValid()) {
        return <Navigate to="/" replace/>;
    }
    return children;
};

RouteGuard.propTypes = {
    children: PropTypes.node,
};

export default RouteGuard;