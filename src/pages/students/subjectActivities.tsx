import { ActivitiesCard } from "@/components/students/activitiesCard";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useParams } from "react-router-dom";

export const SubjectActivities = ({activities}: any) => {
  const { subject } = useParams();

  return (
    <div className="container w-screen">
      {/* Mensaje de bienvenida */}
      <span className="bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text font-bold text-5xl">
        <span className="text-5xl font-bold text-black dark:text-white">Tus</span> actividades de
        <br />{" "}
        <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
          {subject}
        </span>
      </span>
      <Separator className="mt-5 " />
      {activities.map((activity:any) => (
        <ActivitiesCard activity={activity}/>
      ))}
    </div>
  );
};
