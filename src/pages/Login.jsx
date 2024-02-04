// 👇 dev imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../hooks/useRequest";
import { useUserContext } from "../contexts/UserProvider";
// 👇 Pages or assets
import niñosEstudiando from "../assets/niños-estudiando-fotologin.jpg";
import lightBgLogin from "../assets/login-background.svg";

export const Login = () => {
  const { createUser } = useUserContext()
  const navigate = useNavigate();
  const { apiRequest } = useRequest();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // 👇 Me permite saber lo que tengan los inputs de username y password para usarlos luego
  const [inputFilled, setInputFilled] = useState({
    password: "",
    username: "",
  });

  // 👇 Me permite saber si el input tiene la "atencion" del usuario en ese momento, lo uso para efectos hover y asi
  const [isInputFocused, setIsInputFocused] = useState({
    password: false,
    username: false,
  });

  // Me permite saber si los inputs tienen valores, lo uso para realizar validaciones del formulario
  const [inputHasValue, setInputHasValue] = useState({
    password: false,
    username: false,
  });

  // 👇 Aqui empiezan los manejadores, me permiten gestionar ciertos eventos
  const handleInputHasValue = (inputName, value) => {
    setInputHasValue({ ...inputHasValue, [inputName]: value !== "" });
  };

  const handleFocus = (inputName) => {
    setIsInputFocused({ ...isInputFocused, [inputName]: true });
  };

  const handleBlur = (inputName) => {
    setIsInputFocused({ ...isInputFocused, [inputName]: false });
  };

  const handleInputChange = (event) => {
    setInputFilled({
      ...inputFilled,
      [event.target.id]: event.target.value,
    });
  };

  //   la función mas importante de esta pagina, me permite saber si los inputs estan llenos o no, permitiendome
  //👇 Seguir con el login
  const handleButtonClick = () => {
    setButtonClicked(true);

    if (Object.values(inputHasValue).every((value) => value === true)) {
      setAllFieldsFilled(true);
      loginHandler();
    } else {
      setAllFieldsFilled(false);
    }
  };

  // 👇 Esta funcion maneja el login
  const loginHandler = async () => {
    const userQuery = {
      username: inputFilled.username,
      password: inputFilled.password,
    };
    const { apiData } = await apiRequest(userQuery, "login", "POST");

    // Si la respuesta de la api no fue exitosa,entonces hay un error en el login
    if (apiData.statusCode !== 200) {
      setLoginError(true);
    } else {
      // Guardar los datos del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(apiData.data));
      createUser(apiData.data);

      // Dependiendo del tipo de usuario, te lleva a una ruta u otra
      switch (apiData.data.tipo_usuario) {
        case "Administrador":
          navigate("/panel/administrador");
      }
    }
  };

  // Al cargar la aplicación
  useEffect(() => {
    // Verificar si los datos del usuario existen en localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      // Si los datos del usuario existen, mantener la sesión del usuario
      createUser(user);
    }else{
      return;
    }
  }, []);

  // 👇 Dependiendo de si los inputs de username y password tengan valores, pondrá como true que todos los inputs tienen valores
  useEffect(() => {
    Object.values(inputHasValue).every((value) => value === true) && setAllFieldsFilled(true);
  }, [inputHasValue.username, inputHasValue.password]);

  // 👇 Renderizado de la pagina
  return (
    <div className="flex items-center justify-center h-screen relative bg-zinc-100">
      {/* Imagen de fondo general */}
      <img src={lightBgLogin} alt="" className="absolute h-full w-full z-0" draggable="false" />
      {/* 👇 Formulario login empieza aqui */}
      <div className="grid grid-cols-[1fr,1.5fr] h-3/4 w-[75%] bg-white shadow-inherit z-10 rounded-3xl overflow-hidden">
        <div className="col-span-1 flex items-center">
          <div className="mx-20 w-full">
            <p className="text-3xl font-montserrat">
              <span className="text-zinc-500 font-medium">Somos</span>{" "}
              <span className="font-bold text-red-500">escola</span>
            </p>
            <div className="text-zinc-500 font-poppins font-light">
              <p className="mt-4 text-base">
                Bienvenido de vuelta,
                <br /> Por favor ingresa a tu cuenta
              </p>
              {/* 👇 Inputs del username y password empieza aqui */}
              <div className="mt-16 ">
                {/* Input username 👇 */}
                <div className="relative">
                  <input
                    type="text"
                    className={`border text-black font-bold border-zinc-300 w-full h-16 focus:outline-none px-5 duration-100 ease-in-out ${
                      isInputFocused.username ? "border-l-2 border-l-red-400" : ""
                    }`}
                    id="username"
                    onFocus={() => handleFocus("username")}
                    onBlur={() => handleBlur("username")}
                    onChange={(e) => {
                      handleInputHasValue("username", e.target.value);
                      handleInputChange(e);
                    }}
                  />
                  <label
                    htmlFor="username"
                    className={`absolute left-5 top-5 text-[#aaa] text-lg- ease-in-out duration-200 select-none  ${
                      isInputFocused.username || inputHasValue.username
                        ? "top-[0.2rem] text-[#555] text-xs"
                        : "top-4 text-[#aaa]"
                    }`}
                  >
                    Usuario
                  </label>
                </div>
                {/* 👆 Input username termina aqui */}
                {/* -------------------------------------------------------------------------------- */}
                {/* Input password empieza aqui 👇*/}
                <div className="relative">
                  <input
                    type="password"
                    className={`border text-black font-bold border-zinc-300 w-full h-16 focus:outline-none px-5 duration-100 ease-in-out ${
                      isInputFocused.password ? "border-l-2 border-l-red-400" : ""
                    }`}
                    id="password"
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                    onChange={(e) => {
                      handleInputHasValue("password", e.target.value);
                      handleInputChange(e);
                    }}
                  />
                  <label
                    htmlFor="password"
                    className={`absolute left-5 top-5 text-[#aaa] text-lg- ease-in-out duration-200 select-none  ${
                      isInputFocused.password || inputHasValue.password
                        ? "top-[0.2rem] text-[#555] text-xs"
                        : "top-4 text-[#aaa]"
                    }`}
                  >
                    Contraseña
                  </label>
                </div>
                {/* 👆 Input password termina aqui */}
                {/* ---------------------------------------------------------------- */}
                {/* Texto que me permite conocer si tengo error en clave o usuario 👇*/}
                <div className={`text-red-600 mt-3${!loginError ? " hidden" : ""}`}>usuario o contraseña incorrectos</div>
              </div>
              {/* log-in button empieza aqui 👇 */}
              <div className="mt-10">
                <button
                  className={`px-7 py-3 rounded-md font-bold text-white bg-black`}
                  disabled={!allFieldsFilled}
                  onClick={() => {
                    handleButtonClick();
                  }}
                >
                  Iniciar sesión
                </button>
                {!allFieldsFilled && buttonClicked && (
                  <p className="mt-2 text-red-500">Por favor, llena todos los campos.</p>
                )}
              </div>
              {/* log-in button termina aqui 👆 */}
            </div>
          </div>
        </div>
        {/* 👇 Imagen del lado izquierdo */}
        <div className="col-span-1 w-full h-full">
          <img src={niñosEstudiando} alt="" className="w-full h-full object-cover" draggable="false" />
        </div>
      </div>
      {/* 👆 Formulario login termina aqui */}
    </div>
  );
};
