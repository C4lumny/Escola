import { useGet } from "@/hooks/useGet";
import { useUserContext } from "@/contexts/UserProvider";
// UI imports
import { Navbar } from "@/components/students/Header";
import { SubjectCard } from "@/components/students/SubjectCard";
import { Separator } from "@/components/ui/separator";
import { Loader } from "@/components/students/Loader";

export const Student = () => {
  const { user } = useUserContext();
  const { data: studentData, loading: studentLoading } = useGet(`students/${user.identificacion}`);
  const { data: subjectData, loading: subjectLoading } = useGet(`subjects/${user.identificacion}`);

  if (subjectLoading) {
    console.log("cargando...");
  } else {
    console.log(subjectData);
    console.log(studentData);
  }

  return (
    <>
      {studentLoading && subjectLoading ? (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="mt-20 mb-10 container h-screen grid grid-cols-3">
            {/* 👇 subjects side */}
            <div className="col-span-2">
              {/* Mensaje de bienvenida */}
              <span className="bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text font-bold text-5xl">
                Bienvenido <span className="text-5xl font-bold text-black"> a tu aula virtual,</span>
                <br />{" "}
                <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                  {studentData.nombres} {studentData.apellidos}
                </span>
              </span>
              <Separator className="mt-5 " />
              <div className="text-2xl font-semibold mt-3">{studentData.id_cursos}, tus asignaturas</div>
              {/* 👇 Sección de las materias / asignaturas */}
              <div className="flex mt-8 gap-10 flex-wrap">
                {subjectData && subjectData.length > 0 ? (
                  subjectData.map((subject) => (
                    <SubjectCard
                      subject={subject}
                      key={subject.id}
                      image={
                        "https://www.shutterstock.com/image-vector/spanish-open-book-language-hand-260nw-1260510196.jpg"
                      }
                    />
                  ))
                ) : (
                  <div>No se encuentran cursos activos</div>
                )}
              </div>
            </div>
            {/* 👇 news side */}
            <aside className="col-span-1 border border-zinc-300 rounded-md bg-white ml-10">
              <div className="flex flex-col p-10">
                <p className="font-semibold text-2xl">Noticias y actividades</p>
                <Separator className="my-5"/>
              </div>
            </aside>
          </div>
        </>
      )}
    </>
  );
};
