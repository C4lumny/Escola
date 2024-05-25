import { Routes, Route, useLocation } from "react-router-dom";

import { Plus, Minus, RefreshCcw, View } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Nav } from "@/components/app/nav";
import { ViewCourses } from "./components/view";
import { CreateCourses } from "./components/create";
import { UpdateCourses } from "./components/update";
import { DeleteCourse } from "./components/delete";

export const CoursesPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div className="space-y-2 mb-5">
        <h2 className="text-2xl font-semibold tracking-tight">Cursos</h2>
        <p className="text-muted-foreground">Gestión de tus cursos</p>
      </div>
      <Separator className="mb-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 h-auto">
        <aside className="-mx-4 lg:w-1/5">
          <Nav
            links={[
              {
                icon: View,
                title: "Visualizar",
                link: "view",
                variant: currentPath === "/courses/view" ? "default" : "ghost",
              },
              {
                icon: Plus,
                title: "Crear",
                link: "create",
                variant:
                  currentPath === "/courses/create" ? "default" : "ghost",
              },
              {
                icon: RefreshCcw,
                title: "Actualizar",
                link: "update",
                variant:
                  currentPath === "/courses/update" ? "default" : "ghost",
              },
              {
                icon: Minus,
                title: "Eliminar",
                link: "delete",
                variant:
                  currentPath === "/courses/delete" ? "default" : "ghost",
              },
            ]}
          />
        </aside>
        <div>
          <Separator orientation="vertical" />
        </div>

        <div className="flex-1 lg:max-w-4xl my-10">
          <div className="space-y-6">
            <Routes>
              <Route path="view" element={<ViewCourses />} />
              <Route path="create" element={<CreateCourses />} />
              <Route path="update" element={<UpdateCourses />} />
              <Route path="delete" element={<DeleteCourse />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
