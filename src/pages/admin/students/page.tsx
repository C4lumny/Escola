import { Routes, Route, useLocation } from "react-router-dom";
import { Plus, Minus, RefreshCcw, View } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Nav } from "@/components/app/nav";
import { ViewStudents } from "./components/view";
import { DeleteStudents } from "./components/delete";
import { CreateStudents } from "./components/create";
import { UpdateStudents } from "./components/update";

export const StudentsPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div className="space-y-2 mb-5">
        <h2 className="text-2xl font-semibold tracking-tight">Estudiantes</h2>
        <p className="text-muted-foreground">CRUD de estudiantes</p>
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
                variant: currentPath === "/students/view" ? "default" : "ghost",
              },
              {
                icon: Plus,
                title: "Crear",
                link: "create",
                variant: currentPath === "/students/create" ? "default" : "ghost",
              },
              {
                icon: RefreshCcw,
                title: "Actualizar",
                link: "update",
                variant: currentPath === "/students/update" ? "default" : "ghost",
              },
              {
                icon: Minus,
                title: "Eliminar",
                link: "delete",
                variant: currentPath === "/students/delete" ? "default" : "ghost",
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
              <Route path="view" element={<ViewStudents />} />
              <Route path="create" element={<CreateStudents />} />
              <Route path="update" element={<UpdateStudents />} />
              <Route path="delete" element={<DeleteStudents />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
