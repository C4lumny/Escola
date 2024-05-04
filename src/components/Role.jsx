import { useParams, Route, Switch } from "react-router-dom";
import { Panel } from "../pages/administrators/Panel";
import { Student } from "@/pages/students/Student";

export const Role = () => {
  const { role } = useParams();

  switch (role) {
    case "administradores":
      return <Panel />;
    case "estudiantes":
      return (
        <Switch>
          <Route path="/estudiantes/materia">
            {/* Aquí renderiza el componente de la materia */}
            <Materia />
          </Route>
          {/* Rutas adicionales de estudiantes */}
          <Route exact path="/estudiantes">
            <Student />
          </Route>
          {/* Manejo de rutas desconocidas */}
          <Route>
            <div className="text-2xl">Error 404: Not found</div>
          </Route>
        </Switch>
      );
    default:
      return <div className="text-2xl">Error 404: Not found</div>;
  }
}
