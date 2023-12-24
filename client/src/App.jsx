import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "./pages/Login";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    let title = "Escola";
    if (location.pathname === "/") {
      title += " - Login";
    }
    
    document.title = title;
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default App;