import { Trash2, Pencil } from "lucide-react";
import ActivityIcon from "../../assets/activity.png";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRequest } from "@/hooks/useApiRequest";
import { toast } from "sonner";
import { useActivityContext } from "../../contexts/activityProvider";

export const TeachersActivitiesCard = ({ activity, mutate }: any) => {
  const { apiRequest } = useRequest();
  const { createActivity } = useActivityContext();

  const handleClick = async () => {
    const response = await apiRequest(null, `activities/${activity.actividad_id}`, "delete");
    console.log(response);

    if (!response.error) {
      toast.success("Curso eliminado con exito");
      mutate();
    } else {
      toast.error("Error al eliminar el curso");
    }
  };

  return (
    <div className="w-full h-24 border rounded-full shadow-sm">
      <div className="flex space-x-4">
        <div className="space-x-1 h-24 w-28 overflow-hidden ">
          <img className="h-24 w-full object-fill" src={ActivityIcon} alt={activity.titulo} />
        </div>
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <Link to={`${activity.actividad_id}`}>
              <span className="text-2xl font-bold cursor-pointer hover:underline">{activity.titulo}</span>
            </Link>
            <span className="text-sm text-muted-foreground">
              Fecha de vencimiento: {new Date(activity.fecha_fin).toLocaleDateString()}
            </span>
            <span className={`text-base ${activity.estado ? "text-green-500" : "text-[#E11D48]"}`}>
              {" "}
              Estado: {activity.estado ? "Activa" : "Inactiva"}
            </span>
          </div>
          <div className="flex gap-5 justify-end items-center mr-12 w-28 h-full cursor-pointer">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Trash2 stroke="#E11D48" fill="none" size={35} />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro de borrar la actividad?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta accion no puede ser revertida. Esto borrará permanentemente la actividad y se removerá la
                    información de nuestros servidores
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClick}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Link to={"update-activity"}>
              <Pencil onClick={() => createActivity(activity)} size={35} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
