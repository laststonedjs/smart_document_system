import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// pages
import UploadPage from "./pages/UploadPage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Register";

import AppLayout from "./layouts/AppLayout";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route 
          path="/register"
          element={<RegisterPage />}
        />

        {token ? (
          <>
            <Route element={<AppLayout />}>
              <Route
                path="/upload"
                element={<UploadPage />}
              />

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />
            </Route>

            <Route
              path="*"
              element={<Navigate to="/upload" />}
            />
          </>
        ) : (
          <Route
            path="*"
            element={<Navigate to="/login" />}
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;