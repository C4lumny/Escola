import { Login } from "./pages/Login";
import { Home } from "./pages/admin/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        {/* 👇 Ruta principal que redirige al login */}
        <Route index element={<Navigate to="/login" />} />
        {/* 👇 Ruta del login */}
        <Route path="/login" element={<Login />} />
        {/* 👇 Ruta del dashboard */}
        <Route path="/admins/*" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
};
