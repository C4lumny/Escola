import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Role } from "./components/Role";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserProvider } from "./contexts/UserProvider";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    let title = "Escola";
    if (location.pathname === "/Login") {
      title += " - Login";
    }

    document.title = title;
  }, [location]);

  return (
    <Routes>
      {/* 👇 Ruta principal que redirige al login */}
      <Route index element={<Navigate to="/Login" />} />
      <Route
        path="/Login"
        element={
          <UserProvider>
            <Login />
          </UserProvider>
        }
      />
      <Route
        path="/Panel/:role/*"
        element={
          <UserProvider>
            <ProtectedRoute>
              <Role />
            </ProtectedRoute>
          </UserProvider>
        }
      />
    </Routes>
  );
};

export default App;
