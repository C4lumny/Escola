import { ChangeEvent, useState } from "react";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/app/viewTable";
import { TableSkeleton } from "@/components/app/table-skeleton";

export const ViewTeachers = () => {
  const { data, loading } = useGet("parents");
  const [filter, setFilter] = useState<string>("");
  let dataTable: string[] = [];
  let filteredData: string[] = [];

  if (!loading) {
    dataTable = data.data.map(
      (parent: any) =>
        ({
          cedula: parent.cedula,
          nombres: parent.nombres,
          apellidos: parent.apellidos,
          telefono: parent.telefono,
          correo: parent.correo,
        } || [])
    );

    filteredData = dataTable.filter((parent: any) =>
      parent.cedula.toString().includes(filter)
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
              Visualizar acudientes
            </h1>
            <p className="text-muted-foreground">
              Aqui puedes ver los acudientes activos.
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
