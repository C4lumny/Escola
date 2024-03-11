import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const SubjectCard = ({ subject, image }) => {
  return (
    <Card className={cn("w-[380px hover:underline hover:cursor-pointer")}>
      <CardHeader>
        <CardTitle>{subject.nombre}</CardTitle>
        <CardDescription>{subject.descripcion}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 rounded-md border h-32 w-full overflow-hidden">
          <div className="flex-1 space-y-1">
            <img src={image} alt="" className="w-full h-full object-cover overflow-hidden hover:scale-110 ease-in-out duration-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
