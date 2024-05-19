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

export const DeleteSubject = () => {
  const { data, loading, mutate } = useGet("subjects");
  const { apiRequest } = useRequest();
  const [filter, setFilter] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<any>();
  let dataTable: string[] = [];
  let filteredData: string[] = [];

  if (!loading) {
    dataTable = data.data.map(
      (subject: any) =>
        ({
          deleteCheckbox: (
            <Checkbox
              checked={subject === selectedSubject}
              className="w-4 h-4"
              onCheckedChange={() => handleCheckboxChange(subject)}
            />
          ),
          nombre: subject.nombre,
          cedula_profesor: subject.cedula_profesor,
          apellidos_profesor: subject.apellidos_profesor,
          nombres_profesor: subject.nombres_profesor,
          cursos_dictados: subject.id_curso,
          descripcion: subject.descripcion,
        } || [])
    );

    filteredData = dataTable.filter((subject: any) =>
      subject.nombre.includes(filter)
    );
  }

  const columnTitles = [
    "Nombre",
    "Cedula profesor",
    "Apellidos profesor",
    "Nombres profesor",
    "Cursos dictados",
    "Descripcion",
  ];

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.value);
  };

  const handleCheckboxChange = (estudiante: any) => {
    setSelectedSubject(estudiante);
  };

  const handleDeleteClick = async () => {
    const response = await apiRequest(
      null,
      `subjects/${selectedSubject?.id}`,
      "delete"
    );
    mutate();

    if (!response.error) {
      toast.success("Materia eliminada con exito");
    } else {
      toast.error("Error al eliminar el materia");
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
            <h1 className="text-xl font-semibold tracking-tight">
              Eliminar estudiantes
            </h1>
            <p className="text-muted-foreground">
              Aquí puedes eliminar los estudiantes.
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
                <Button disabled={!selectedSubject} variant="destructive">
                  Borrar materia
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás seguro de borrar el materia?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta accion no puede ser revertida. Esto borrará
                    permanentemente el materia y se removerá la información de
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
