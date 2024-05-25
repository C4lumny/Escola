import { Separator } from "@radix-ui/react-dropdown-menu";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useGet } from "@/hooks/useGet";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRequest } from "@/hooks/useApiRequest";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeftCircle } from "lucide-react";

const formSchema = z.object({
  nota: z
    .string({ required_error: "Por favor ingrese una nota." })
    .regex(/^\d+(\.\d+)?$/, "Nota debe ser un número o un número decimal"),
});

export const ActivityStudents = () => {
  const { activity_id } = useParams();
  const { data: activitiesData } = useGet(`activities/${activity_id}`);
  const { apiRequest } = useRequest();
  const [studentsData, setStudentsData] = useState<any>(null);
  const [subjectsData, setSubjectsData] = useState<any>(null);
  const [developmentData, setDevelopmentData] = useState<any>(null);
  const [studentId, setStudentId] = useState<any>(null);
  const [developmentId, setDevelopmentId] = useState<any>(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nota: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      id_actividad: developmentId,
      id_estudiante: studentId,
      nota: parseFloat(values.nota),
    };
    const response = await apiRequest(data, "developments", "patch");
    if (!response.error) {
      toast.success("Nota agregada con exito");
      form.reset();
      setStudentId(null);
    } else {
      toast.error("Error al agregar la nota", {});
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiRequest(null, `developments/activity/${activity_id}`, "get");
      console.log(response.apiData);
      setDevelopmentData(response.apiData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (activitiesData) {
        const response = await apiRequest(null, `subjects/${activitiesData.data[0].id_asignatura}`, "get");
        setSubjectsData(response.apiData);
      }
    };

    fetchData();
  }, [activitiesData]);

  useEffect(() => {
    const fetchData = async () => {
      if (subjectsData) {
        const response = await apiRequest(null, `students/courses/${subjectsData.data[0].id_curso}`, "get");
        setStudentsData(response);
      }
    };

    fetchData();
  }, [subjectsData]);
  return (
    <>
      {!activitiesData || !studentsData || !subjectsData || !developmentData ? (
        <div>Cargando...</div>
      ) : (
        <div className="col-span-3">
          <ArrowLeftCircle className="cursor-pointer size-10" onClick={() => navigate(-2)} />
          <br />
          {/* Mensaje de bienvenida */}
          <span className="bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text font-bold text-5xl">
            Actividad{" "}
            <span className="text-5xl font-bold text-black dark:text-white"> {activitiesData.data[0].titulo},</span>
            <br />{" "}
            <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Lista de estudiantes
            </span>
          </span>
          <Separator className="mt-5 " />
          {/* 👇 Sección de las materias / asignaturas */}
          <div className="flex mt-12 gap-x-10 gap-y-14 flex-wrap">
            <Table>
              <TableCaption>Lista de estudiantes que realizan esta actividad.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Nro de identificacion</TableHead>
                  <TableHead>Apellidos</TableHead>
                  <TableHead>Nombres</TableHead>
                  <TableHead>Solucion</TableHead>
                  <TableHead className="text-right">Calificacion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentsData.apiData.map((student: any) => {
                  // Buscar el desarrollo correspondiente para este estudiante
                  const development = developmentData.data.find(
                    (dev: any) => dev.id_estudiante === student.identificacion
                  );

                  return (
                    <TableRow key={student.identificacion}>
                      <TableCell className="font-medium">{student.identificacion}</TableCell>
                      <TableCell>{student.apellidos}</TableCell>
                      <TableCell>{student.nombres}</TableCell>
                      <TableCell>{development ? development.solucion : "Sin solucion"}</TableCell>
                      <Dialog>
                        <DialogTrigger>
                          <TableCell
                            onClick={() => {
                              setStudentId(student.identificacion);
                              setDevelopmentId(development.id);
                            }}
                            className="text-right cursor-pointer hover:underline"
                          >
                            {development ? development.nota : "Sin calificar"}
                          </TableCell>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="mb-5">Agrega una nota a esta solución</DialogTitle>
                            <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                  control={form.control}
                                  name="nota"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Nota del estudiante</FormLabel>
                                      <FormControl>
                                        <Input placeholder="4.2" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button type="submit">Agregar nota</Button>
                              </form>
                            </Form>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};
