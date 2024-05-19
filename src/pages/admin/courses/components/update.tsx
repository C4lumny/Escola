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
import { toast } from "sonner";

export const UpdateCourses = () => {
  const { data, loading, mutate } = useGet("courses");
  const { apiRequest } = useRequest();
  const [filter, setFilter] = useState("");
  const columnTitles = ["ID", "Acciones"];
  let dataTable: string[] = [];
  let filteredData: string[] = [];

  const formSchema = z.object({
    id: z
      .string()
      .min(1, {
        message: "Curso debe contener al menos 1 caracter",
      })
      .max(5, { message: "Curso debe contener máximo 5 caracteres" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
    },
  });

  const handleFilterChange = (event: any) => {
    setFilter(event.target.value);
  };

  const handleUpdateClick = async (updatedCourse: any, course: any) => {
    const data = { updatedCourse, course };
    console.log("hola");
    const response = await apiRequest(data, "courses", "put");
    if (!response.error) {
      toast.success("Curso actualizado con exito");
    } else {
      toast.error("Error al actualizar el curso");
    }
    mutate();
  };

  const handleRefreshClick = (course: any) => {
    form.setValue("id", course.id);
  };

  if (!loading) {
    dataTable = data.data.map(
      (course: any) =>
        ({
          id: course.id,
          sheet: (
            <Sheet>
              <SheetTrigger>
                <RefreshCcwDot className="cursor-pointer" onClick={() => handleRefreshClick(course)} />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Actualizar curso</SheetTitle>
                </SheetHeader>
                <div className="grid gap-5 py-4">
                  <Form {...form}>
                    <form
                      className="space-y-4"
                      onSubmit={form.handleSubmit((updatedCourse) => handleUpdateClick(updatedCourse, course))}
                    >
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
                      <SheetFooter>
                        <SheetClose>
                          //TODO: replicar el toast en el resto de los modales
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

    filteredData = dataTable.filter((course: any) => course.id.includes(filter));
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
            <h1 className="text-xl font-semibold tracking-tight">Actualizar cursos</h1>
            <p className="text-muted-foreground">Aquí puedes actualizar los cursos.</p>
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
