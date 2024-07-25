import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import PublicRoute from "components/Layout/PublicRoute";
import PrivateRoute from "components/Layout/PrivaterRoute";
const App = () => {
  return (
    <Routes>
      <Route
        path="admin/*"
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      />
      <Route
        path="dashboard/*"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      />
      <Route
        path="rtl/*"
        element={
          <PrivateRoute>
            <RtlLayout />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard/default" replace />} />
      <Route path="*" element={<Navigate to="/dashboard/default" replace />} />
    </Routes>
  );
};

export default App;
