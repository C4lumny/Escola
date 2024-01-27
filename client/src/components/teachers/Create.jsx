import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usePost } from "@/hooks/usePost";

export const CreateTeachers = () => {
  const { postData } = usePost();

  const onSubmit = async (data) => {
    console.log(data);
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
    const { apiData } = await postData(data, "/registro/profesor");
    console.log(apiData);
  };

  const schema = yup.object({
    cedula: yup
      .string()
      .required("Ingrese un numero de cedula")
      .min(1)
      .max(10)
      .test(
        "onlyDigits", // type of the validator (should be unique)
        "Ingresa solo numeros por favor.", // error message
        (value) => /^\d+$/.test(value)
      ),
    telefono: yup
      .string()
      .required("Ingrese un numero de telefono")
      .min(1)
      .max(10)
      .test(
        "onlyDigits", // type of the validator (should be unique)
        "Ingresa solo numeros por favor.", // error message
        (value) => /^\d+$/.test(value)
      ),
    nombres: yup.string().required("Ingrese nombres").min(2).max(50),
    apellidos: yup.string().required("Ingrese apellidos").min(2).max(50),
    correo: yup.string().email().required("Ingrese un correo valido"),
    usuario: yup.string().min(5).max(100).required(),
    contraseña: yup.string().required().min(5).max(100),
  });

  const form = useForm({ resolver: yupResolver(schema) });

  return (
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
                <FormDescription>Teléfono del docente, información relevante de contacto</FormDescription>
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
                <FormDescription>Teléfono del docente, información relevante de contacto</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};
