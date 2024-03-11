import { useGet } from "@/hooks/useGet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRequest } from "@/hooks/useRequest";
// 👇 UI imports
import { Separator } from "../../ui/separator";
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

export const CreateStudents = () => {
  const { apiRequest } = useRequest();
  const parentsData = useGet("parents");
  const coursesData = useGet("courses");

  const onSubmit = async (data) => {
    console.log(data);
    // Enviando los datos al servidor
    const { apiData } = await apiRequest(data, "students", "POST");
    console.log(apiData);
  };

  const schema = yup.object({
    document_type: yup.string().required(),
    nro_documento: yup
      .string()
      .required("Ingrese un numero de documento")
      .min(1)
      .max(10)
      .test(
        "onlyDigits", //
        "Ingresa solo numeros por favor.",
        (value) => /^\d+$/.test(value)
      ),
    nombres: yup.string().required("Ingrese nombres").min(2).max(50),
    apellidos: yup.string().required("Ingrese apellidos").min(2).max(50),
    usuario: yup.string().min(5).max(100).required(),
    contraseña: yup.string().required().min(5).max(100),
    associated_parent: yup.string().required(),
    associated_course: yup.string().required(),
  });

  const form = useForm({ resolver: yupResolver(schema) });

  return (
    <>
      {coursesData.loading ? (
        <div>cargando...</div>
      ) : (
        <>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Crear acudientes</h1>
            <p className="text-muted-foreground">
              Aqui puedes ingresar / crear a los profesores que desees para tu institución.
            </p>
          </div>
          <Separator className="mt-8" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* 👇 Espacio para el select de tipo de documento */}
              <FormField
                control={form.control}
                name="document_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de documento</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Seleccione un tipo..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipo de documento</SelectLabel>
                          <SelectItem value="1">Cédula de ciudadania</SelectItem>
                          <SelectItem value="2">Pasaporte</SelectItem>
                          <SelectItem value="3">Tarjeta de identidad</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>Seleccione el nombre del curso que se ha asignado a esta materia</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 👇 Espacio para el input de nro_documento  */}
              <FormField
                control={form.control}
                name="nro_documento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numero de documento</FormLabel>
                    <FormControl>
                      <Input placeholder="10XXXXXXXX" {...field} />
                    </FormControl>
                    <FormDescription>El numero de documento del estudiante a ingresar.</FormDescription>
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
                    <FormDescription>Nombres del acudiente. Ej: Jesús Carlos</FormDescription>
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
                    <FormDescription>Apellidos del acudiente. Ej: Ospino Hernández</FormDescription>
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
                    <FormDescription>Usuario del estudiante, importante para el inicio de sesión</FormDescription>
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
                    <FormDescription>Contraseña del acudiente, importante para el inicio de sesión</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 👇 Espacio para el select del curso */}
              <FormField
                control={form.control}
                name="associated_course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Curso asignado al estudiante</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Seleccione un curso" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Cursos</SelectLabel>
                          {coursesData.data.data.length > 0 ? (
                            coursesData.data.data.map((course) => {
                              return (
                                <SelectItem key={course.id} value={course.id}>
                                  {course.id}
                                </SelectItem>
                              );
                            })
                          ) : (
                            <div>No hay cursos activos</div>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>Seleccione el nombre del curso que se ha asignado a esta materia</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 👇 Espacio para el select del acudiente */}
              <FormField
                control={form.control}
                name="associated_parent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Acudiente asignado al estudiante</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Seleccione un acudiente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Acudientes</SelectLabel>
                          {parentsData.data.data.length > 0 ? (
                            parentsData.data.data.map((parent) => {
                              return (
                                <SelectItem key={parent.cedula} value={parent.cedula}>
                                  {parent.cedula} - {parent.nombres} {parent.apellidos}
                                </SelectItem>
                              );
                            })
                          ) : (
                            <div>No hay acudientes activos</div>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>Seleccione el nombre del curso que se ha asignado a esta materia</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </>
      )}
    </>
  );
};
