import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRequest } from "@/hooks/useApiRequest";
import { useGet } from "@/hooks/useGet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { toast } from "sonner";
import { FormSkeleton } from "@/components/form-skeleton";

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

export const CreateSubjects = () => {
  const { apiRequest } = useRequest();
  const teachersData = useGet("teachers");
  const coursesData = useGet("courses");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await apiRequest(values, "subjects", "post");
    if (!response.error) {
      toast.success("Materia creada con exito");
      form.reset();
    } else {
      toast.error("Error al crear la materia", {});
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
    },
  });

  return (
    <>
      {teachersData.loading || coursesData.loading ? (
        <FormSkeleton />
      ) : (
        <>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Crear materias
            </h1>
            <p className="text-muted-foreground">
              Aqui puedes ingresar / crear las materias que desees para tu
              institución.
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
                      Ingrese el nombre completo de la asignatura, por ejemplo,
                      'Química Orgánica'
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
                      <Input
                        placeholder="Fundamentales de la física cuántica"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Proporcione una descripción detallada de la asignatura,
                      por ejemplo, 'Este curso aborda los principios
                      fundamentales de la física cuántica
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
                    <FormLabel>
                      Curso en los cuales la asignatura será dictada
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                      Seleccione el nombre del curso que se ha asignado a esta
                      materia
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                                <SelectItem
                                  key={teacher.cedula}
                                  value={teacher.cedula}
                                >
                                  {teacher.cedula} - {teacher.nombres}{" "}
                                  {teacher.apellidos}
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
                      Seleccione el nombre del profesor asignado a esta materia.
                      Ejemplo: 'Juan Pérez'.
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
