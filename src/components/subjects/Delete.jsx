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

export const DeleteSubjects = () => {
  const { data, loading } = useGet("subjects");
  const [filter, setFilter] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const { apiRequest } = useRequest();

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCheckboxChange = (course) => {
    const isChecked = selectedSubjects.some((selectedCourse) => selectedCourse.id === course.id);

    setSelectedSubjects((prev) =>
      isChecked ? prev.filter((selectedCourse) => selectedCourse.id !== course.id) : [...prev, course]
    );
  };

  const handleDeleteClick = async () => {
    const id_subjects = selectedSubjects;
    console.log(id_subjects);
    const { apiData } = await apiRequest(id_subjects, "subjects", "DELETE");
    console.log(apiData);
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
        <div className="space-y-5">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Eliminar asignaturas</h1>
            <p className="text-muted-foreground">
              Aquí puedes ver a los profesores activos en tu institución, sus cursos, etc.
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
                  <TableHead></TableHead>
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
                      <TableCell>
                        <Checkbox
                          className="w-4 h-4"
                          type="checkbox"
                          onCheckedChange={() => handleCheckboxChange(subject)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{subject.nombre}</TableCell>
                      <TableCell className="font-medium">{subject.cedula_profesor}</TableCell>
                      <TableCell className="font-medium">{subject.apellidos_profesor}</TableCell>
                      <TableCell className="font-medium">{subject.nombres_profesor}</TableCell>
                      <TableCell className="font-medium">{subject.id_curso}</TableCell>
                      <TableCell className="font-medium">{subject.descripcion}</TableCell>
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
              Borrar asignaturas
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};