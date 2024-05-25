import { TeachersSubjectCard } from "@/components/teachers/teachersSubjectCard";
import { Separator } from "@radix-ui/react-dropdown-menu";

export const Lobby = ({ teacherData, subjectData }: { teacherData: any; subjectData: any }) => {
  return (
    <>
      {/* 👇 subjects side */}
      <div className="col-span-3">
        {/* Mensaje de bienvenida */}
        <span className="bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text font-bold text-5xl">
          Bienvenido <span className="text-5xl font-bold text-black dark:text-white"> a tu aula virtual,</span>
          <br />{" "}
          <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
            Lic. {teacherData.nombres} {teacherData.apellidos}
          </span>
        </span>
        <Separator className="mt-5 " />
        <div className="text-2xl font-semibold mt-3">Tus Asignaturas:</div>
        {/* 👇 Sección de las materias / asignaturas */}
        <div className="flex mt-12 gap-x-10 gap-y-14 flex-wrap">
          {subjectData && subjectData.length > 0 ? (
            subjectData.map((subject: any) => <TeachersSubjectCard subject={subject} key={subject.id} />)
          ) : (
            <div>No se encuentran asignaturas activas</div>
          )}
        </div>
      </div>
    </>
  );
};
