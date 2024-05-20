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
import { toast } from "sonner";

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
  usuario: z
  .string({ required_error: "Por favor ingrese un usuario" }),
  contraseña: z
  .string({ required_error: "Por favor ingrese una contraseña" }),
  associated_course: z
  .string({ required_error: "Por favor seleccione un curso" }),
  associated_parent: z
  .string({ required_error: "Por favor seleccione un acudiente" }),
});

export const CreateStudents = () => {
  const { apiRequest } = useRequest();
  const parentsData = useGet("parents");
  const coursesData = useGet("courses");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nro_documento: "",
      nombres: "",
      apellidos: "",
      contraseña: "",
      usuario: "",

      /* No vuelve a valor por defecto después de crear
      associated_course: "",
      associated_parent: "",
      document_type: "",
      */
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const studentData = {
      document_type: values.document_type,
      nro_documento: values.nro_documento,
      nombres: values.nombres,
      apellidos: values.apellidos,
      usuario: values.usuario,
      contraseña: values.contraseña,
      associated_course: values.associated_course,
      associated_parent: values.associated_parent,
    };

    const response = await apiRequest(studentData, "students", "post");
    if (!response.error) {
      toast.success("Estudiante creado con exito");
      form.reset();
    } else {
      toast.error("Error al crear el estudiante", {});
    }
  };

  return (
    <>
      {coursesData.loading ? (
        <div>Cargando cursos...</div>
      ) : (
        <>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Crear estudiantes</h1>
            <p className="text-muted-foreground">Aqui puedes crear los estudiantes que desees para tu sistema.</p>
          </div>
          <Separator className="mt-8" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <FormDescription>Seleccione el nombre del curso que se ha asignado a esta materia</FormDescription>
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
                    <FormLabel>Número de documento</FormLabel>
                    <FormControl>
                      <Input placeholder="10XXXXXXXX" {...field} />
                    </FormControl>
                    <FormDescription>El número de documento del estudiante a ingresar.</FormDescription>
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
                    <FormDescription>Usuario del estudiante, importante para el inicio de sesión</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 👇 Espacio para el input de la contraseña */}
              <FormField
                control={form.control}
                name="contraseña"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input placeholder="**************" type="password" {...field} />
                    </FormControl>
                    <FormDescription>Contraseña del acudiente, importante para el inicio de sesión</FormDescription>
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
                    <FormDescription>Seleccione el nombre del curso que se ha asignado a esta materia</FormDescription>
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
                    <FormDescription>Seleccione el nombre del curso que se ha asignado a esta materia</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Crear estudiante</Button>
            </form>
          </Form>
        </>
      )}
    </>
  );
};
