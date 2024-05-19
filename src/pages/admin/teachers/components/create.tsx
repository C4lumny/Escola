import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRequest } from "@/hooks/useApiRequest";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  cedula: z.string({ required_error: "Por favor ingrese una cédula." }),
  nombres: z
    .string({ required_error: "Por favor ingrese un nombre. " })
    .min(2, {
      message: "Nombre debe tener al menos 2 caracteres.",
    })
    .max(50, { message: "Nombre debe tener menos de 50 caracteres." }),
  apellidos: z
    .string({ required_error: "Por favor ingrese un apellido. " })
    .min(2, {
      message: "Apellidos debe tener al menos 2 caracteres.",
    })
    .max(50, { message: "Apellidos debe tener menos de 50 caracteres." }),
  correo: z.string({ required_error: "Por favor ingrese un correo." }).email({ message: "Ingrese un correo válido." }),
  telefono: z
    .string({ required_error: "Por favor ingrese un telefono. " })
    .length(10, { message: "Telefono debe tener 10 caracteres." }),
  usuario: z
    .string({ required_error: "Por favor ingrese un usuario." })
    .min(5, { message: "Usuario debe tener al menos 5 caracteres." })
    .max(20, { message: "Usuario debe tener menos de 20 caracteres." }),
  contraseña: z
    .string({ required_error: "Por favor ingrese una contraseña." })
    .min(5, { message: "Contraseña debe tener al menos 5 caracteres." })
    .max(20, { message: "Contraseña debe tener menos de 20 caracteres." }),
});

export const CreateTeachers = () => {
  const { apiRequest } = useRequest();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    await apiRequest(values, "teachers", "post");
  };

  return (
    <>
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Crear profesores</h1>
        <p className="text-muted-foreground">Aqui puedes crear los profesores que desees para tu institución.</p>
      </div>
      <Separator className="mt-8" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* 👇 Espacio para el input de cedula  */}
          <FormField
            control={form.control}
            name="cedula"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cédula</FormLabel>
                <FormControl>
                  <Input placeholder="Cedula" {...field} />
                </FormControl>
                <FormDescription>El numero de cedula del docente a ingresar.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* 👇 Espacio para el input de nombres  */}
          <FormField
            control={form.control}
            name="nombres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombres</FormLabel>
                <FormControl>
                  <Input placeholder="Jose" {...field} />
                </FormControl>
                <FormDescription>Nombres del docente. Ej: Jesús Carlos</FormDescription>
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
                <FormDescription>Apellidos del docente. Ej: Ospino Hernández</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* 👇 Espacio para el input del correo */}
          <FormField
            control={form.control}
            name="correo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electronico / Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@example.com" {...field} />
                </FormControl>
                <FormDescription>Correo electrónico del docente, información relevante de contacto</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* 👇 Espacio para el input del celular */}
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono / Celular</FormLabel>
                <FormControl>
                  <Input placeholder="3000000000" {...field} />
                </FormControl>
                <FormDescription>Teléfono del docente, información relevante de contacto</FormDescription>
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
                <FormDescription>Usuario del docente, importante para el inicio de sesión</FormDescription>
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
                <FormDescription>Contraseña del docente, importante para el inicio de sesión</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Crear profesor</Button>
        </form>
      </Form>
    </>
  );
};
