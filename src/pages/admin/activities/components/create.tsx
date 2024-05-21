import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRequest } from "@/hooks/useApiRequest";
import { useGet } from "@/hooks/useGet";
// 👇 UI imports
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { isBefore, startOfToday, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { FormSkeleton } from "@/components/form-skeleton";

const formSchema = z.object({
  titulo: z
    .string({ required_error: "Por favor ingrese un titulo de la actividad" })
    .min(5, {
      message: "El titulo de la actividad debe tener al menos 5 caracteres",
    })
    .max(15, {
      message: "El titulo de la actividad no debe tener más de 15 caracteres",
    }),
  descripcion: z
    .string({ required_error: "Por favor ingrese un nombre" })
    .min(5, {
      message: "La descripción debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "La descripción no debe tener más de 20 caracteres",
    }),
  date: z.object(
    {
      from: z.date({
        required_error: "Por favor seleccione una fecha de inicio",
      }),
      to: z.date({ required_error: "Por favor seleccione una fecha de fin" }),
    },
    { required_error: "Por favor seleccione una fecha" }
  ),
  asignatura: z.string({
    required_error: "Por favor seleccione una asignatura",
  }),
});

export const CreateActivities = () => {
  const { apiRequest } = useRequest();
  const subjectsData = useGet("subjects");
  const today = startOfToday();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      date: {},
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    const response = await apiRequest(values, "activities", "post");
    if (!response.error) {
      toast.success("Estudiante creado con exito");
      form.reset();
    } else {
      toast.error("Error al crear el estudiante", {});
    }
  };

  return (
    <>
      {subjectsData.loading ? (
        <FormSkeleton />
      ) : (
        <>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Crear actividades
            </h1>
            <p className="text-muted-foreground">
              Aqui puedes crear las actividades que desees para tu sistema.
            </p>
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
                    <FormDescription>
                      El titulo de la actividad a ingresar.
                    </FormDescription>
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
                      <Textarea
                        placeholder="En esta actividad aprenderás a..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      La descripción de la actividad a ingresar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 👇 Espacio para el input de la fecha */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Rango de fecha de la actividad</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "w-[300px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "LLL dd, y")} -{" "}
                                  {format(field.value.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(field.value.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Seleccione una fecha</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                          disabled={(date) => isBefore(date, today)}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Usuario del estudiante, importante para el inicio de
                      sesión
                    </FormDescription>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                                <SelectItem
                                  key={subject.id.toString()}
                                  value={subject.id.toString()}
                                >
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
                    <FormDescription>
                      Seleccione el nombre del curso que se ha asignado a esta
                      materia
                    </FormDescription>
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
