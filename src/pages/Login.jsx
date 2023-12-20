import niñosEstudiando from "../assets/niños-estudiando-fotologin.jpg";
import lightBgLogin from "../assets/login-background.svg";

export const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen relative bg-zinc-100">
      <img src={lightBgLogin} alt="" className="absolute h-full w-full z-0" />
      <div className="grid grid-cols-2 h-3/4 w-[75%] bg-white shadow-inherit z-10">
        <div className="col-span-1">
          <div className="my-20 mx-20">
            <p className="text-4xl font-montserrat font-normal">
              <span className="text-zinc-400 ">Somos</span> escola
            </p>
          </div>
        </div>
        <div className="col-span-1 w-full h-full">
          <img src={niñosEstudiando} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};
