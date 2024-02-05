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

export const DeleteCourses = () => {
  const { data, loading } = useGet("courses");
  const [filter, setFilter] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const { apiRequest } = useRequest();

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCheckboxChange = (course) => {
    const isChecked = selectedCourses.some((selectedCourse) => selectedCourse.id === course.id);

    setSelectedCourses((prev) =>
      isChecked ? prev.filter((selectedCourse) => selectedCourse.id !== course.id) : [...prev, course]
    );
  };

  const handleDeleteClick = async () => {
    const id_courses = selectedCourses;
    console.log(id_courses);
    const { apiData } = await apiRequest(id_courses, "courses", "DELETE");
    console.log(apiData);
  };

  let filteredData = [];
  if (data && data.data) {
    filteredData = data.data.filter((course) => course.id.includes(filter));
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
          <div className="rounded-md border w-96">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="w-10">
                        <Checkbox
                          className="w-4 h-4"
                          type="checkbox"
                          onCheckedChange={() => handleCheckboxChange(course)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{course.id}</TableCell>
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
              Borrar cursos
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
