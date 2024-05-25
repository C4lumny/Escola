import { useGet } from "@/hooks/useGet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useRequest } from "@/hooks/useApiRequest";
import { useUserContext } from "@/contexts/userProvider";
import { useEffect, useState } from "react";
import { ArrowLeftCircle } from "lucide-react";

const FormSchema = z.object({
  response: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

export const ActivitySolved = () => {
  const { activity } = useParams();
  const { apiRequest } = useRequest();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data: activitiesData, loading: activitiesLoading } = useGet(`activities/${activity}`);
  const { data: developmentData, loading: developmentLoading, mutate } = useGet(`developments/activity/${activity}`);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { response: "" },
  });

  if (!(developmentLoading && activitiesLoading)) console.log(developmentData, activitiesData);

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const development = {
      id_actividad: activitiesData.data[0].id,
      id_estudiante: user.identificacion,
      respuesta: formData.response,
      ...(isEditing && { solucion_id: developmentData.data[0].id }),
    };

    const method = isEditing ? "put" : "post";
    const { apiData } = await apiRequest(development, `developments`, method);

    if (apiData.statusCode == 200) {
      toast.success(`Entrega realizada con exito: ${formData.response}`);
      form.reset();
      setIsEditing(false);
      mutate();
    } else {
      toast.error(`Error al realizar la entrega: ${apiData.message}`);
    }
  }

  useEffect(() => {
    if (developmentData && developmentData.data.length > 0) {
      form.setValue("response", developmentData.data[0].solucion);
    }
    console.log("Hola mundo");
  }, [developmentData]);

  return (
    <div className="col-span-3">
      {activitiesLoading || developmentLoading ? (
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="w-full grid-cols-3">
          <ArrowLeftCircle className="cursor-pointer size-10" onClick={() => navigate(-1)} />
          <br />
          {/* Mensaje de bienvenida */}
          <span className="font-bold text-4xl">
            {activitiesData.data[0].titulo}
            <br />{" "}
            <span className="text-2xl text-black dark:text-white font-light">{activitiesData.data[0].descripcion}</span>
            <br />{" "}
            <span className="text-xl font-light text-muted-foreground">
              Desde {new Date(activitiesData.data[0].fecha_inicio).toLocaleDateString()} hasta{" "}
              {new Date(activitiesData.data[0].fecha_fin).toLocaleDateString()}
            </span>
          </span>
          <div className="mt-3">
            Calificación:{" "}
            <span className="text-muted-foreground">{activitiesData.data[0].observacion ? activitiesData.data[0].observacion : "Sin calificar"}</span>
          </div>
          <Separator className="mt-5 " />
          {developmentData.data.length > 0 ? (
            <div className="flex flex-col gap-2">
              <span className="text-2xl">Usted ya ha realizado una entrega de esta actividad</span>
              <span className="text-xl text-muted-foreground">Su respuesta:</span>
              <div className="py-5">
                {/* <span className="text-lg">{developmentData.data[0].solucion}</span> */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                      control={form.control}
                      name="response"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Aqui puedes adjuntar links drive u otros, que indiquen la respuesta o solución de esta actividad."
                              className="resize-none"
                              {...field}
                              disabled={!isEditing}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className={isEditing ? "" : "hidden"} type="submit">
                      Realizar entrega
                    </Button>
                  </form>
                </Form>
                <Button className={`mt-5 ${isEditing ? "hidden" : ""}`} onClick={() => setIsEditing(true)}>
                  Editar entrega
                </Button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="response"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-2xl">Agrega aqui tu solución</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Aqui puedes adjuntar links drive u otros, que indiquen la respuesta o solución de esta actividad."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Agregar entrega</Button>
              </form>
            </Form>
          )}
        </div>
      )}
    </div>
  );
};
