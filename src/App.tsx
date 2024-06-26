import { Login } from "./pages/Login";
import { Home } from "./pages/admin/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/app/theme-provider";
import { Student } from "./pages/students/students";
import { Teacher } from "./pages/teachers/teachers";

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
        {/* 👇 Ruta de la pagina de los estudiantes */}
        <Route path="/students/*" element={<Student />} />
        {/* 👇 Ruta de la pagina de los estudiantes */}
        <Route path="/teachers/*" element={<Teacher />} />
      </Routes>
    </ThemeProvider>
  );
};
