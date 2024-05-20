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

export const DeleteStudents = () => {
  const { data, loading, mutate } = useGet("students");
  const { apiRequest } = useRequest();
  const [filter, setFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>();
  let dataTable: string[] = [];
  let filteredData: string[] = [];

  if (!loading) {
    dataTable = data.map(
      (student: any) =>
        ({
          deleteCheckbox: (
            <Checkbox
              checked={student === selectedStudent}
              className="w-4 h-4"
              onCheckedChange={() => handleCheckboxChange(student)}
            />
          ),
          tipodocumento: student.tipo_documento,
          identificacion: student.identificacion,
          nombres: student.nombres,
          apellidos: student.apellidos,
          cedulaacudiente: student.cedula_acudiente,
          nombrescudiente: student.nombres_acudiente,
          apellidocudiente: student.apellidos_acudiente,
          cursoasignado: student.id_cursos,
        } || [])
    );

    filteredData = dataTable.filter((item: any) =>
      item.nombres.toString().includes(filter)
    );
  }

  const columnTitles = [
    "",
    "Tipo de documento",
    "Nro. identificacion",
    "Nombres",
    "Apellidos",
    "Cedula acudiente",
    "Nombres acudieinte",
    "Apellidos acudiente",
    "Curso",
  ];

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.value);
  };

  const handleCheckboxChange = (estudiante: any) => {
    setSelectedStudent(estudiante);
  };

  const handleDeleteClick = async () => {
    const response = await apiRequest(
      null,
      `students/${selectedStudent?.identificacion}`,
      "delete"
    );
    mutate();

    if (!response.error) {
      toast.success("Estudiante eliminado con exito");
    } else {
      toast.error("Error al eliminar el estudiante");
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
                <Button disabled={!selectedStudent} variant="destructive">
                  Borrar estudiante
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás seguro de borrar el estudiante?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta accion no puede ser revertida. Esto borrará
                    permanentemente el estudiante y se removerá la información
                    de nuestros servidores
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
