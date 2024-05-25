// UI ImportS 👇
import { UserAuthForm } from "@/components/app/user-auth-form";
import { ModeToggle } from "@/components/app/mode-toggle";
// Icons and images 👇
import EscolaLogo from "@/assets/escola-high-resolution-logo-white-transparent.png";
import BoysStudying from "@/assets/niños-estudiando-fotologin.jpg";

export const Login = () => {
  return (
    <>
      {/* Lado izquierdo de la pagina (imagen) 👇 */}
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute right-4 top-4 md:right-8 md:top-8">
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
