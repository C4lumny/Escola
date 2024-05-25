import { Separator } from "@radix-ui/react-dropdown-menu";
import { useGet } from "@/hooks/useGet";
import { useSubjectContext } from "@/contexts/subjectProvider";
import { ArrowLeftCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { TeachersActivitiesCard } from "@/components/teachers/activitiesCard";
import { Button } from "@/components/ui/button";

export const TeacherSubjectActivities = () => {
  const { subject } = useSubjectContext();
  const navigate = useNavigate();
  const activities = useGet(`activities/subjects/${subject.id}`);

  return (
    <div className="container w-screen">
      <ArrowLeftCircle className="cursor-pointer size-10" onClick={() => navigate(-2)} />
      <br />
      {/* Mensaje de bienvenida */}
      <div className="flex justify-between">
        <div>
          <span className="font-bold text-5xl">
            <span className="text-5xl font-bold text-black dark:text-white"></span>Actividades de
            <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              {""} {subject.nombre}
            </span>
          </span>
        </div>
        <div>
          <Link to={'create-activity'}>
            <Button>Agregar actividad</Button>
          </Link>
        </div>
      </div>
      <Separator className="mt-10" />
      {activities.loading ? (
        <p>Cargando actividades...</p>
      ) : activities.data.data.length > 0 ? (
        activities.data.data.map((activity: any) => (
          <div className="mt-5">
            <TeachersActivitiesCard activity={activity} mutate={activities.mutate} />
          </div>
        ))
      ) : (
        <p>No hay actividades activas</p>
      )}
    </div>
  );
};
