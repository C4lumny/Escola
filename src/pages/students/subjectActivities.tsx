import { ActivitiesCard } from "@/components/students/activitiesCard";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useGet } from "@/hooks/useGet";
import { useSubjectContext } from "@/contexts/subjectProvider";

export const SubjectActivities = () => {
  const { subject } = useSubjectContext();

  const activities = useGet(`activities/subjects/${subject.id}`);
  
  return (
    <div className="container w-screen">
      {/* Mensaje de bienvenida */}
      <span className="bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text font-bold text-5xl">
        <span className="text-5xl font-bold text-black dark:text-white">Tus</span> actividades de
        <br />{" "}
        <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
          {subject.nombre}
        </span>
      </span>
      <Separator className="mt-10" />
      {activities.loading ? (
        <p>Cargando actividades...</p>
      ) : activities.data.data.length > 0 ? (
        activities.data.data.map((activity: any) => (
          <div className="mt-5">
            <ActivitiesCard activity={activity} />
          </div>
        ))
      ) : (
        <p>No hay actividades activas</p>
      )}
    </div>
  );
};
