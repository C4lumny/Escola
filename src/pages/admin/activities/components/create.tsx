import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRequest } from "@/hooks/useApiRequest";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
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
import { useGet } from "@/hooks/useGet";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  titulo: z
    .string({ required_error: "Por favor ingrese un numero de documento" })
    .min(5, { message: "El numero de documento debe tener al menos 5 caracteres" })
    .max(15, { message: "El numero de documento no debe tener más de 15 caracteres" }),
  descripcion: z
    .string({ required_error: "Por favor ingrese un nombre" })
    .min(1, {
      message: "El nombre del estudiante debe tener al menos 2 caracteres.",
    })
    .max(20, {
      message: "El nombre no debe tener más de 20 caracteres",
    }),
  fecha_inicio: z.string({ required_error: "Por favor ingrese una contraseña" }),
  fecha_fin: z.string({ required_error: "Por favor seleccione un curso" }),
  asignatura: z.string({ required_error: "Por favor seleccione un acudiente" }),
});

export const CreateActivities = () => {
  const { apiRequest } = useRequest();
  const subjectsData = useGet("subjects");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      fecha_inicio: "",
      fecha_fin: "",
      asignatura: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await apiRequest(values, "activities", "post");
    console.log(response);
  };

  return (
    <>
      {subjectsData.loading ? (
        <div>Cargando cursos...</div>
      ) : (
        <>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Crear actividades</h1>
            <p className="text-muted-foreground">Aqui puedes crear las actividades que desees para tu sistema.</p>
          </div>
          <Separator className="mt-8" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* 👇 Espacio para el input de nro_documento  */}
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo</FormLabel>
                    <FormControl>
                      <Input placeholder="Actividad II Ingles" {...field} />
                    </FormControl>
                    <FormDescription>El titulo de la actividad a ingresar.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 👇 Espacio para el input del nombre */}
              <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea placeholder="En esta actividad aprenderás a..." className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>La descripción de la actividad a ingresar.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 👇 Espacio para el input de apellidos  */}
              <FormField
                control={form.control}
                name="fecha_inicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de inicio</FormLabel>
                    <FormControl>
                      <Input placeholder="Hernández Restrepo" {...field} />
                    </FormControl>
                    <FormDescription>Apellidos del acudiente. Ej: Ospino Hernández</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 👇 Espacio para el input de la fecha */}
              <FormField
                control={form.control}
                name="fecha_fin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de finalización</FormLabel>
                    <FormControl>
                      <Input placeholder="jesus_profesor" {...field} />
                    </FormControl>
                    <FormDescription>Usuario del estudiante, importante para el inicio de sesión</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 👇 Espacio para el select del acudiente */}
              <FormField
                control={form.control}
                name="asignatura"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asignatura asignada a la actividad</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Seleccione una asignatura" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Asignaturas</SelectLabel>
                          {subjectsData.data.data.length > 0 ? (
                            subjectsData.data.data.map((subject: any) => {
                              return (
                                <SelectItem key={subject.id} value={subject.id}>
                                  {subject.nombre}
                                </SelectItem>
                              );
                            })
                          ) : (
                            <div>No hay asignaturas activos</div>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>Seleccione el nombre del curso que se ha asignado a esta materia</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Crear actividad</Button>
            </form>
          </Form>
        </>
      )}
    </>
  );
};
