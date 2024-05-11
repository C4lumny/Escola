import { Routes, Route, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useUserContext } from "@/contexts/userProvider";
import { useEffect } from "react";
// 👇UI Imports and icons
import EscolaIcon from "@/assets/escola-high-resolution-logo-white-transparent.png";
import { PersonStanding, Book, Briefcase, GraduationCap, LayoutDashboard, Pen, LogOutIcon } from "lucide-react";
import { DashboardPage } from "@/pages/admin/dashboard/page";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/nav";
import { ModeToggle } from "@/components/mode-toggle";
import { StudentsPage } from "./students/page";


export const Home = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleChange = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    if (user.username === "" && user.password === "") {
      navigate("/");
    }
  }, [user, history]);

  return (
    <div className="container relative hidden h-screen flex-col md:grid lg:max-w-none lg:grid-cols-6 lg:px-0">
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <ModeToggle />
      </div>
      <div className="h-screen w-64 fixed left-0 col-span-1 flex flex-col">
        {/* 👇 Logo del aplicativo */}
        <div className="mt-10 flex flex-col items-center">
          <img src={EscolaIcon} alt="" className="w-26 h-16"/>
          <div className="flex justify-center items-center">
            <span className="text-lg font-bold tracking-tight">Bienvenido, {user.username}</span>
          </div>
        </div>
        {/* 👇 Separador */}
        <Separator className="my-5" />
        {/* 👇 Nav y opciones del aplicativo */}
        <div>
          <Nav
            links={[
              {
                title: "Dashboard",
                icon: LayoutDashboard,
                variant: currentPath === "/home/dashboard" ? "default" : "ghost",
                link: "dashboard",
              },
              {
                title: "Estudiantes",
                icon: PersonStanding,
                variant: currentPath === "/home/students" ? "default" : "ghost",
                link: "students",
              },
              {
                title: "Materias",
                icon: Book,
                variant: currentPath === "/home/subjects" ? "default" : "ghost",
                link: "subjects",
              },
              {
                title: "Profesores",
                icon: Briefcase,
                variant: currentPath === "/home/teachers" ? "default" : "ghost",
                link: "teachers",
              },
              {
                title: "Cursos",
                icon: GraduationCap,
                variant: currentPath === "/home/courses" ? "default" : "ghost",
                link: "courses",
              },
              {
                title: "Actividades",
                icon: Pen,
                variant: currentPath === "/home/activities" ? "default" : "ghost",
                link: "activities",
              },
            ]}
          />
        </div>
        {/* 👇 Logout */}
        <div className="mt-auto ml-2 mb-5 flex">
          <Button variant={"outline"} className="font-bold" onClick={handleChange}>
            <LogOutIcon className="mr-2 size-4" />
            Cerrar sesión
          </Button>
        </div>
        <div className="absolute left-[16.5rem] top-0 bottom-0">
          <Separator orientation="vertical" />
        </div>
      </div>
      <div className="ml-64 col-span-6 p-10">
        <Routes>
          <Route path="dashboard/*" element={<DashboardPage />} />
          <Route path="students/*" element={<StudentsPage />} />
          {/* <Route path="teachers/*" element={<AirportsPage />} />
          <Route path="courses/*" element={<PlanesPage />} />
          <Route path="subjects/*" element={<TicketsPage />} />
          <Route path="activities/*" element={<CostumersPage />} /> */}
        </Routes>
      </div>
    </div>
  );
};
