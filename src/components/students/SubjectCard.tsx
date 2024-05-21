import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const SubjectCard = ({ subject }: { subject: any }) => {
  return (
    <Link to={`/estudiantes/materia/${subject.nombre}`}>
      <a>
        <Card className={cn("w-[380px hover:underline hover:cursor-pointer")}>
          <CardHeader>
            <CardTitle>{subject.nombre}</CardTitle>
            <CardDescription>{subject.descripcion}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 rounded-md border h-32 w-full overflow-hidden">
              <div className="flex-1 space-y-1 w-[20rem] h-full bg-blue-400"></div>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};