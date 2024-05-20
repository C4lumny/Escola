import { useState, ChangeEvent } from "react";
import { useRequest } from "@/hooks/useApiRequest";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/viewTable";
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
import { toast } from "sonner";

export const DeleteActivity = () => {
  const { data, loading, mutate } = useGet("activities");
  const { apiRequest } = useRequest();
  const [filter, setFilter] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<any>();
  let dataTable: string[] = [];
  let filteredData: string[] = [];

  if (!loading) {
    dataTable = data.data.map(
      (activity: any) =>
        ({
          deleteCheckbox: (
            <Checkbox
              checked={activity === selectedActivity}
              className="w-4 h-4"
              onCheckedChange={() => handleCheckboxChange(activity)}
            />
          ),
          id: activity.id,
          titulo: activity.titulo,
          descripcion: activity.descripcion,
          fecha_inicio: new Date(activity.fecha_inicio).toLocaleDateString(),
          fecha_fin: new Date(activity.fecha_fin).toLocaleDateString(),
          nombre_asignatura: activity.nombre_asignatura,
        } || [])
    );

    filteredData = dataTable.filter((activity: any) => activity.titulo.toString().includes(filter));
  }

  const columnTitles = ["", "ID", "Titulo", "Descripcion", "Fecha inicio", "Fecha fin", "Nombre de la asignatura"];

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.value);
  };

  const handleCheckboxChange = (activity: any) => {
    setSelectedActivity(activity);
  };

  const handleDeleteClick = async () => {
    const response = await apiRequest(null, `activities/${selectedActivity?.id}`, "delete");
    mutate();

    if (!response.error) {
      toast.success("Actividad eliminada con exito");
    } else {
      toast.error("Error al eliminar la actividad");
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Eliminar actividades</h1>
            <p className="text-muted-foreground">Aquí puedes eliminar las actividades.</p>
          </div>
          <Separator className="my-5" />
          <div className="flex items-center py-4">
            <Input
              placeholder="Filtrar por titulo..."
              className="max-w-sm"
              value={filter}
              onChange={handleFilterChange}
            />
          </div>
          <div className="rounded-md border">
            <DataTable columnTitles={columnTitles} data={filteredData} />
          </div>
          <div className="flex w-full justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={!selectedActivity} variant="destructive">
                  Borrar actividad
                </Button>
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
                  <AlertDialogAction onClick={handleDeleteClick}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  );
};
