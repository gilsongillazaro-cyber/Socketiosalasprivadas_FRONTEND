import "../styles/NotFound.css";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="NotFound">
      <h1>
        erro 404 <AlertTriangle />
      </h1>
      <h1>Página não encontrada</h1>
      <Link to={"/"}>volte a pagina inicial</Link>
    </div>
  );
}
