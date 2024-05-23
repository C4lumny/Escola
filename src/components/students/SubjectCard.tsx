import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSubjectContext } from "@/contexts/subjectProvider";

export const SubjectCard = ({ subject }: { subject: any }) => {
  const navigate = useNavigate();
  const { createSubject } = useSubjectContext();


  let shortTitle = "";
  if (subject && subject.nombre) {
    shortTitle = subject.nombre.substring(0, 2);
  }

  const handleClick = () => {
    navigate(`/students/${subject.nombre}`)
    createSubject(subject);
  };

  return (
    <div className="relative flex w-[16.8rem] flex-col rounded-xl bg-white dark:bg-background dark:border-slate-400 dark:border-2 bg-clip-border text-gray-700 shadow-md">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-t from-[#902582] to-blue-600">
        <div className="text-9xl font-jetbrains font-bold mt-9 text-start leading-none tracking-tighter dark:text-white antialiased ">
          {shortTitle}
        </div>
      </div>
      <div className="p-6 h-36">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal dark:text-white text-blue-gray-900 antialiased">
          {subject.nombre}
        </h5>
        <p className="block font-sans text-base font-light leading-relaxed dark:text-gray-300 text-inherit antialiased">
          {subject.descripcion}
        </p>
      </div>
      <div className="p-6 pt-0">
        <Link to={`/students/${subject.nombre}`}>
          <button
            onClick={handleClick}
            data-ripple-light="true"
            type="button"
            className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Ver más
          </button>
        </Link>
      </div>
    </div>
  );
};
