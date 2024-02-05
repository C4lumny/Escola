import { useState, useEffect } from "react";
import { useRequest } from "@/hooks/useRequest";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// 👇 Icons
import { RefreshCcwDot } from "lucide-react";

/* TODO: realizar loader mientras los datos están cargando 
En la linea 28, useGet trae data y loading. Puedes usar loading para validar la
animación de carga */

export const UpdateCourses = () => {
  const { data, loading } = useGet("courses");
  const [filter, setFilter] = useState("");
  const { apiRequest } = useRequest();
  const [selectedCourse, setSelectedCourse] = useState({});
  const [updatedCourse, setUpdatedCourse] = useState({});
  let filteredData = [];

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleRefreshClick = (course) => {
    setSelectedCourse(course);
  };

  const handleUpdateClick = (course, updatedCourse) => {
    const data = { course, updatedCourse };
    apiRequest(data, "courses", "PUT")
  };

  const handleInputChange = (event) => {
    setUpdatedCourse({
      ...updatedCourse,
      [event.target.id]: event.target.value,
    });
  };

  if (data && data.data) {
    filteredData = data.data.filter((course) => course.id.includes(filter));
  }

  useEffect(() => {
    // Establece valores predeterminados al cargar un nuevo profesor
    if (selectedCourse && selectedCourse.id) {
      setUpdatedCourse({
        id: selectedCourse.id,
      });
    }
  }, [selectedCourse]);

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
                  <TableHead>ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.id}</TableCell>
                      <TableCell className="w-5">
                        <Sheet>
                          <SheetTrigger>
                            <RefreshCcwDot className="cursor-pointer" onClick={() => handleRefreshClick(course)} />
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Actualizar curso</SheetTitle>
                              <SheetDescription>
                                Realiza cambios a tus cursos, clickea "Actualizar y finalizar" cuando termines.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="id" className="text-right">
                                  ID
                                </Label>
                                <Input
                                  id="id"
                                  value={updatedCourse.id}
                                  onChange={handleInputChange}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <SheetFooter>
                              <SheetClose asChild>
                                {/* TODO: Generar validación al actualizar datos, de ser posible actualizar tabla x segundos después. */}
                                <Button type="submit" onClick={() => handleUpdateClick(course, updatedCourse)}>
                                  Actualizar y finalizar
                                </Button>
                              </SheetClose>
                            </SheetFooter>
                          </SheetContent>
                        </Sheet>
                      </TableCell>
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
