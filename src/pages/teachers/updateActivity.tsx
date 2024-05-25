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
import { Textarea } from "@/components/ui/textarea";
import { isBefore, startOfToday, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeftCircle, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSubjectContext } from "@/contexts/subjectProvider";
import { useActivityContext } from "@/contexts/activityProvider";
import { useEffect } from "react";

const formSchema = z.object({
  titulo: z
    .string({ required_error: "Por favor ingrese un titulo de la actividad" })
    .min(5, {
      message: "El titulo de la actividad debe tener al menos 5 caracteres",
    })  
    .max(40, {
      message: "El titulo de la actividad no debe tener más de 40 caracteres",
    }),
  descripcion: z
    .string({ required_error: "Por favor ingrese un nombre" })
    .min(5, {
      message: "La descripción debe tener al menos 5 caracteres",
    })
    .max(200, {
      message: "La descripción no debe tener más de 200 caracteres",
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
  estado: z.string({ required_error: "Por favor seleccione un estado" }),
});

export const UpdateActivity = () => {
  const { apiRequest } = useRequest();
  const { subject } = useSubjectContext();
  const { activity } = useActivityContext();
  const today = startOfToday();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      date: {
        from: undefined,
        to: undefined,
      },
      estado: "", 
    }
  });

  useEffect(() => {
    form.setValue("titulo", activity.titulo);
    form.setValue("descripcion", activity.descripcion);
    form.setValue("date", {
      from: new Date(activity.fecha_inicio),
      to: new Date(activity.fecha_fin),
    });
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const updatedActivity = {
      titulo: values.titulo,
      descripcion: values.descripcion,
      asignatura: subject.id,
      date: {
        from: values.date.from,
        to: values.date.to,
      },
      estado: values.estado,
    };

    const data = { activity, updatedActivity }
    console.log(data);

    const response = await apiRequest(data, "activities", "put");
    if (!response.error) {
      toast.success("Actividad creada con exito");
      form.reset();
    } else {
      toast.error("Error al crear la actividad", {});
    }
  };

  return (
    <div className="flex flex-col">
      <ArrowLeftCircle className="cursor-pointer size-10" onClick={() => navigate(-2)} />
      <br />
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Actualizar actividad</h1>
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
                              {format(field.value.from, "LLL dd, y")} - {format(field.value.to, "LLL dd, y")}
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
                <FormDescription>Usuario del estudiante, importante para el inicio de sesión</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* 👇 Espacio para el select de tipo de documento */}
          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado de la actividad</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Estado</SelectLabel>
                      <SelectItem value="0">Inactivo</SelectItem>
                      <SelectItem value="1">Activo</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>Seleccione el estado de la actividad.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Actualizar actividad</Button>
        </form>
      </Form>
    </div>
  );
};
