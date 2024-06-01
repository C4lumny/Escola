// UI ImportS 👇
import { UserAuthForm } from "@/components/app/user-auth-form";
import { ModeToggle } from "@/components/app/mode-toggle";
// Icons and images 👇
import EscolaLogo from "@/assets/escola-high-resolution-logo-white-transparent.png";
import BoysStudying from "@/assets/niños-estudiando-fotologin.jpg";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export const Login = () => {
  return (
    <>
      {/* Lado izquierdo de la pagina (imagen) 👇 */}
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute right-4 top-4 md:right-8 md:top-8 flex gap-2">
          <Dialog>
            <DialogTrigger>
              <Button size={"icon"} variant={"outline"}>
                <Info className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-screen h-[62%]">
              <DialogHeader>
                <DialogTitle>Información sobre el aplicativo</DialogTitle>
                <DialogDescription>
                  Escola es una plataforma de educación virtual que permite a los estudiantes y profesores interactuar
                  de manera remota.
                </DialogDescription>
                <Separator />
                <div className="py-5 flex flex-col gap-2">
                  <span className="text-2xl font-semibold leading-none tracking-tight">Manuales</span>
                  <ul className="list-disc list-inside">
                    <li className="text-lg hover:underline hover:cursor-pointer">
                      <a href="src\assets\manuales\Perfil Administrativo.pdf" download>
                        Manual de administrador
                      </a>
                    </li>
                    <li className="text-lg hover:underline hover:cursor-pointer">
                      <a href="src\assets\manuales\Perfil Estudiante.pdf" download>
                        Manual de profesor
                      </a>
                    </li>
                    <li className="text-lg hover:underline hover:cursor-pointer">
                      <a href="src\assets\manuales\Perfil Profesor.pdf" download>
                        Manual de estudiante
                      </a>
                    </li>
                  </ul>
                </div>
                <Separator className="" />
                <div className="flex justify-center">
                  <span className="text-xl font-semibold">Equipo de desarrolladores</span>
                </div>
                <div className="pt-5 grid grid-cols-3 place-items-center">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="size-20">
                      <AvatarImage src="/src/assets/profile-pictures/pfp-nathan.jpg" alt="nathan" />
                      <AvatarFallback>Nathan Ospino</AvatarFallback>
                    </Avatar>
                    <span className="text-inherit text-xs">FrontEnd Developer</span>
                    <span className="font-semibold">Nathan Ospino</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="size-20">
                      <AvatarImage src="/src/assets/profile-pictures/pfp-jesus.jpg" alt="nathan" />
                      <AvatarFallback>Jesus Sanchez</AvatarFallback>
                    </Avatar>
                    <span className="text-inherit text-xs">Backend Developer</span>
                    <span className="font-semibold">Jesus Sanchez</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 ">
                    <Avatar className="size-20">
                      <AvatarImage src="/src/assets/profile-pictures/pfp-jose.jpg" alt="nathan" />
                      <AvatarFallback>Jose Restrepo</AvatarFallback>
                    </Avatar>
                    <span className="text-inherit text-xs">FullStack Developer</span>
                    <span className="font-semibold">Jose Restrepo</span>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <ModeToggle />
        </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div
            className="absolute inset-0 bg-zinc-900 brightness-50"
            style={{ backgroundImage: `url(${BoysStudying})`, backgroundSize: "cover" }}
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img src={EscolaLogo} alt="" className="w-26 h-16" />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;La educación no es preparación para la vida; la educación es la vida en sí misma.&rdquo;
              </p>
              <footer className="text-sm">John Dewey</footer>
            </blockquote>
          </div>
        </div>
        {/* Parte derecha de la pagina (Inicio de sesion) 👇 */}
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Iniciar sesión</h1>
              <p className="text-sm text-muted-foreground">Ingresa tu usuario y contraseña</p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
};
