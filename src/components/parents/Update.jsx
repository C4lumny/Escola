import { useState, useEffect } from "react";
import { useRequest } from "@/hooks/useRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// 👇 Icons
import { RefreshCcwDot } from "lucide-react";

export const UpdateParents = () => {
  const { data, loading } = useGet("parents");
  const [filter, setFilter] = useState("");
  const { apiRequest } = useRequest();
  let filteredData = [];

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleUpdateClick = (updatedParent, parent) => {
    const data = { updatedParent, parent };
    console.log(data);
    apiRequest(data, "parents", "PUT");
  };

  if (data && data.data) {
    filteredData = data.data.filter((parent) => parent.cedula.includes(filter));
  }

  // TODO: Agregar mensajes de validación y validaciones en lo que veas opcional
  const schema = yup.object({
    cedula: yup.string().required("Ingrese un numero de cedula").min(1).max(10),
    nombres: yup.string().required(),
    apellidos: yup.string().required(),
    correo: yup.string().required().email(),
    telefono: yup.string().required(),
    usuario: yup.string().required(),
    contraseña_actual: yup.string().required(),
    contraseña_nueva: yup.string().required(),
  });

  const form = useForm({ resolver: yupResolver(schema) });

  const handleRefreshClick = (parent) => {
    form.setValue("cedula", parent.cedula);
    form.setValue("nombres", parent.nombres);
    form.setValue("apellidos", parent.apellidos);
    form.setValue("correo", parent.correo);
    form.setValue("telefono", parent.telefono);
    form.setValue("usuario", parent.usuario);
  };

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
            <h1 className="text-xl font-semibold tracking-tight">Actualizar acudientes</h1>
            <p className="text-muted-foreground">
              Aquí puedes ver a los profesores activos en tu institución, sus cursos, etc.
            </p>
          </div>
          <Separator className="my-5" />
          <div className="flex items-center py-4">
            <Input
              placeholder="Filtrar por cédula..."
              className="max-w-sm"
              value={filter}
              onChange={handleFilterChange}
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cédula</TableHead>
                  <TableHead>Nombres</TableHead>
                  <TableHead>Apellidos</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Correo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((parent) => (
                    <TableRow key={parent.cedula}>
                      <TableCell className="font-medium">{parent.cedula}</TableCell>
                      <TableCell>{parent.nombres}</TableCell>
                      <TableCell>{parent.apellidos}</TableCell>
                      <TableCell>{parent.telefono}</TableCell>
                      <TableCell>{parent.correo}</TableCell>
                      <TableCell>
                        <Sheet>
                          <SheetTrigger>
                            <RefreshCcwDot className="cursor-pointer" onClick={() => handleRefreshClick(parent)} />
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Actualizar acudiente</SheetTitle>
                              <SheetDescription>
                                Realiza cambios a tus acudientes, clickea "Actualizar y finalizar" cuando termines.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-5 py-4">
                              <Form {...form}>
                                <form
                                  className="space-y-4"
                                  onSubmit={form.handleSubmit((updatedParent) =>
                                    handleUpdateClick(updatedParent, parent)
                                  )}
                                >
                                  {/* FIXME: Hay errores en el css con respecto a los mensajes de validación yup. (opcional) */}
                                  {/* 👇 Espacio para el input de cedula */}
                                  <FormField
                                    control={form.control}
                                    name="cedula"
                                    render={({ field }) => (
                                      <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">Cédula</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Cedula" {...field} className="col-span-3" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* 👇 Espacio para el input de nombres  */}
                                  <FormField
                                    control={form.control}
                                    name="nombres"
                                    render={({ field }) => (
                                      <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">Nombres</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Jose" {...field} className="col-span-3" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* 👇 Espacio para el input de apellidos  */}
                                  <FormField
                                    control={form.control}
                                    name="apellidos"
                                    render={({ field }) => (
                                      <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">Apellidos</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Hernández Restrepo" {...field} className="col-span-3" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* 👇 Espacio para el input del correo */}
                                  <FormField
                                    control={form.control}
                                    name="correo"
                                    render={({ field }) => (
                                      <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">Email</FormLabel>
                                        <FormControl>
                                          <Input placeholder="example@example.com" {...field} className="col-span-3" />
                                        </FormControl>

                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* 👇 Espacio para el input del celular */}
                                  <FormField
                                    control={form.control}
                                    name="telefono"
                                    render={({ field }) => (
                                      <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">Teléfono</FormLabel>
                                        <FormControl>
                                          <Input placeholder="3000000000" {...field} className="col-span-3" />
                                        </FormControl>

                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* 👇 Espacio para el input del usuario */}
                                  <FormField
                                    control={form.control}
                                    name="usuario"
                                    render={({ field }) => (
                                      <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">Usuario</FormLabel>
                                        <FormControl>
                                          <Input placeholder="jesus_profesor" {...field} className="col-span-3" />
                                        </FormControl>

                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* 👇 Espacio para el input de la contraseña actual */}
                                  <FormField
                                    control={form.control}
                                    name="contraseña_actual"
                                    render={({ field }) => (
                                      <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">Contraseña actual</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="**************"
                                            type="password"
                                            {...field}
                                            className="col-span-3"
                                          />
                                        </FormControl>

                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* 👇 Espacio para el input de la contraseña nueva */}
                                  <FormField
                                    control={form.control}
                                    name="contraseña_nueva"
                                    render={({ field }) => (
                                      <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">Contraseña nueva</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="**************"
                                            type="password"
                                            {...field}
                                            className="col-span-3"
                                          />
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
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>No hay registros</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};
