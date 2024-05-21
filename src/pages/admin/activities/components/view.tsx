import { ChangeEvent, useState } from "react";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/viewTable";
import { TableSkeleton } from "@/components/table-skeleton";

export const ViewActivities = () => {
  const { data, loading } = useGet("activities");
  const [filter, setFilter] = useState<string>("");
  let dataTable: string[] = [];
  let filteredData: string[] = [];

  if (!loading) {
    dataTable = data.data.map((activity: any) => ({
      id: activity.id,
      titulo: activity.titulo,
      descripcion: activity.descripcion,
      fecha_inicio: new Date(activity.fecha_inicio).toLocaleDateString(),
      fecha_fin: new Date(activity.fecha_fin).toLocaleDateString(),
      nombre_asignatura: activity.nombre_asignatura,
    }));

    filteredData = dataTable.filter((activity: any) =>
      activity.titulo.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const columnTitles = ["ID", "Titulo", "Descripción", "Fecha inicio", "Fecha fin", "Nombre de la asignatura"];

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
              Visualizar actividades
            </h1>
            <p className="text-muted-foreground">
              Aqui puedes ver las actividades.
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
