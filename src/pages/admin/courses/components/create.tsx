import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRequest } from "@/hooks/useApiRequest";

const formSchema = z.object({
  id: z
    .string()
    .min(1, {
      message: "Curso debe contener al menos 1 caracter",
    })
    .max(5, { message: "Curso debe contener máximo 5 caracteres" }),
});

export const CreateCourses = () => {
  const { apiRequest } = useRequest();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await apiRequest(values, "courses", "post");
    if (!response.error) {
      toast.success("Curso creado con exito");
      form.reset();
    }else {
      toast.error("Error al crear el curso", {

      });
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
    },
  });

  return (
    <>
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Crear cursos</h1>
        <p className="text-muted-foreground">Aqui puedes ingresar / crear los cursos que desees para tu institución.</p>
      </div>
      <Separator className="mt-8" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* 👇 Espacio para el input de nombre  */}
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Id del curso</FormLabel>
                <FormControl>
                  <Input placeholder="11-01" {...field} />
                </FormControl>
                <FormDescription>
                  El ID del curso vendria a ser lo mismo que el nombre, ej: 11-01, 6-02, etc.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Crear curso</Button>
        </form>
      </Form>
    </>
  );
};
