import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRequest } from "@/hooks/useApiRequest";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Input } from "@/components/ui/input";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// 👇 Icons
import { RefreshCcwDot } from "lucide-react";
import { DataTable } from "@/components/app/viewTable";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/app/table-skeleton";

export const UpdateCities = () => {
  const { data, loading, mutate } = useGet("parents");
  const [filter, setFilter] = useState("");
  const { apiRequest } = useRequest();
  const columnTitles = [
    "Cedula",
    "Nombres",
    "Apellidos",
    "Telefono",
    "Correo",
    "",
  ];
  let dataTable: string[] = [];
  let filteredData: string[] = [];

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
    correo: z
      .string({ required_error: "Por favor ingrese un correo." })
      .email({ message: "Ingrese un correo válido." }),
    telefono: z
      .string({ required_error: "Por favor ingrese un telefono. " })
      .length(10, { message: "Telefono debe tener 10 caracteres." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleFilterChange = (event: any) => {
    setFilter(event.target.value);
  };

  const handleUpdateClick = async (updatedParent: any, parent: any) => {
    const data = { updatedParent, parent };
    const response = await apiRequest(data, "parents", "put");
    if (!response.error) {
      toast.success("Curso actualizado con exito");
    } else {
      toast.error("Error al actualizar el curso");
    }
    mutate();
  };

  const handleRefreshClick = (parent: any) => {
    form.setValue("cedula", parent.cedula);
    form.setValue("nombres", parent.nombres);
    form.setValue("apellidos", parent.apellidos);
    form.setValue("telefono", parent.telefono);
    form.setValue("correo", parent.correo);
  };

  if (!loading) {
    dataTable = data.data.map(
      (parent: any) =>
        ({
          cedula: parent.cedula,
          nombres: parent.nombres,
          apellidos: parent.apellidos,
          telefono: parent.telefono,
          correo: parent.correo,
          sheet: (
            <Sheet>
              <SheetTrigger>
                <RefreshCcwDot
                  className="cursor-pointer"
                  onClick={() => handleRefreshClick(parent)}
                />
              </SheetTrigger>
              <SheetContent className="overflow-auto">
                <SheetHeader>
                  <SheetTitle>Actualizar acudiente</SheetTitle>
                </SheetHeader>
                <div className="grid gap-5 py-4">
                  <Form {...form}>
                    <form
                      className="space-y-4"
                      onSubmit={form.handleSubmit((updatedTeacher) =>
                        handleUpdateClick(updatedTeacher, parent)
                      )}
                    >
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
                            <FormDescription>
                              El numero de cedula del acudiente a ingresar.
                            </FormDescription>
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
                            <FormDescription>
                              Nombres del acudiente. Ej: Jesús Carlos
                            </FormDescription>
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
                              <Input
                                placeholder="Hernández Restrepo"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Apellidos del acudiente. Ej: Ospino Hernández
                            </FormDescription>
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
                              <Input
                                placeholder="example@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Correo electrónico del acudiente, información
                              relevante de contacto
                            </FormDescription>
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
                            <FormDescription>
                              Teléfono del acudiente, información relevante de
                              contacto
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

    filteredData = dataTable.filter((teacher: any) =>
      teacher.nombres.includes(filter)
    );
  }
  return (
    <div>
      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="space-y-5">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Actualizar acudientes
            </h1>
            <p className="text-muted-foreground">
              Aquí puedes actualizar los acudientes
            </p>
          </div>
          <Separator className="my-5" />
          <div className="flex items-center py-4">
            <Input
              placeholder="Filtrar por nombre..."
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
