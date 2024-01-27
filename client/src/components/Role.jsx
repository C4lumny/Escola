import { useParams } from "react-router-dom";
import { Panel } from "../pages/Panel";

export const Role = () => {
    const { role } = useParams();

    switch (role) {
        case "administrador":
            return <Panel />;
        // case "student":
        //     return <Student />;
        // case "parent":
        //     return <Parent />;
        // case "teacher":
        //     return <Teacher />;
        default:
            return <div>Role no reconocido</div>;
    }
};

