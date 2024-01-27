import { Separator } from "@/components/ui/separator";
import { useGet } from "@/hooks/useGet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ViewTeachers = () => {
  const { data, loading } = useGet("teachers");
  console.log(data);

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
        <div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Visualizar profesores</h1>
            <p className="text-muted-foreground">
              Aqui puedes ver a los profesores activos en tu institución, sus cursos, etc.
            </p>
          </div>
          <Separator className="mt-5" />
          <Table>
            <TableCaption>Una lista de tus profesores activos</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Cédula</TableHead>
                <TableHead>Nombres</TableHead>
                <TableHead>Apellidos</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Teléfono</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((teacher) => (
                <TableRow key={teacher.cedula}>
                  <TableCell className="font-medium">{teacher.cedula}</TableCell>
                  <TableCell>{teacher.nombres}</TableCell>
                  <TableCell>{teacher.apellidos}</TableCell>
                  <TableCell>{teacher.telefono}</TableCell>
                  <TableCell>{teacher.correo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
