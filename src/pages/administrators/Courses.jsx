import { useState } from "react";
import SidebarNav from "@/components/SidebarNav";
import { Separator } from "@/components/ui/separator";
import { ViewCourses } from "@/components/courses/view";
import { CreateCourses } from "@/components/courses/Create";
import { DeleteCourses } from "@/components/courses/Delete";
import { UpdateCourses} from "@/components/courses/Update";

export const Courses = () => {
  const [active, setActive] = useState({
    visualizar: true,
    crear: false,
    borrar: false,
    actualizar: false,
  });

  const handleClick = (id) => {
    setActive({
      visualizar: id === "visualizar",
      crear: id === "crear",
      borrar: id === "borrar",
      actualizar: id === "actualizar",
    });
  };

  const sidebarNavItems = [
    {
      title: "Visualizar cursos",
      onClick: () => handleClick("visualizar"),
      isActive: active.visualizar,
    },
    {
      title: "Crear cursos",
      onClick: () => handleClick("crear"),
      isActive: active.crear,
    },
    {
      title: "Borrar cursos",
      onClick: () => handleClick("borrar"),
      isActive: active.borrar,
    },
    {
      title: "Actualizar cursos",
      onClick: () => handleClick("actualizar"),
      isActive: active.actualizar,
    },
  ];

  return (
    <div className="flex justify-center w-full min-h-screen h-full items-center overflow-hidden py-20">
      <div className="hidden p-20 md:block bg-white w-4/5 border border-zinc-300 rounded-md shadow-md">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-semibold tracking-tight">Cursos</h2>
          <p className="text-muted-foreground">¡Administra a los cursos de tu institución!</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-4xl my-10">
            <div className="space-y-6">
              {active.visualizar && <ViewCourses />}
              {active.crear && <CreateCourses />}
              {active.borrar && <DeleteCourses />}
              {active.actualizar && <UpdateCourses />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};