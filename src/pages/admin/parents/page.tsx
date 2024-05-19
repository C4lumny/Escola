import { Routes, Route, useLocation } from "react-router-dom";
import { Plus, Minus, RefreshCcw, View } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Nav } from "@/components/nav";
import { ViewTeachers } from "./components/view";
import { CreateParents } from "./components/create";
import { DeleteParent } from "./components/delete";
import { UpdateCities } from "./components/update";

export const ParentsPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div className="space-y-2 mb-5">
        <h2 className="text-2xl font-semibold tracking-tight">Acudientes</h2>
        <p className="text-muted-foreground">Gestion de acudientes</p>
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
                variant: currentPath === "/home/parents/view" ? "default" : "ghost",
              },
              {
                icon: Plus,
                title: "Crear",
                link: "create",
                variant: currentPath === "/home/parents/create" ? "default" : "ghost",
              },
              {
                icon: RefreshCcw,
                title: "Actualizar",
                link: "update",
                variant: currentPath === "/home/parents/update" ? "default" : "ghost",
              },
              {
                icon: Minus,
                title: "Eliminar",
                link: "delete",
                variant: currentPath === "/home/parents/delete" ? "default" : "ghost",
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
              <Route path="create" element={<CreateParents />} />
              <Route path="update" element={<UpdateCities />} />
              <Route path="delete" element={<DeleteParent />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
