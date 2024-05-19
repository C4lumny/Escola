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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
import { toast } from "sonner";

export const UpdateSubject = () => {
  const { data, loading, mutate } = useGet("subjects");
  const { apiRequest } = useRequest();
  const teachersData = useGet("teachers");
  const coursesData = useGet("courses");
  const [filter, setFilter] = useState("");
  const columnTitles = [
    "Nombre",
    "Cedula profesor",
    "Apellidos profesor",
    "Nombres profesor",
    "Cursos dictados",
    "Descripcion",
  ];
  let dataTable: string[] = [];
  let filteredData: string[] = [];

  const formSchema = z.object({
    nombre: z.string().min(2, {
      message: "country must be at least 2 characters.",
    }),
    descripcion: z.string().min(2, {
      message: "country must be at least 2 characters.",
    }),
    associated_course: z.string(),
    associated_teacher: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
    },
  });

  const handleFilterChange = (event: any) => {
    setFilter(event.target.value);
  };

  const handleUpdateClick = async (updatedSubject: any, subject: any) => {
    const data = { updatedSubject, subject };
    const response = await apiRequest(data, "subjects", "put");
    if (!response.error) {
      toast.success("Materia actualizada con exito");
    } else {
      toast.error("Error al actualizar la materia");
    }
    mutate();
  };

  const handleRefreshClick = (subject: any) => {
    form.setValue("nombre", subject.nombre);
    form.setValue("associated_course", subject.id_curso);
    form.setValue("associated_teacher", subject.cedula_profesor);
    form.setValue("descripcion", subject.descripcion);
  };

  if (!loading) {
    console.log(data);
    dataTable = data.data.map(
      (subject: any) =>
        ({
          nombre: subject.nombre,
          cedula_profesor: subject.cedula_profesor,
          apellidos_profesor: subject.apellidos_profesor,
          nombres_profesor: subject.nombres_profesor,
          cursos_dictados: subject.id_curso,
          descripcion: subject.descripcion,
          sheet: (
            <Sheet>
              <SheetTrigger>
                <RefreshCcwDot className="cursor-pointer" onClick={() => handleRefreshClick(subject)} />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Actualizar pais</SheetTitle>
                </SheetHeader>
                <div className="grid gap-5 py-4">
                  <Form {...form}>
                    <form
                      className="space-y-4"
                      onSubmit={form.handleSubmit((updatedCountry) => handleUpdateClick(updatedCountry, subject))}
                    >
                      <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre de la asignatura</FormLabel>
                            <FormControl>
                              <Input placeholder="Química Orgánica" {...field} />
                            </FormControl>
                            <FormDescription>
                              Ingrese el nombre completo de la asignatura, por ejemplo, 'Química Orgánica'
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* 👇 Espacio para el input de descripcion  */}
                      <FormField
                        control={form.control}
                        name="descripcion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripcion de la asignatura</FormLabel>
                            <FormControl>
                              <Input placeholder="Fundamentales de la física cuántica" {...field} />
                            </FormControl>
                            <FormDescription>
                              Proporcione una descripción detallada de la asignatura, por ejemplo, 'Este curso aborda
                              los principios fundamentales de la física cuántica
                            </FormDescription>
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
                                    coursesData.data.data.map((course: any) => {
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
                                    teachersData.data.data.map((teacher: any) => {
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
                              Seleccione el nombre del profesor asignado a esta materia. Ejemplo: 'Juan Pérez'.
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

    filteredData = dataTable.filter((subject: any) => subject.nombre.includes(filter));
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
            <h1 className="text-xl font-semibold tracking-tight">Actualizar materias</h1>
            <p className="text-muted-foreground">Aquí puedes actualizar las materias.</p>
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
