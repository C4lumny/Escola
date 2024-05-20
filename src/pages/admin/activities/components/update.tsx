import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRequest } from "@/hooks/useApiRequest";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
// 👇 Icons
import { CalendarIcon, RefreshCcwDot } from "lucide-react";
import { DataTable } from "@/components/viewTable";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isBefore, startOfToday } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  titulo: z
    .string({ required_error: "Por favor ingrese un titulo de la actividad" })
    .min(5, { message: "El titulo de la actividad debe tener al menos 5 caracteres" })
    .max(15, { message: "El titulo de la actividad no debe tener más de 15 caracteres" }),
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
      from: z.date({ required_error: "Por favor seleccione una fecha de inicio" }),
      to: z.date({ required_error: "Por favor seleccione una fecha de fin" }),
    },
    { required_error: "Por favor seleccione una fecha" }
  ),
  asignatura: z.string({ required_error: "Por favor seleccione una asignatura" }),
});

export const UpdateActivity = () => {
  const { data, loading, mutate } = useGet("activities");
  const subjectsData = useGet("subjects");
  const [filter, setFilter] = useState("");
  const { apiRequest } = useRequest();
  const today = startOfToday();
  const columnTitles = ["ID", "Titulo", "Descripcion", "Fecha inicio", "Fecha fin", "Nombre de la asignatura"];

  let dataTable: string[] = [];
  let filteredData: string[] = [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      date: {},
    },
  });

  const handleFilterChange = (event: any) => {
    setFilter(event.target.value);
  };

  const handleUpdateClick = async (updatedActivity: any, activity: any) => {
    const data = { updatedActivity, activity };
    const response = await apiRequest(data, "activities", "put");
    if (!response.error) {
      toast.success("Actividad actualizada con exito");
    } else {
      toast.error("Error al actualizar la actividad");
    }
    mutate();
  };

  const handleRefreshClick = (activity: any) => {
    form.setValue("titulo", activity.titulo);
    form.setValue("descripcion", activity.descripcion);
    form.setValue("asignatura", activity.asignatura.id.toString());
  };

  if (!loading) {
    dataTable = data.data.map(
      (activity: any) =>
        ({
          id: activity.id,
          titulo: activity.titulo,
          descripcion: activity.descripcion,
          fecha_inicio: new Date(activity.fecha_inicio).toLocaleDateString(),
          fecha_fin: new Date(activity.fecha_fin).toLocaleDateString(),
          nombre_asignatura: activity.nombre_asignatura,
          sheet: (
            <Sheet>
              <SheetTrigger>
                <RefreshCcwDot className="cursor-pointer" onClick={() => handleRefreshClick(activity)} />
              </SheetTrigger>
              <SheetContent className="overflow-auto">
                <SheetHeader>
                  <SheetTitle>Actualizar pais</SheetTitle>
                </SheetHeader>
                <div className="grid gap-5 py-4">
                  <Form {...form}>
                    <form
                      className="space-y-4"
                      onSubmit={form.handleSubmit((updatedStudent) => handleUpdateClick(updatedStudent, activity))}
                    >
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
                              <Textarea
                                placeholder="En esta actividad aprenderás a..."
                                className="resize-none"
                                {...field}
                              />
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
                              Usuario del estudiante, importante para el inicio de sesión
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
                                        <SelectItem key={subject.id.toString()} value={subject.id.toString()}>
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
                              Seleccione el nombre del curso que se ha asignado a esta materia
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="submit">Actualizar y finalizar</Button>
                        </SheetClose>
                      </SheetFooter>
                    </form>
                  </Form>
                </div>
              </SheetContent>
            </Sheet>
          ),
        } || [])
    );

    filteredData = dataTable.filter((item: any) => item.titulo.toString().includes(filter));
  }
  return (
    <div>
      {loading ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Actualizar actividades</h1>
            <p className="text-muted-foreground">Aquí puedes actualizar las actividades.</p>
          </div>
          <Separator className="my-5" />
          <div className="flex items-center py-4">
            <Input
              placeholder="Filtrar por titulo..."
              className="max-w-sm"
              value={filter}
              onChange={handleFilterChange}
            />
          </div>
          <div className="rounded-md border">
            <DataTable columnTitles={columnTitles} data={filteredData} />
          </div>
        </div>
      )}
    </div>
  );
};
