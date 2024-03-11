import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useRequest } from "@/hooks/useRequest";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
// 👇 Icons
import { RefreshCcwDot } from "lucide-react";

export const UpdateStudents = () => {
  const { data, loading } = useGet("students");
  const parentsData = useGet("parents");
  const coursesData = useGet("courses");
  const [filter, setFilter] = useState("");
  const { apiRequest } = useRequest();
  let filteredData = [];

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleUpdateClick = (updatedStudent, student) => {
    const data = { updatedStudent, student };
    console.log(data);
    // apiRequest(data, "students", "PUT");
  };

  if (data) {
    filteredData = data.filter((student) => student.identificacion.includes(filter));
  }

  // TODO: Agregar mensajes de validación y validaciones en lo que veas opcional
  const schema = yup.object({
    document_type: yup.string().required(),
    identificacion: yup.string().required().min(1).max(10),
    nombres: yup.string().required("Requerido, por favor ingresar datos"),
    apellidos: yup.string().required("Requerido, por favor ingresar datos"),
    user: yup.string().required("Requerido, por favor ingresar datos"),
    old_password: yup.string().required("Requerido, por favor ingresar datos"),
    new_password: yup.string().required("Requerido, por favor ingresar datos"),
    associated_course: yup.string().required("Requerido, por favor seleccionar un curso"),
    associated_parent: yup.string().required("Requerido, por favor seleccionar un acudiente"),
  });

  const form = useForm({ resolver: yupResolver(schema) });

  const handleRefreshClick = (student) => {
    form.setValue("identificacion", student.identificacion);
    form.setValue("nombres", student.nombres);
    form.setValue("apellidos", student.apellidos);
    form.setValue("user", student.usuario);
  };

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
            <h1 className="text-xl font-semibold tracking-tight">Actualizar estudiantes</h1>
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
                      <TableCell>{student.tipo_documento}</TableCell>
                      <TableCell className="font-medium">{student.identificacion}</TableCell>
                      <TableCell>{student.nombres}</TableCell>
                      <TableCell>{student.apellidos}</TableCell>
                      <TableCell>{student.cedula_acudiente}</TableCell>
                      <TableCell>{student.nombres_acudiente}</TableCell>
                      <TableCell>{student.apellidos_acudiente}</TableCell>
                      <TableCell>{student.id_cursos}</TableCell>
                      <TableCell>
                        <Sheet>
                          <SheetTrigger>
                            <RefreshCcwDot className="cursor-pointer" onClick={() => handleRefreshClick(student)} />
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Actualizar estudiante</SheetTitle>
                            </SheetHeader>
                            <div className="grid gap-5 py-4">
                              <Form {...form}>
                                <form
                                  className="space-y-4"
                                  onSubmit={form.handleSubmit((updatedSubject) =>
                                    handleUpdateClick(updatedSubject, student)
                                  )}
                                >
                                  {/* 👇 Espacio para el select de tipos documento */}
                                  <FormField
                                    control={form.control}
                                    name="document_type"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Tipo de documento</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                          <FormControl>
                                            <SelectTrigger className="w-[280px]">
                                              <SelectValue placeholder="Seleccione un profesor" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectItem value="1">Cedula</SelectItem>
                                              <SelectItem value="2">Pasaporte</SelectItem>
                                              <SelectItem value="3">Tarjeta de identidad</SelectItem>
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="identificacion"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Identificacion</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Nro de documento" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* 👇 Espacio para el input de la descripcion */}
                                  <FormField
                                    control={form.control}
                                    name="nombres"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Nombres</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Nathan David" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* 👇 Espacio para el input de apellidos */}
                                  <FormField
                                    control={form.control}
                                    name="apellidos"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Apellidos</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Ospino Hernandez" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* 👇 Espacio para el input de usuario */}
                                  <FormField
                                    control={form.control}
                                    name="user"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Usuario</FormLabel>
                                        <FormControl>
                                          <Input placeholder="nathan_student" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* 👇 Espacio para el input de contraseña actual */}
                                  <FormField
                                    control={form.control}
                                    name="old_password"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Contraseña actual</FormLabel>
                                        <FormControl>
                                          <Input placeholder="***********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* 👇 Espacio para el input de contraseña actual */}
                                  <FormField
                                    control={form.control}
                                    name="new_password"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Nueva contraseña</FormLabel>
                                        <FormControl>
                                          <Input placeholder="***********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* 👇 Espacio para el select de acudientes */}
                                  <FormField
                                    control={form.control}
                                    name="associated_parent"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Acudiente asignado al estudiante</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                          <FormControl>
                                            <SelectTrigger className="w-[280px]">
                                              <SelectValue placeholder="Seleccione un acudiente" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectLabel>Acudientes</SelectLabel>
                                              {parentsData.data.data.length > 0 ? (
                                                parentsData.data.data.map((parent) => {
                                                  return (
                                                    <SelectItem key={parent.cedula} value={parent.cedula}>
                                                      {parent.cedula} - {parent.nombres} {parent.apellidos}
                                                    </SelectItem>
                                                  );
                                                })
                                              ) : (
                                                <div>No hay acudientes activos</div>
                                              )}
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* 👇 Espacio para el select de cursos  */}
                                  <FormField
                                    control={form.control}
                                    name="associated_course"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Curso en los cuales la asignatura será dictada</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                          <FormControl>
                                            <SelectTrigger className="w-[280px]">
                                              <SelectValue placeholder="Seleccione un curso" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectLabel>Cursos</SelectLabel>
                                              {coursesData.data.data.length > 0 ? (
                                                coursesData.data.data.map((course) => {
                                                  return (
                                                    <SelectItem key={course.id} value={course.id}>
                                                      {course.id}
                                                    </SelectItem>
                                                  );
                                                })
                                              ) : (
                                                <div>No hay profesores activos</div>
                                              )}
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <SheetFooter>
                                    <SheetClose asChild>
                                      <Button type="submit">Actualizar y finalizar</Button>
                                    </SheetClose>
                                  </SheetFooter>
                                </form>
                              </Form>
                            </div>
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
