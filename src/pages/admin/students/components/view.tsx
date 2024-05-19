import { ChangeEvent, useState } from "react";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/viewTable";

export const ViewStudents = () => {
  const { data, loading } = useGet("students");
  const [filter, setFilter] = useState<string>("");
  let dataTable: string[] = [];
  let filteredData: string[] = [];

  if (!loading) {
    dataTable = data.map(
      (student: any) =>
        ({
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

    filteredData = dataTable.filter((item: any) => item.nombres.toString().includes(filter));
  }

  const columnTitles = [
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
        <div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Visualizar estudiantes</h1>
            <p className="text-muted-foreground">Aqui puedes ver los estudiantes activos.</p>
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
            <DataTable data={filteredData} columnTitles={columnTitles} />
          </div>
        </div>
      )}
    </div>
  );
};
