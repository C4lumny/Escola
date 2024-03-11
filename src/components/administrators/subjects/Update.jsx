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

export const UpdateSubjects = () => {
  const { data, loading } = useGet("subjects");
  const teachersData = useGet("teachers");
  const coursesData = useGet("courses");
  const [filter, setFilter] = useState("");
  const { apiRequest } = useRequest();
  let filteredData = [];

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleUpdateClick = (updatedSubject, subject) => {
    console.log("hola mundo")
    const data = { updatedSubject, subject };
    console.log(data);
    apiRequest(data, "subjects", "PUT");
  };

  if (data && data.data) {
    filteredData = data.data.filter((subject) => subject.nombre.includes(filter));
  }

  // TODO: Agregar mensajes de validación y validaciones en lo que veas opcional
  const schema = yup.object({
    nombre: yup.string().required("Requerido, por favor ingresar datos"),
    descripcion: yup.string().required("Requerido, por favor ingresar datos"),
    associated_course: yup.string().required("Requerido, por favor seleccionar un curso"),
    associated_teacher: yup.string().required("Requerido, por favor seleccionar un profesor"),
  });

  const form = useForm({ resolver: yupResolver(schema) });

  const handleRefreshClick = (subject) => {
    form.setValue("nombre", subject.nombre);
    form.setValue("associated_course", subject.id_curso);
    form.setValue("associated_teacher", subject.cedula_profesor);
    form.setValue("descripcion", subject.descripcion);
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
                      <TableCell className="font-medium">{subject.nombre}</TableCell>
                      <TableCell className="font-medium">{subject.cedula_profesor}</TableCell>
                      <TableCell className="font-medium">{subject.apellidos_profesor}</TableCell>
                      <TableCell className="font-medium">{subject.nombres_profesor}</TableCell>
                      <TableCell className="font-medium">{subject.id_curso}</TableCell>
                      <TableCell className="font-medium">{subject.descripcion}</TableCell>
                      <TableCell>
                        <Sheet>
                          <SheetTrigger>
                            <RefreshCcwDot className="cursor-pointer" onClick={() => handleRefreshClick(subject)} />
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Actualizar asignatura</SheetTitle>
                              <SheetDescription>
                                Realiza cambios a tus profesores, clickea "Actualizar y finalizar" cuando termines.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-5 py-4">
                              <Form {...form}>
                                <form
                                  className="space-y-4"
                                  onSubmit={form.handleSubmit((updatedSubject) =>
                                    handleUpdateClick(updatedSubject, subject)
                                  )}
                                >
                                  {/* FIXME: Hay errores en el css con respecto a los mensajes de validación yup. (opcional) */}
                                  {/* 👇 Espacio para el input de nombre */}
                                  <FormField
                                    control={form.control}
                                    name="nombre"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Cédula</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Cedula" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* 👇 Espacio para el input de la descripcion */}
                                  <FormField
                                    control={form.control}
                                    name="descripcion"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Usuario</FormLabel>
                                        <FormControl>
                                          <Input placeholder="jesus_profesor" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* 👇 Espacio para el input de nombres  */}
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
                                        <FormDescription>
                                          Seleccione el nombre del curso que se ha asignado a esta materia
                                        </FormDescription>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  {/* 👇 Espacio para el select de profesores */}
                                  <FormField
                                    control={form.control}
                                    name="associated_teacher"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Profesor que enseñará la asignatura</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                          <FormControl>
                                            <SelectTrigger className="w-[280px]">
                                              <SelectValue placeholder="Seleccione un profesor" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectLabel>Profesores</SelectLabel>
                                              {teachersData.data.data.length > 0 ? (
                                                teachersData.data.data.map((teacher) => {
                                                  return (
                                                    <SelectItem key={teacher.cedula} value={teacher.cedula}>
                                                      {teacher.cedula} - {teacher.nombres} {teacher.apellidos}
                                                    </SelectItem>
                                                  );
                                                })
                                              ) : (
                                                <div>No hay profesores activos</div>
                                              )}
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>

                                        <FormDescription>
                                          Seleccione el nombre del profesor asignado a esta materia. Ejemplo: 'Juan
                                          Pérez'.
                                        </FormDescription>
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
