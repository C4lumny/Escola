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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
import { DataTable } from "@/components/viewTable";

export const UpdateCities = () => {
  const { data, loading, mutate } = useGet("teachers");
  const [filter, setFilter] = useState("");
  const { apiRequest } = useRequest();
  const columnTitles = ["Cedula", "Nombres", "Apellidos", "Telefono", "Correo", ""];
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
    usuario: z
      .string({ required_error: "Por favor ingrese un usuario." })
      .min(5, { message: "Usuario debe tener al menos 5 caracteres." })
      .max(20, { message: "Usuario debe tener menos de 20 caracteres." }),
    contraseña_actual: z
      .string({ required_error: "Por favor ingrese una contraseña." })
      .min(5, { message: "Contraseña debe tener al menos 5 caracteres." })
      .max(20, { message: "Contraseña debe tener menos de 20 caracteres." }),
    contraseña_nueva: z
      .string({ required_error: "Por favor ingrese una contraseña." })
      .min(5, { message: "Contraseña debe tener al menos 5 caracteres." })
      .max(20, { message: "Contraseña debe tener menos de 20 caracteres." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleFilterChange = (event: any) => {
    setFilter(event.target.value);
  };

  const handleUpdateClick = async (updatedTeacher: any, teacher: any) => {
    const data = { updatedTeacher, teacher };
    const response = await apiRequest(data, "teachers", "put");
    console.log(response);
    mutate();
  };

  const handleRefreshClick = (teacher: any) => {
    form.setValue("cedula", teacher.cedula);
    form.setValue("nombres", teacher.nombres);
    form.setValue("apellidos", teacher.apellidos);
    form.setValue("telefono", teacher.telefono);
    form.setValue("correo", teacher.correo);
    form.setValue("usuario", teacher.usuario);
  };

  if (!loading) {
    dataTable = data.data.map(
      (teacher: any) =>
        ({
          cedula: teacher.cedula,
          nombres: teacher.nombres,
          apellidos: teacher.apellidos,
          telefono: teacher.telefono,
          correo: teacher.correo,
          sheet: (
            <Sheet>
              <SheetTrigger>
                <RefreshCcwDot className="cursor-pointer" onClick={() => handleRefreshClick(teacher)} />
              </SheetTrigger>
              <SheetContent className="overflow-auto">
                <SheetHeader>
                  <SheetTitle>Actualizar profesor</SheetTitle>
                </SheetHeader>
                <div className="grid gap-5 py-4">
                  <Form {...form}>
                    <form
                      className="space-y-4"
                      onSubmit={form.handleSubmit((updatedTeacher) => handleUpdateClick(updatedTeacher, teacher))}
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
                            <FormDescription>
                              Correo electrónico del docente, información relevante de contacto
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
                        name="contraseña_actual"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contraseña actual</FormLabel>
                            <FormControl>
                              <Input placeholder="**************" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* 👇 Espacio para el input de la nueva contraseña */}
                      <FormField
                        control={form.control}
                        name="contraseña_nueva"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nueva contraseña</FormLabel>
                            <FormControl>
                              <Input placeholder="**************" type="password" {...field} />
                            </FormControl>
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

    filteredData = dataTable.filter((teacher: any) => teacher.nombres.includes(filter));
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
            <h1 className="text-xl font-semibold tracking-tight">Actualizar profesores</h1>
            <p className="text-muted-foreground">Aquí puedes actualizar los profesores de tu institución.</p>
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
