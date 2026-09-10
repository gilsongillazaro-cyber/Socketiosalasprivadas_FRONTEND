import "../styles/Home.css";
import { ArrowBigRight, Key, LogIn } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const [monstar, setMonstrar] = useState(false);
  const navigate = useNavigate();
  const nomeRef = useRef(null);
  return (
    <div className="Home">
      <h1>
        Socket.IO Salas Privadas <Key />
      </h1>
      <p>Para acessar a sala voce precisa de digitar o seu nome</p>
      {!monstar && (
        <button id="cont" onClick={() => setMonstrar(true)}>
          continuar <ArrowBigRight />
        </button>
      )}

      {monstar && (
        <form>
          <input
            ref={nomeRef}
            type="text"
            placeholder="Digite o seu nome"
            autoFocus
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (!nomeRef.current.value)
                return toast.error("adicione o seu nome para continuar");
              localStorage.setItem("nome", nomeRef.current.value);
              navigate("/chat");
            }}
          >
            entrar <LogIn />
          </button>
        </form>
      )}
    </div>
  );
}
