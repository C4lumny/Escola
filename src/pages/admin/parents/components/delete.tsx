import { useState, ChangeEvent } from "react";
import { useRequest } from "@/hooks/useApiRequest";
// 👇 UI imports
import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/viewTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export const DeleteParent = () => {
  const { data, loading, mutate } = useGet("parents");
  const { apiRequest } = useRequest();
  const [filter, setFilter] = useState("");
  const [selectedParent, setSelectedParent] = useState<any>();
  let dataTable: string[] = [];
  let filteredData: string[] = [];

  if (!loading) {
    dataTable = data.data.map(
      (parent: any) =>
        ({
          deleteCheckbox: (
            <Checkbox
              checked={parent === selectedParent}
              className="w-4 h-4"
              onCheckedChange={() => handleCheckboxChange(parent)}
            />
          ),
          cedula: parent.cedula,
          nombres: parent.nombres,
          apellidos: parent.apellidos,
          telefono: parent.telefono,
          correo: parent.correo,
        } || [])
    );

    filteredData = dataTable.filter((parent: any) =>
      parent.nombres.includes(filter)
    );
  }

  const columnTitles = [
    "",
    "Cedula",
    "Nombres",
    "Apellidos",
    "Telefono",
    "Correo",
  ];

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.value);
  };

  const handleCheckboxChange = (parent: any) => {
    setSelectedParent(parent);
  };

  const handleDeleteClick = async () => {
    const response = await apiRequest(null, `parents/${selectedParent?.cedula}`, "delete");
    mutate();

    if (!response.error) {
      toast.success("Acudiente eliminado con exito");
    } else {
      toast.error("Error al eliminar el acudiente");
    }

  };

  //TODO: implementar un toaster (se encuentra en shadcn-ui) para mostrar un mensaje de exito o error al eliminar una region, y actualizar la tabla de regiones despues de eliminar una region

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
            <h1 className="text-xl font-semibold tracking-tight">
              Eliminar acudientes
            </h1>
            <p className="text-muted-foreground">
              Aquí puedes eliminar los acudientes.
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
          <div className="flex w-full justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={!selectedParent} variant="destructive">
                  Borrar acudiente
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás seguro de borrar el acudiente?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta accion no puede ser revertida. Esto borrará
                    permanentemente el acudiente y se removerá la información de
                    nuestros servidores
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteClick}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  );
};
