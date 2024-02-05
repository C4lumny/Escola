import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRequest } from "@/hooks/useRequest";
import { useGet } from "@/hooks/useGet";
// 👇 UI imports
import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export const CreateSubjects = () => {
  const { apiRequest } = useRequest();
  const teachersData = useGet("teachers");
  const coursesData = useGet("courses");

  const onSubmit = async (data) => {
    console.log(data);
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
    const { apiData } = await apiRequest(data, "subjects", "POST");
    console.log(apiData);
  };

  const schema = yup.object({
    nombre: yup.string().required("Requerido, por favor ingresar datos"),
    descripcion: yup.string().required("Requerido, por favor ingresar datos"),
    associated_course: yup.string().required("Requerido, por favor seleccionar un curso"),
    associated_teacher: yup.string().required("Requerido, por favor seleccionar un profesor"),
  });

  const form = useForm({ resolver: yupResolver(schema) });

  return (
    <>
      {teachersData.loading || coursesData.loading ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Crear profesores</h1>
            <p className="text-muted-foreground">
              Aqui puedes ingresar / crear a los profesores que desees para tu institución.
            </p>
          </div>
          <Separator className="mt-8" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* 👇 Espacio para el input de nombre  */}
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
                      Proporcione una descripción detallada de la asignatura, por ejemplo, 'Este curso aborda los
                      principios fundamentales de la física cuántica
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
                    <FormDescription>Seleccione el nombre del curso que se ha asignado a esta materia</FormDescription>
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
                      Seleccione el nombre del profesor asignado a esta materia. Ejemplo: 'Juan Pérez'.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </>
      )}
    </>
  );
};
