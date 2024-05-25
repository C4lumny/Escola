import { Routes, Route, useLocation } from "react-router-dom";
import { Plus, Minus, RefreshCcw, View } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Nav } from "@/components/app/nav";
import { ViewTeachers } from "./components/view";
import { CreateTeachers } from "./components/create";
import { DeleteTeacher } from "./components/delete";
import { UpdateCities } from "./components/update";

export const TeachersPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div className="space-y-2 mb-5">
        <h2 className="text-2xl font-semibold tracking-tight">Profesores</h2>
        <p className="text-muted-foreground">Gestion de profesores</p>
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
                variant: currentPath === "/home/teachers/view" ? "default" : "ghost",
              },
              {
                icon: Plus,
                title: "Crear",
                link: "create",
                variant: currentPath === "/home/teachers/create" ? "default" : "ghost",
              },
              {
                icon: RefreshCcw,
                title: "Actualizar",
                link: "update",
                variant: currentPath === "/home/teachers/update" ? "default" : "ghost",
              },
              {
                icon: Minus,
                title: "Eliminar",
                link: "delete",
                variant: currentPath === "/home/teachers/delete" ? "default" : "ghost",
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
              <Route path="view" element= {<ViewTeachers />}/>
              <Route path="create" element={<CreateTeachers />} />
              <Route path="update" element={<UpdateCities />} />
              <Route path="delete" element={<DeleteTeacher />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
