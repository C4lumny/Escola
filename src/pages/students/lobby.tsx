import { SubjectCard } from "@/components/students/SubjectCard";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";

export const Lobby = ({
  studentData,
  subjectData,
  activitiesData,
}: {
  studentData: any;
  subjectData: any;
  activitiesData: any;
}) => {

  console.log(activitiesData);
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
                <Link to={`/students/${activity.nombre_asignatura}/${activity.actividad_id}`}>
                  <div
                    key={activity.id}
                    className="flex items-center gap-2 bg-zinc-800 font-semibold rounded-sm px-4 py-3"
                  >
                    <div className="bg-gradient-to-t from-[#902582] to-blue-600 dark:text-white text-black px-2 py-1 rounded-xl font-jetbrains">
                      {activity.nombre_asignatura.substring(0, 2)}
                    </div>
                    <div className="flex flex-col cursor-pointer ">
                      <span className="text-lg">{activity.titulo}</span>
                      <span className="text-sm text-muted-foreground">
                        Vence el {new Date(activity.fecha_fin).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
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
