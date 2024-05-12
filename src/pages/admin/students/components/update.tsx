import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRequest } from "@/hooks/useApiRequest";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import {
  Sheet,
  SheetClose,
  SheetContent,
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
import { DataTable } from "@/components/viewTable";

const formSchema = z.object({
  document_type: z.string({ required_error: "Por favor seleccione un tipo de documento" }),
  nro_documento: z
    .string({ required_error: "Por favor ingrese un numero de documento" })
    .min(5, { message: "El numero de documento debe tener al menos 5 caracteres" })
    .max(15, { message: "El numero de documento no debe tener más de 15 caracteres" })
    .regex(/^\d+$/, { message: "El numero de documento solo puede contener numeros" }),
  nombres: z
    .string({ required_error: "Por favor ingrese un nombre" })
    .min(1, {
      message: "El nombre del estudiante debe tener al menos 2 caracteres.",
    })
    .max(20, {
      message: "El nombre no debe tener más de 20 caracteres",
    }),
  apellidos: z
    .string({ required_error: "Por favor ingrese los apellidos" })
    .min(1, {
      message: "Los apellidos del estudiante deben tener al menos 2 caracteres.",
    })
    .max(20, {
      message: "Los apellidos no deben tener más de 20 caracteres",
    }),
  usuario: z.string({ required_error: "Por favor ingrese un usuario" }),
  contraseña_actual: z.string({ required_error: "Por favor ingrese una contraseña" }),
  contraseña_nueva: z.string({ required_error: "Por favor ingrese una contraseña" }),
  associated_course: z.string({ required_error: "Por favor seleccione un curso" }),
  associated_parent: z.string({ required_error: "Por favor seleccione un acudiente" }),
});

export const UpdateStudents = () => {
  const { data, loading, mutate } = useGet("students");
  const parentsData = useGet("parents");
  const coursesData = useGet("courses");
  const [filter, setFilter] = useState("");
  const { apiRequest } = useRequest();
  const columnTitles = [
    "Tipo de documento",
    "Nro. identificacion",
    "Nombres",
    "Apellidos",
    "Cedula acudiente",
    "Nombres acudieinte",
    "Apellidos acudiente",
    "Curso",
    "",
  ];
  let dataTable: string[] = [];
  let filteredData: string[] = [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nro_documento: "",
      nombres: "",
      apellidos: "",
    },
  });

  const handleFilterChange = (event: any) => {
    setFilter(event.target.value);
  };

  const handleUpdateClick = (updatedStudent: any, student: any) => {
    const data = { updatedStudent, student };
    console.log(data);
    apiRequest(data, "students", "put");
    mutate();
  };

  const handleRefreshClick = (student: any) => {
    form.setValue("nro_documento", student.identificacion);
    form.setValue("nombres", student.nombres);
    form.setValue("apellidos", student.apellidos);
    form.setValue("usuario", student.usuario);
    form.setValue("associated_course", student.associated_course.id_cursos);
    form.setValue("associated_parent", student.associated_parent.identificacion);
  };

  if (!loading) {
    console.log(parentsData.data);
    console.log(coursesData.data)
    dataTable = data.map(
      (student: any) =>
        ({
          tipodocumento: student.tipo_documento,
          identificacion: student.identificacion,
          nombres: student.nombres,
          apellidos: student.apellidos,
          cedulaacudiente: student.cedula_acudiente,
          nombrescudiente: student.nombres_acudiente,
          apellidocudiente: student.apellidos_acudiente,
          cursoasignado: student.id_cursos,
          sheet: (
            <Sheet>
              <SheetTrigger>
                <RefreshCcwDot className="cursor-pointer" onClick={() => handleRefreshClick(student)} />
              </SheetTrigger>
              <SheetContent className="overflow-auto">
                <SheetHeader>
                  <SheetTitle>Actualizar pais</SheetTitle>
                </SheetHeader>
                <div className="grid gap-5 py-4">
                  <Form {...form}>
                    <form
                      className="space-y-4"
                      onSubmit={form.handleSubmit((updatedStudent) => handleUpdateClick(updatedStudent, student))}
                    >
                      {/* 👇 Espacio para el select de tipo de documento */}
                      <FormField
                        control={form.control}
                        name="document_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de documento</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-[280px]">
                                  <SelectValue placeholder="Seleccione un tipo..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Tipo de documento</SelectLabel>
                                  <SelectItem value="1">Cédula de ciudadania</SelectItem>
                                  <SelectItem value="2">Pasaporte</SelectItem>
                                  <SelectItem value="3">Tarjeta de identidad</SelectItem>
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
                      {/* 👇 Espacio para el input de nro_documento  */}
                      <FormField
                        control={form.control}
                        name="nro_documento"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Numero de documento</FormLabel>
                            <FormControl>
                              <Input placeholder="10XXXXXXXX" {...field} />
                            </FormControl>
                            <FormDescription>El numero de documento del estudiante a ingresar.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* 👇 Espacio para el input del nombre */}
                      <FormField
                        control={form.control}
                        name="nombres"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre del estudiante</FormLabel>
                            <FormControl>
                              <Input placeholder="Pepito" {...field} />
                            </FormControl>
                            <FormDescription>El nombre del estudiante a ingresar.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* 👇 Espacio para el input de apellidos  */}
                      <FormField
                        control={form.control}
                        name="apellidos"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Apellidos</FormLabel>
                            <FormControl>
                              <Input placeholder="Hernández Restrepo" {...field} />
                            </FormControl>
                            <FormDescription>Apellidos del acudiente. Ej: Ospino Hernández</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* 👇 Espacio para el input del usuario */}
                      <FormField
                        control={form.control}
                        name="usuario"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Usuario</FormLabel>
                            <FormControl>
                              <Input placeholder="jesus_profesor" {...field} />
                            </FormControl>
                            <FormDescription>
                              Usuario del estudiante, importante para el inicio de sesión
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* 👇 Espacio para el input de la contraseña */}
                      <FormField
                        control={form.control}
                        name="contraseña_actual"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contraseña antigua</FormLabel>
                            <FormControl>
                              <Input placeholder="**************" type="password" {...field} />
                            </FormControl>
                            <FormDescription>
                              Contraseña del acudiente, importante para el inicio de sesión
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* 👇 Espacio para el input de la contraseña */}
                      <FormField
                        control={form.control}
                        name="contraseña_nueva"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nueva Contraseña</FormLabel>
                            <FormControl>
                              <Input placeholder="**************" type="password" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* 👇 Espacio para el select del curso */}
                      <FormField
                        control={form.control}
                        name="associated_course"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Curso asignado al estudiante</FormLabel>
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
                                    coursesData.data.data.map((course: any) => {
                                      return (
                                        <SelectItem key={course.id} value={course.id}>
                                          {course.id}
                                        </SelectItem>
                                      );
                                    })
                                  ) : (
                                    <div>No hay cursos activos</div>
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
                      {/* 👇 Espacio para el select del acudiente */}
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
                                    parentsData.data.data.map((parent: any) => {
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
                            <FormDescription>
                              Seleccione el nombre del curso que se ha asignado a esta materia
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
          ),
        } || [])
    );

    filteredData = dataTable.filter((item: any) => item.nombres.toString().includes(filter));
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
            <h1 className="text-xl font-semibold tracking-tight">Actualizar estudiantes</h1>
            <p className="text-muted-foreground">Aquí puedes actualizar los estudiantes.</p>
          </div>
          <Separator className="my-5" />
          <div className="flex items-center py-4">
            <Input placeholder="Filtrar por nombre..." className="max-w-sm" value={filter} onChange={handleFilterChange} />
          </div>
          <div className="rounded-md border">
            <DataTable columnTitles={columnTitles} data={filteredData} />
          </div>
        </div>
      )}
    </div>
  );
};
