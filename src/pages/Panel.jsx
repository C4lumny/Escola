import { useState } from "react";
import { Teachers } from "./administrators/teachers";
import { Courses } from "./administrators/Courses";
import { Subjects } from "./administrators/Subjects"
import { AsideOption } from "../components/AsideOption";
// Recursos 👇
import default_user from "../assets/default_user.webp";

export const Panel = () => {
  const [active, setActive] = useState({
    inicio: false,
    asignaturas: false,
    cursos: false,
    profesores: false,
    estudiantes: false,
    acudientes: false,
  });

  const handleClick = (id) => {
    setActive({
      inicio: id === "inicio",
      asignaturas: id === "asignaturas",
      cursos: id === "cursos",
      profesores: id === "profesores",
      estudiantes: id === "estudiantes",
      acudientes: id === "acudientes",
    });
  };

  return (
    // 👇 Div principal del dashboard, abarca toda la pagina
    <div className="w-screen flex bg-zinc-100 font-poppins">
      {/* 👇 Barra lateral o menu lateral */}
      <aside className={`h-full fixed left-0 bg-white transition-all duration-300 w-72`}>
        <>
          {/* 👇 Nombre, foto de perfil y rol */}
          <div className="h-52 my-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-red-600">Escola</h1>
            <div className="h-24 rounded-full my-3 overflow-hidden mt-10">
              <img src={default_user} alt="icono" className="w-full h-full object-cover " draggable="false" />
            </div>
          </div>
          {/* ☝️ Aqui termina Nombre y pfp */}
          {/* 👇 Aqui empieza la lista de utilidades de la pagina */}
          <div>
            <ul className="w-full space-y-8 text-lg font-semibold text-zinc-400">
              {/* 👇 OPCION DE INICIO */}
              <AsideOption id="inicio" active={active.inicio} handleClick={handleClick} titulo="INICIO">
                {/* 👇 SVG de Home */}
                <svg viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      stroke={`${active.inicio ? "#27272a" : "#a1a1aa"}`}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.9600000000000002"
                      d="M6 10v9a1 1 0 001 1h10a1 1 0 001-1v-9M6 10l6-6 6 6M6 10l-2 2m14-2l2 2m-10 1h4v4h-4v-4z"
                    ></path>{" "}
                  </g>
                </svg>
              </AsideOption>
              {/* 👇 OPCION DE MATERIAS */}
              <AsideOption id="asignaturas" active={active.asignaturas} handleClick={handleClick} titulo="ASIGNATURAS">
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21"
                    stroke={`${active.asignaturas ? "#27272a" : "#a1a1aa"}`}
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </AsideOption>
              {/* 👇 OPCION DE CURSOS */}
              <AsideOption id="cursos" active={active.cursos} handleClick={handleClick} titulo="CURSOS">
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20 1C21.6569 1 23 2.34315 23 4V14C23 15.6569 21.6569 17 20 17H13.562L18.6402 21.2318C19.0645 21.5853 19.1218 22.2159 18.7682 22.6402C18.4147 23.0645 17.7841 23.1218 17.3598 22.7682L13 19.135V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V19.135L6.64018 22.7682C6.21591 23.1218 5.58534 23.0645 5.23178 22.6402C4.87821 22.2159 4.93554 21.5853 5.35982 21.2318L10.438 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14V4C3 3.44772 3.44772 3 4 3H20Z"
                    stroke={`${active.cursos ? "#27272a" : "#a1a1aa"}`}
                  />
                </svg>
              </AsideOption>
              {/* 👇 OPCION DE PROFESORES */}
              <AsideOption id="profesores" active={active.profesores} handleClick={handleClick} titulo={"PROFESORES"}>
                {/* 👇 SVG de profesores */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M3 12C3 15.7712 3 19.6569 4.31802 20.8284C5.63604 22 7.75736 22 12 22C16.2426 22 18.364 22 19.682 20.8284C21 19.6569 21 15.7712 21 12"
                      stroke="#a1a1aa"
                      strokeWidth="1.0"
                    ></path>{" "}
                    <path
                      d="M14.6603 14.2019L20.8579 12.3426C21.2688 12.2194 21.4743 12.1577 21.6264 12.0355C21.7592 11.9288 21.8626 11.7898 21.9266 11.6319C22 11.4511 22 11.2366 22 10.8077C22 9.12027 22 8.27658 21.6703 7.63268C21.3834 7.07242 20.9276 6.61659 20.3673 6.32971C19.7234 6 18.8797 6 17.1923 6H6.80765C5.12027 6 4.27658 6 3.63268 6.32971C3.07242 6.61659 2.61659 7.07242 2.32971 7.63268C2 8.27658 2 9.12027 2 10.8077C2 11.2366 2 11.4511 2.07336 11.6319C2.13743 11.7898 2.24079 11.9288 2.37363 12.0355C2.52574 12.1577 2.73118 12.2194 3.14206 12.3426L9.33968 14.2019"
                      stroke="#a1a1aa"
                      strokeWidth="1.0"
                    ></path>{" "}
                    <path
                      d="M14 12.5H10C9.72386 12.5 9.5 12.7239 9.5 13V15.1615C9.5 15.3659 9.62448 15.5498 9.8143 15.6257L10.5144 15.9058C11.4681 16.2872 12.5319 16.2872 13.4856 15.9058L14.1857 15.6257C14.3755 15.5498 14.5 15.3659 14.5 15.1615V13C14.5 12.7239 14.2761 12.5 14 12.5Z"
                      stroke="#a1a1aa"
                      strokeWidth="1.0"
                      strokeLinecap="round"
                    ></path>{" "}
                    <path
                      d="M9.1709 4C9.58273 2.83481 10.694 2 12.0002 2C13.3064 2 14.4177 2.83481 14.8295 4"
                      stroke="#a1a1aa"
                      strokeWidth="1.0"
                      strokeLinecap="round"
                    ></path>{" "}
                  </g>
                </svg>
              </AsideOption>
              {/* 👇 OPCION DE ESTUDIANTES */}
              <AsideOption
                id="estudiantes"
                active={active.estudiantes}
                handleClick={handleClick}
                titulo={"ESTUDIANTES"}
              >
                {/* 👇 SVG de estudiantes */}
                <svg
                  width="32"
                  height="32"
                  fill="#a1a1aa"
                  viewBox="0 0 256 256"
                  id="Flat"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#a1a1aa"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path d="M225.26514,60.20508l-96-32a4.00487,4.00487,0,0,0-2.53028,0l-96,32c-.05713.019-.10815.04809-.16406.06958-.08545.033-.16821.06811-.251.10644a4.04126,4.04126,0,0,0-.415.22535c-.06714.04174-.13575.08007-.20044.12548a3.99,3.99,0,0,0-.47632.39307c-.02027.01953-.0437.0354-.06348.05542a3.97787,3.97787,0,0,0-.44556.53979c-.04077.0586-.07373.12183-.11132.18262a3.99741,3.99741,0,0,0-.23487.43262c-.03613.07837-.06811.15771-.09912.23852a3.96217,3.96217,0,0,0-.144.46412c-.01929.07714-.04126.15234-.05591.2312A3.98077,3.98077,0,0,0,28,64v80a4,4,0,0,0,8,0V69.55005l43.87524,14.625A59.981,59.981,0,0,0,104.272,175.09814a91.80574,91.80574,0,0,0-53.39062,38.71631,3.99985,3.99985,0,1,0,6.70117,4.36914,84.02266,84.02266,0,0,1,140.83447,0,3.99985,3.99985,0,1,0,6.70117-4.36914A91.80619,91.80619,0,0,0,151.728,175.09814a59.981,59.981,0,0,0,24.39673-90.92309l49.14038-16.38013a4.00037,4.00037,0,0,0,0-7.58984ZM180,120A52,52,0,1,1,87.92993,86.85986l38.80493,12.93506a4.00487,4.00487,0,0,0,2.53028,0l38.80493-12.93506A51.85133,51.85133,0,0,1,180,120ZM168.00659,78.44775l-.01294.0044L128,91.7832,44.64893,64,128,36.2168,211.35107,64Z"></path>{" "}
                  </g>
                </svg>
              </AsideOption>
              {/* 👇 OPCION DE ACUDIENTES */}
              <AsideOption id="acudientes" active={active.acudientes} handleClick={handleClick} titulo={"ACUDIENTES"}>
                {/* 👇 SVG de acudientes */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <path
                    fill="#a1a1aa"
                    d="M7.5 2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2M6 7h3a2 2 0 0 1 2 2v5.5H9.5V22h-4v-7.5H4V9a2 2 0 0 1 2-2m8.5 5a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-1 3h6v4H18v3h-3v-3h-1.5z"
                  />
                </svg>
              </AsideOption>
            </ul>
          </div>
          {/* ☝️ Aqui termina la lista de utilidades */}
        </>
      </aside>
      <main className={`flex-1 transition-all duration-300 ml-72`}>
        {/* Contenido principal del dashboard */}
        {active.inicio && (
          <div>
            {/* Aquí va el contenido para el inicio */}
            <p>Dashboard</p>
          </div>
        )}
        {active.profesores && <Teachers />}
        {active.cursos && <Courses />}
        {active.asignaturas && <Subjects />}
      </main>
    </div>
  );
};
