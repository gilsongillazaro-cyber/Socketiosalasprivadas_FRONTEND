import "../styles/Chat.css";
import Users from "../Components/Users";
import Messages from "../Components/messages";
import { useState, useEffect, useRef, useContext } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

import { UserSContext } from "../Context/UserSelecionadoContext";
import { toast } from "react-toastify";
import { BellPlus, TextAlignStart } from "lucide-react";

export default function Chat() {
  const [mobile, setMobile] = useState(window.innerWidth <= 768);
  const [meuId, setMeuId] = useState(null);
  const [users, setUsers] = useState();
  const [StatusUsers, setStatusUsers] = useState([]);
  const socketRef = useRef(null);
  const navigate = useNavigate();

  const [Mensagens, SetMensagens] = useState([]);
  const [MensagensNaoLidas, setMensagensNaoLidas] = useState({});

  const { UserSCont, setUserSCont } = useContext(UserSContext);

  const UserSContRef = useRef(UserSCont);

  useEffect(() => {
    UserSContRef.current = UserSCont;
  }, [UserSCont]);
  //tratei a conexao
  useEffect(() => {
    const nome = localStorage.getItem("nome");
    if (!nome) return navigate("/");

    const socket = io("https://socketiosalasprivadas-backend.onrender.com");

    socket.on("connect", () => {
      socketRef.current = socket;
      setMeuId(socket.id);
    });
    socket.emit("nome-conectado", nome);
    socket.on("usuarios-conectados", (users) => setUsers(users));
    socket.on("online", (dados) => {
      setStatusUsers((prev) => {
        const existe = prev.some((user) => user.id === dados.id);

        if (existe) {
          return prev.map((user) =>
            user.id === dados.id ? { ...user, online: true } : user,
          );
        }

        return [...prev, dados];
      });
    });
    socket.on("usuarios-online", (usuarios) => {
      setStatusUsers((prev) => {
        const novos = [...prev];

        usuarios.forEach((usuario) => {
          const existe = novos.some((user) => user.id === usuario.id);

          if (!existe) {
            novos.push(usuario);
          }
        });

        return novos;
      });
    });
    socket.on("offline", (dados) => {
      setStatusUsers((prev) =>
        prev.map((user) =>
          user.id === dados.id ? { ...user, online: false } : user,
        ),
      );
      console.log("usuers offline ", dados);
    });

    socket.on("mensagem-recebida", (mensagem) => {
      const conversaAberta = UserSContRef.current?.id === mensagem.remetenteId;

      SetMensagens((prev) => [
        ...prev,
        {
          ...mensagem,
          status: conversaAberta ? "lida" : "entregue",
        },
      ]);

      if (conversaAberta) {
        socket.emit("mensagem-lida", {
          remetenteId: mensagem.remetenteId,
          mensagemId: mensagem.id,
        });

        return;
      }

      setMensagensNaoLidas((prev) => ({
        ...prev,
        [mensagem.remetenteId]: (prev[mensagem.remetenteId] || 0) + 1,
      }));

      socket.emit("mensagem-entregue", {
        remetenteId: mensagem.remetenteId,
        mensagemId: mensagem.id,
      });
      toast.info(
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            const dados = {
              id: mensagem.remetenteId,
              nome: mensagem.remetenteNome,
            };
            setUserSCont(dados);
            toast.dismiss();
          }}
        >
          <h4
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BellPlus /> Nova Mensagem de/a {mensagem.remetenteNome}
          </h4>
          <p>
            {" "}
            <TextAlignStart size={10} /> {mensagem.texto}
          </p>
        </div>,
      );
    });

    socket.on("mensagem-status-atualizada", (msg) => {
      SetMensagens((prev) =>
        prev.map((ms) =>
          ms.id === msg.id ? { ...ms, status: msg.status } : ms,
        ),
      );
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!UserSCont || !meuId || !socketRef.current) return;

    const mensagensParaLer = Mensagens.filter((msg) => {
      return (
        msg.remetenteId === UserSCont.id &&
        msg.destinatarioId === meuId &&
        msg.status === "entregue"
      );
    });

    console.log("MENSAGENS PARA LER:", mensagensParaLer);

    mensagensParaLer.forEach((msg) => {
      socketRef.current.emit("mensagem-lida", {
        remetenteId: msg.remetenteId,
        mensagemId: msg.id,
      });
    });
  }, [UserSCont, Mensagens, meuId]);

  //tratei a responsividade
  useEffect(() => {
    function verificarTela() {
      setMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", verificarTela);
    return () => {
      window.removeEventListener("resize", verificarTela);
    };
  }, []);

  useEffect(() => {
    if (!UserSCont?.id) return;

    setMensagensNaoLidas((prev) => ({
      ...prev,
      [UserSCont.id]: 0,
    }));
  }, [UserSCont]);

  return (
    <div className="Chat">
      {mobile ? (
        UserSCont ? (
          <Messages
            StatusUsers={StatusUsers}
            mobile={mobile}
            meuId={meuId}
            socketRef={socketRef}
            SetMensagens={SetMensagens}
            Mensagens={Mensagens}
          />
        ) : (
          <Users
            meuId={meuId}
            users={users}
            Mensagens={Mensagens}
            MensagensNaoLidas={MensagensNaoLidas}
          />
        )
      ) : (
        <div className="Chat">
          <Users
            meuId={meuId}
            users={users}
            Mensagens={Mensagens}
            MensagensNaoLidas={MensagensNaoLidas}
          />
          <Messages
            StatusUsers={StatusUsers}
            mobile={mobile}
            meuId={meuId}
            socketRef={socketRef}
            SetMensagens={SetMensagens}
            Mensagens={Mensagens}
          />
        </div>
      )}
    </div>
  );
}
