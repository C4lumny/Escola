import { useState } from "react";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ViewSubjects = () => {
  const { data, loading } = useGet("subjects");
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  let filteredData = [];
  if (data && data.data) {
    filteredData = data.data.filter((subject) => subject.nombre.includes(filter));
  }

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
            <h1 className="text-xl font-semibold tracking-tight">Visualizar asignaturas</h1>
            <p className="text-muted-foreground">
              Aqui puedes ver las asignaturas en tu institución.
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Cedula profesor</TableHead>
                  <TableHead>Apellidos profesor</TableHead>
                  <TableHead>Nombres profesor</TableHead>
                  <TableHead>Cursos dictados</TableHead>
                  <TableHead>Descripcion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell className="font-medium w-10">{subject.nombre}</TableCell>
                      <TableCell className="font-medium w-10">{subject.cedula_profesor}</TableCell>
                      <TableCell className="font-medium w-10">{subject.apellidos_profesor}</TableCell>
                      <TableCell className="font-medium w-10">{subject.nombres_profesor}</TableCell>
                      <TableCell className="font-medium w-10">{subject.id_curso}</TableCell>
                      <TableCell className="font-medium w-10">{subject.descripcion}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>No hay registros</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};
