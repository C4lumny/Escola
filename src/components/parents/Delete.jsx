import { useState } from "react";
import { useRequest } from "@/hooks/useRequest";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const DeleteParents = () => {
  const { data, loading } = useGet("parents");
  const [filter, setFilter] = useState("");
  const [selectedParents, setSelectedParents] = useState([]);
  const { apiRequest } = useRequest();

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCheckboxChange = (parent) => {
    const isChecked = selectedParents.some((selectedParent) => selectedParent.cedula === parent.cedula);

    setSelectedParents((prev) =>
      isChecked ? prev.filter((selectedParent) => selectedParent.cedula !== parent.cedula) : [...prev, parent]
    );
  };

  const handleDeleteClick = async () => {
    const cedula_acudientes = selectedParents;
    console.log(cedula_acudientes);
    const { apiData } = await apiRequest(cedula_acudientes, "parents", "DELETE");
    console.log(apiData);
  };

  let filteredData = [];
  if (data && data.data) {
    filteredData = data.data.filter((parent) => parent.cedula.includes(filter));
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
        <div className="space-y-5">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Eliminar acudientes</h1>
            <p className="text-muted-foreground">
              Aquí puedes ver a los profesores activos en tu institución, sus cursos, etc.
            </p>
          </div>
          <Separator className="my-5" />
          <div className="flex items-center py-4">
            <Input
              placeholder="Filtrar por cédula..."
              className="max-w-sm"
              value={filter}
              onChange={handleFilterChange}
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Cédula</TableHead>
                  <TableHead>Nombres</TableHead>
                  <TableHead>Apellidos</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Correo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((parent) => (
                    <TableRow key={parent.cedula}>
                      <TableCell>
                        <Checkbox
                          className="w-4 h-4"
                          type="checkbox"
                          onCheckedChange={() => handleCheckboxChange(parent)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{parent.cedula}</TableCell>
                      <TableCell>{parent.nombres}</TableCell>
                      <TableCell>{parent.apellidos}</TableCell>
                      <TableCell>{parent.telefono}</TableCell>
                      <TableCell>{parent.correo}</TableCell>
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
          <div className="flex w-full justify-end">
            <Button onClick={handleDeleteClick} variant="destructive">
              Borrar acudientes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
