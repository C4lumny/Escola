import { ChangeEvent, useState } from "react";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/app/viewTable";
import { TableSkeleton } from "@/components/app/table-skeleton";

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

    filteredData = dataTable.filter((item: any) =>
      item.nombres.toString().includes(filter)
    );
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
        <TableSkeleton />
      ) : (
        <div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Visualizar estudiantes
            </h1>
            <p className="text-muted-foreground">
              Aqui puedes ver los estudiantes activos.
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
            <DataTable data={filteredData} columnTitles={columnTitles} />
          </div>
        </div>
      )}
    </div>
  );
};
