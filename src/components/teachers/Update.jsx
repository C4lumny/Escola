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

export const UpdateTeachers = () => {
  const { data, loading } = useGet("teachers");
  const [filter, setFilter] = useState("");
  const { apiRequest } = useRequest();
  const [selectedTeacher, setSelectedTeacher] = useState({});
  const [updatedTeacher, setUpdatedTeacher] = useState({});
  let filteredData = [];

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleRefreshClick = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleUpdateClick = (teacher, updatedTeacher) => {
    const data = { teacher, updatedTeacher };
    apiRequest(data, "teachers", "PUT")
  };

  const handleInputChange = (event) => {
    setUpdatedTeacher({
      ...updatedTeacher,
      [event.target.id]: event.target.value,
    });
  };

  if (data && data.data) {
    filteredData = data.data.filter((teacher) => teacher.cedula.includes(filter));
  }

  useEffect(() => {
    // Establece valores predeterminados al cargar un nuevo profesor
    if (selectedTeacher && selectedTeacher.cedula) {
      setUpdatedTeacher({
        cedula: selectedTeacher.cedula,
        nombres: selectedTeacher.nombres || '',
        apellidos: selectedTeacher.apellidos || '',
        telefono: selectedTeacher.telefono || '',
        correo: selectedTeacher.correo || '',
        usuario: selectedTeacher.usuario || '',
      });
    }
  }, [selectedTeacher]);

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
                      <TableCell className="font-medium">{teacher.cedula}</TableCell>
                      <TableCell>{teacher.nombres}</TableCell>
                      <TableCell>{teacher.apellidos}</TableCell>
                      <TableCell>{teacher.telefono}</TableCell>
                      <TableCell>{teacher.correo}</TableCell>
                      <TableCell>
                        {/* TODO: Realizar validaciones en este formulario, guiarse de Create.jsx */}
                        <Sheet>
                          <SheetTrigger>
                            <RefreshCcwDot className="cursor-pointer" onClick={() => handleRefreshClick(teacher)} />
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Actualizar profesor</SheetTitle>
                              <SheetDescription>
                                Realiza cambios a tus profesores, clickea "Actualizar y finalizar" cuando termines.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="cedula" className="text-right">
                                  Cédula
                                </Label>
                                <Input
                                  id="cedula"
                                  value={updatedTeacher.cedula}
                                  onChange={handleInputChange}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nombres" className="text-right">
                                  Nombres
                                </Label>
                                <Input
                                  id="nombres"
                                  value={updatedTeacher.nombres}
                                  onChange={handleInputChange}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="apellidos" className="text-right">
                                  Apellidos
                                </Label>
                                <Input
                                  id="apellidos"
                                  value={updatedTeacher.apellidos}
                                  onChange={handleInputChange}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="telefono" className="text-right">
                                  Teléfono
                                </Label>
                                <Input
                                  id="telefono"
                                  value={updatedTeacher.telefono}
                                  onChange={handleInputChange}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="correo" className="text-right">
                                  Correo
                                </Label>
                                <Input
                                  id="correo"
                                  value={updatedTeacher.correo}
                                  onChange={handleInputChange}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="usuario" className="text-right">
                                  Usuario
                                </Label>
                                <Input
                                  id="usuario"
                                  value={updatedTeacher.usuario}
                                  onChange={handleInputChange}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contraseña_actual" className="text-right">
                                  Contraseña actual
                                </Label>
                                <Input
                                  id="contraseña_actual"
                                  type="password"
                                  placeholder="************"
                                  className="col-span-3"
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contraseña_nueva" className="text-right">
                                  Contraseña nueva
                                </Label>
                                <Input
                                  id="contraseña_nueva"
                                  type="password"
                                  placeholder="************"
                                  className="col-span-3"
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contraseña_nuevaR" className="text-right">
                                  Repetir contraseña nueva
                                </Label>
                                <Input
                                  id="contraseña_nuevaR"
                                  type="password"
                                  placeholder="************"
                                  className="col-span-3"
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <SheetFooter>
                              <SheetClose asChild>
                                {/* TODO: Mostrar mensaje de actualización correcta, y actualizar la tabla para mostrar datos actualizados */}
                                <Button type="submit" onClick={() => handleUpdateClick(teacher, updatedTeacher)}>
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
