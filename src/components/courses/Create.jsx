import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRequest } from "@/hooks/useRequest";

export const CreateCourses = () => {
  const { apiRequest } = useRequest();

  const onSubmit = async (data) => {
    console.log(data);
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
    const { apiData } = await apiRequest(data, "courses", "POST");
    console.log(apiData);
  };

  const schema = yup.object({
    id: yup
      .string()
      .required("Requerido, por favor ingresar datos")
      .min(1, "Debe ingresar al menos un carácter")
      .max(5, "Máximo 5 carácteres"),
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
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre / identificador del curso</FormLabel>
                <FormControl>
                  <Input placeholder="11-02" {...field} />
                </FormControl>
                <FormDescription>Este nombre permite identificar el curso.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* TODO: Generar validación al crear registros, de ser posible actualizar tabla x segundos después. */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};
