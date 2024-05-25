import { useState, ChangeEvent } from "react";
import { useRequest } from "@/hooks/useApiRequest";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/app/viewTable";
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
import { TableSkeleton } from "@/components/app/table-skeleton";

export const DeleteTeacher = () => {
  const { data, loading, mutate } = useGet("teachers");
  const { apiRequest } = useRequest();
  const [filter, setFilter] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<any>();
  let dataTable: string[] = [];
  let filteredData: string[] = [];

  if (!loading) {
    dataTable = data.data.map(
      (teacher: any) =>
        ({
          deleteCheckbox: (
            <Checkbox
              checked={teacher === selectedTeacher}
              className="w-4 h-4"
              onCheckedChange={() => handleCheckboxChange(teacher)}
            />
          ),
          cedula: teacher.cedula,
          nombres: teacher.nombres,
          apellidos: teacher.apellidos,
          telefono: teacher.telefono,
          correo: teacher.correo,
        } || [])
    );

    filteredData = dataTable.filter((profesor: any) =>
      profesor.nombres.includes(filter)
    );
  }

  const columnTitles = [
    "",
    "Cedula",
    "Nombres",
    "Apellidos",
    "Telefono",
    "Correo",
  ];

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.value);
  };

  const handleCheckboxChange = (profesor: any) => {
    setSelectedTeacher(profesor);
  };

  const handleDeleteClick = async () => {
    const response = await apiRequest(
      null,
      `teachers/${selectedTeacher?.cedula}`,
      "delete"
    );
    mutate();

    if (!response.error) {
      toast.success("Profesor eliminado con exito");
    } else {
      toast.error("Error al eliminar el profesor");
    }
  };

  //TODO: implementar un toaster (se encuentra en shadcn-ui) para mostrar un mensaje de exito o error al eliminar una region, y actualizar la tabla de regiones despues de eliminar una region

  return (
    <div>
      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="space-y-5">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Eliminar profesores
            </h1>
            <p className="text-muted-foreground">
              Aquí puedes eliminar los profesores.
            </p>
          </div>
          <Separator className="my-5" />
          <div className="flex items-center py-4">
            <Input
              placeholder="Filtrar por nombre..."
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
                <Button disabled={!selectedTeacher} variant="destructive">
                  Borrar profesor
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás seguro de borrar el profesor?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta accion no puede ser revertida. Esto borrará
                    permanentemente el profesor y se removerá la información de
                    nuestros servidores
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteClick}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  );
};
