import { ChangeEvent, useState } from "react";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/app/viewTable";
import { TableSkeleton } from "@/components/app/table-skeleton";

export const ViewTeachers = () => {
  const { data, loading } = useGet("teachers");
  const [filter, setFilter] = useState<string>("");
  let dataTable: string[] = [];
  let filteredData: string[] = [];

  if (!loading) {
    dataTable = data.data.map(
      (teacher: any) =>
        ({
          cedula: teacher.cedula,
          nombres: teacher.nombres,
          apellidos: teacher.apellidos,
          telefono: teacher.telefono,
          correo: teacher.correo,
        } || [])
    );

    filteredData = dataTable.filter((teacher: any) =>
      teacher.cedula.toString().includes(filter)
    );
  }

  const columnTitles = ["Cedula", "Nombres", "Apellidos", "Telefono", "Correo"];

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
              Visualizar profesores
            </h1>
            <p className="text-muted-foreground">
              Aqui puedes ver los profesores activos.
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
