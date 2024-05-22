import { SubjectCard } from "@/components/students/SubjectCard";
import { Separator } from "@radix-ui/react-dropdown-menu";

export const Lobby = ({studentData, subjectData, activitiesData}: {studentData: any, subjectData: any, activitiesData: any}) => {
  return (
    <>
      {/* 👇 subjects side */}
      <div className="col-span-2">
        {/* Mensaje de bienvenida */}
        <span className="bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text font-bold text-5xl">
          Bienvenido <span className="text-5xl font-bold text-black dark:text-white"> a tu aula virtual,</span>
          <br />{" "}
          <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
            {studentData.nombres} {studentData.apellidos}
          </span>
        </span>
        <Separator className="mt-5 " />
        <div className="text-2xl font-semibold mt-3">{studentData.id_cursos}, Tus Asignaturas:</div>
        {/* 👇 Sección de las materias / asignaturas */}
        <div className="flex mt-12 gap-x-10 gap-y-14 flex-wrap">
          {subjectData && subjectData.length > 0 ? (
            subjectData.map((subject: any) => <SubjectCard subject={subject} key={subject.id} />)
          ) : (
            <div>No se encuentran cursos activos</div>
          )}
        </div>
      </div>
      {/* 👇 news side */}
      <aside className="col-span-1 border border-zinc-300 rounded-md bg-white dark:bg-background ml-10">
        <div className="flex flex-col p-10">
          <p className="font-semibold text-2xl">Actividades pendientes</p>
          <Separator className="my-5" />
          <div className="flex flex-col gap-5">
            {activitiesData && activitiesData.data.length > 0 ? (
              activitiesData.data.map((activity: any) => (
                <div key={activity.id} className="flex flex-col gap-2">
                  <span className="text-lg">{activity.nombre}</span>
                  <span className="text-sm">{activity.descripcion}</span>
                </div>
              ))
            ) : (
              <div>No hay actividades pendientes</div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
