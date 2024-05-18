import { useState, ChangeEvent } from "react";
import { useRequest } from "@/hooks/useApiRequest";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const DeleteCourse = () => {
  const { data, loading, mutate } = useGet("courses");
  const { apiRequest } = useRequest();
  const [filter, setFilter] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<any>();
  let filteredData: string[] = [];

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.value);
  };

  const handleCheckboxChange = (curso: any) => {
    setSelectedCourse(curso);
  };

  const handleDeleteClick = async () => {
    await apiRequest(null, `courses/${selectedCourse?.id}`, "delete");
    mutate();
  };

  if (data && data.data) {
    filteredData = data.data.filter((course: any) => course.id.includes(filter));
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
            <h1 className="text-xl font-semibold tracking-tight">Eliminar cursos</h1>
            <p className="text-muted-foreground">Aquí puedes eliminar los cursos.</p>
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
                  <TableHead>ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((course: any) => (
                    <TableRow key={course.id}>
                      <TableCell className="w-10">
                        <Checkbox
                          className="w-4 h-4"
                          checked={course === selectedCourse}
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
              Borrar curso
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
