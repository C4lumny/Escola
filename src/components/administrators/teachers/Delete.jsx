import { useState } from "react";
import { useRequest } from "@/hooks/useRequest";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Checkbox } from "../../ui/checkbox";
import { Button } from "../../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const DeleteTeachers = () => {
  const { data, loading } = useGet("teachers");
  const [filter, setFilter] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const { apiRequest } = useRequest();

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCheckboxChange = (teacher) => {
    const isChecked = selectedTeachers.some((selectedTeacher) => selectedTeacher.cedula === teacher.cedula);

    setSelectedTeachers((prev) =>
      isChecked ? prev.filter((selectedTeacher) => selectedTeacher.cedula !== teacher.cedula) : [...prev, teacher]
    );
  };

  const handleDeleteClick = async () => {
    const cedula_profesores = selectedTeachers;
    console.log(cedula_profesores);
    const { apiData } = await apiRequest(cedula_profesores, "teachers", "DELETE");
    console.log(apiData);
  };

  let filteredData = [];
  if (data && data.data) {
    filteredData = data.data.filter((teacher) => teacher.cedula.includes(filter));
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
            <h1 className="text-xl font-semibold tracking-tight">Visualizar profesores</h1>
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
                  filteredData.map((teacher) => (
                    <TableRow key={teacher.cedula}>
                      <TableCell>
                        <Checkbox
                          className="w-4 h-4"
                          type="checkbox"
                          onCheckedChange={() => handleCheckboxChange(teacher)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{teacher.cedula}</TableCell>
                      <TableCell>{teacher.nombres}</TableCell>
                      <TableCell>{teacher.apellidos}</TableCell>
                      <TableCell>{teacher.telefono}</TableCell>
                      <TableCell>{teacher.correo}</TableCell>
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
              Borrar profesores
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
