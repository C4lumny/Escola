import { ChangeEvent, useState } from "react";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/app/viewTable";
import { TableSkeleton } from "@/components/app/table-skeleton";

export const ViewSubjects = () => {
  const { data, loading } = useGet("subjects");
  const [filter, setFilter] = useState<string>("");
  let dataTable: string[] = [];
  let filteredData: string[] = [];

  if (!loading) {
    dataTable = data.data.map(
      (subject: any) =>
        ({
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

  return (
    <div>
      {loading ? (
        <TableSkeleton />
      ) : (
        <div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Visualizar materias
            </h1>
            <p className="text-muted-foreground">
              Aqui puedes ver las materias activos.
            </p>
          </div>
          <Separator className="my-5" />
          <div className="flex items-center py-4">
            <Input
              placeholder="Filtrar por id..."
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
