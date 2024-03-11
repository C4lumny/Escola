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

export const DeleteStudents = () => {
  const { data, loading } = useGet("students");
  const [filter, setFilter] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const { apiRequest } = useRequest();

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCheckboxChange = (student) => {
    const isChecked = selectedStudents.some((selectedStudent) => selectedStudent.identificacion === student.identificacion);

    setSelectedStudents((prev) =>
      isChecked ? prev.filter((selectedStudent) => selectedStudent.identificacion !== student.identificacion) : [...prev, student]
    );
  };

  const handleDeleteClick = async () => {
    const identificacion_estudiantes = selectedStudents;
    console.log(identificacion_estudiantes);
    const { apiData } = await apiRequest(identificacion_estudiantes, "students", "DELETE");
    console.log(apiData);
  };

  let filteredData = [];
  if (data) {
    filteredData = data.filter((student) => student.identificacion.includes(filter));
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
            <h1 className="text-xl font-semibold tracking-tight">Eliminar estudiantes</h1>
            <p className="text-muted-foreground">
              Aquí puedes ver a los estudiantes activos en tu institución, sus cursos, etc.
            </p>
          </div>
          <Separator className="my-5" />
          <div className="flex items-center py-4">
            <Input
              placeholder="Filtrar por numero de identificacion..."
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
                  <TableHead>Tipo de documento</TableHead>
                  <TableHead>Nro. Identificacion</TableHead>
                  <TableHead>Nombres</TableHead>
                  <TableHead>Apellidos</TableHead>
                  <TableHead>Cedula acudiente</TableHead>
                  <TableHead>Nombres acudiente</TableHead>
                  <TableHead>Apellidos acudiente</TableHead>
                  <TableHead>Curso asignado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((student) => (
                    <TableRow key={student.identificacion}>
                      <TableCell>
                        <Checkbox
                          className="w-4 h-4"
                          type="checkbox"
                          onCheckedChange={() => handleCheckboxChange(student)}
                        />
                      </TableCell>
                      <TableCell>{student.tipo_documento}</TableCell>
                      <TableCell className="font-medium">{student.identificacion}</TableCell>
                      <TableCell>{student.nombres}</TableCell>
                      <TableCell>{student.apellidos}</TableCell>
                      <TableCell>{student.cedula_acudiente}</TableCell>
                      <TableCell>{student.nombres_acudiente}</TableCell>
                      <TableCell>{student.apellidos_acudiente}</TableCell>
                      <TableCell>{student.id_cursos}</TableCell>
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
