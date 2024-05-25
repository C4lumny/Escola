import { ArrowRight } from "lucide-react";
import ActivityIcon from "../../assets/activity.png";
import { Link } from "react-router-dom";

export const ActivitiesCard = ({ activity }: any) => {
  return (
    <div className="w-full h-24 border">
      <div className="flex space-x-4">
        <div className="space-x-1 h-24 w-28 overflow-hidden ">
          <img className="h-24 w-full object-fill" src={ActivityIcon} alt={activity.titulo} />
        </div>
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{activity.titulo}</span>
            <span className="text-sm text-muted-foreground">
              Fecha de vencimiento: {new Date(activity.fecha_fin).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-end items-center mr-5 w-28 h-full">
            <Link to={`${activity.actividad_id}`}>
              <ArrowRight size={50} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
