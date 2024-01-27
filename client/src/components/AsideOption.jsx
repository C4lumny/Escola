export const AsideOption = ({id, active, titulo, handleClick, children}) => {
  return (
    <li
      className="flex items-center justify-start space-x-5 cursor-pointer relative h-14"
      onClick={() => handleClick(id)}
    >
      <div className={`${!active ? "" : "absolute bg-red-700 w-[3px] h-full shadow-2xl shadow-red-400"}`}></div>
      {children}
      <span className={`${active ? "text-zinc-800 ease-in-out duration-200" : ""}`}>{titulo}</span>
    </li>
  );
};
