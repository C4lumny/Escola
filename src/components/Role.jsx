import { useParams } from "react-router-dom";
import { Panel } from "../pages/administrators/Panel";
import { Student } from "@/pages/students/Student";

export const Role = () => {
  const { role } = useParams();

  switch (role) {
    case "administradores":
      return <Panel />;
    case "estudiantes":
      return <Student />;
    // case "parent":
    //     return <Parent />;
    // case "teacher":
    //     return <Teacher />;
    default:
      return <div className="text-2xl">Eror 404: Not found</div>;
  }
}
