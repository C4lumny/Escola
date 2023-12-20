import { useState } from "react";
import niñosEstudiando from "../assets/niños-estudiando-fotologin.jpg";
import lightBgLogin from "../assets/login-background.svg";

export const Login = () => {
  const [isInputFocused, setIsInputFocused] = useState({
    password: false,
    username: false,
  });

  const [inputHasValue, setInputHasValue] = useState({
    password: false,
    username: false,
  });

  const handleInputChange = (inputName, value) => {
    setInputHasValue({ ...inputHasValue, [inputName]: value !== "" });
  };

  const handleFocus = (inputName) => {
    setIsInputFocused({ ...isInputFocused, [inputName]: true });
  };

  const handleBlur = (inputName) => {
    setIsInputFocused({ ...isInputFocused, [inputName]: false });
  };

  return (
    <div className="flex items-center justify-center h-screen relative bg-zinc-100">
      {/* general bg */}
      <img src={lightBgLogin} alt="" className="absolute h-full w-full z-0" draggable="false"/>
      {/* login form */}
      <div className="grid grid-cols-[1fr,1.5fr] h-3/4 w-[75%] bg-white shadow-inherit z-10 rounded-3xl overflow-hidden">
        <div className="col-span-1">
          <div className="my-20 mx-20">
            <p className="text-3xl font-montserrat">
              <span className="text-zinc-400 font-medium">Somos</span> <span className="font-bold text-red-500">escola</span>
            </p>
            <div className="text-zinc-400 font-poppins font-light">
              <p className="mt-4 text-base">
                Bienvenido de vuelta,
                <br /> Por favor ingresa a tu cuenta
              </p>
              {/* user and password form */}
              <div className="mt-16 ">
                {/* Input username */}
                <div className="relative">
                  <input
                    type="text"
                    className={`border text-black font-bold border-zinc-300 w-full h-16 focus:outline-none px-5 duration-100 ease-in-out ${
                      isInputFocused.username ? "border-l-2 border-l-red-400" : ""
                    }`}
                    id="usuario"
                    onFocus={() => handleFocus('username')}
                    onBlur={() => handleBlur('username')}
                    onChange={(e) => {
                      handleInputChange("username", e.target.value);
                    }}
                  />
                  <label
                    htmlFor="usuario"
                    className={`absolute left-5 top-5 text-[#aaa] text-lg- ease-in-out duration-200 select-none  ${
                      isInputFocused.username || inputHasValue.username ? "top-[0.2rem] text-[#555] text-xs" : "top-4 text-[#aaa]"
                    }`}
                  >
                    Usuario
                  </label>
                </div>
                  {/* Input password */}
                <div className="relative">
                  <input
                    type="password"
                    className={`border text-black font-bold border-zinc-300 w-full h-16 focus:outline-none px-5 duration-100 ease-in-out ${
                      isInputFocused.password ? "border-l-2 border-l-red-400" : ""
                    }`}
                    id="password"
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    onChange={(e) => {
                      handleInputChange("password", e.target.value);
                    }}
                  />
                  <label
                    htmlFor="password"
                    className={`absolute left-5 top-5 text-[#aaa] text-lg- ease-in-out duration-200 select-none  ${
                      isInputFocused.password || inputHasValue.password ? "top-[0.2rem] text-[#555] text-xs" : "top-4 text-[#aaa]"
                    }`}
                  >
                    Contraseña
                  </label>
                </div>
              </div>
              {/* log-in button */}
              <div className="mt-10">
                <button className="px-7 py-3 bg-black rounded-md font-bold">
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* down here is the right bg */}
        <div className="col-span-1 w-full h-full">
          <img src={niñosEstudiando} alt="" className="w-full h-full object-cover" draggable="false"/>
        </div>
      </div>
    </div>
  );
};
