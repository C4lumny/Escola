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
            // <Checkbox className="w-4 h-4" />
          ),
          cedula: teacher.cedula,
          nombres: teacher.nombres,
          apellidos: teacher.apellidos,
          telefono: teacher.telefono,
          correo: teacher.correo,
        } || [])
    );

    filteredData = dataTable.filter((profesor: any) => profesor.nombres.includes(filter));
  }

  const columnTitles = ["", "Cedula", "Nombres", "Apellidos", "Telefono", "Correo"];

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.value);
  };

  const handleCheckboxChange = (idciudad: any) => {
   
   
    setSelectedTeacher(idciudad);
  };

  const handleDeleteClick = async () => {
    console.log(selectedTeacher);
    const request = await apiRequest(null, `teachers/${selectedTeacher?.cedula}`, "delete");
    console.log(request);
    mutate();
  };

  //TODO: implementar un toaster (se encuentra en shadcn-ui) para mostrar un mensaje de exito o error al eliminar una region, y actualizar la tabla de regiones despues de eliminar una region

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
            <h1 className="text-xl font-semibold tracking-tight">Eliminar profesores</h1>
            <p className="text-muted-foreground">Aquí puedes eliminar los profesores.</p>
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
            <Button onClick={handleDeleteClick} variant="destructive">
              Borrar profesor
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
