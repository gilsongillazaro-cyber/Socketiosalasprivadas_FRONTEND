import {
  AlertCircle,
  ArrowBigLeft,
  Check,
  CheckCheck,
  Clock,
  FaceGrinning,
  GitCompare,
  MailWarning,
  MessageCircleX,
  Send,
  ServerOff,
  X,
} from "lucide-react";
import "../styles/Messages.css";

import EmojiPicker from "emoji-picker-react";
import { useState, useRef, useContext, useEffect } from "react";
import { UserSContext } from "../Context/UserSelecionadoContext";
import { Bot, BotOff } from "lucide-react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import image from "../src/assets/ChatGPT Image 6_09_2026, 15_28_04.png";

export default function Messages({
  mobile,
  meuId,
  StatusUsers,
  socketRef,
  Mensagens,
  SetMensagens,
}) {
  const mensagemRef = useRef(null);
  const [MonstrarEmojis, setMonstrarEmojis] = useState(false);
  const [usuarioDigitando, setUsuarioDigitando] = useState(false);
  const { UserSCont, setUserSCont } = useContext(UserSContext);

  useEffect(() => {
    const socket = socketRef.current;

    if (!socket) return;

    socket.on("usuario-digitando", (dados) => {
      if (dados.remetenteId === UserSCont?.id) {
        setUsuarioDigitando(true);
      }
    });

    socket.on("usuario-parou-digitando", (dados) => {
      if (dados.remetenteId === UserSCont?.id) {
        setUsuarioDigitando(false);
      }
    });

    return () => {
      socket.off("usuario-digitando");
      socket.off("usuario-parou-digitando");
    };
  }, [UserSCont]);

  const statusUsuarioSelecionado = StatusUsers.find(
    (user) => user.id === UserSCont?.id,
  );

  const ulRef = useRef(null);
  const online = statusUsuarioSelecionado?.online === true;

  const mensagensFiltradas = Mensagens?.filter((messages) => {
    if (!UserSCont) return false;
    if (messages?.temporaria) {
      return messages.destinatarioId === UserSCont?.id;
    }
    const conversaComigo =
      (messages?.remetenteId === meuId &&
        messages?.destinatarioId === UserSCont?.id) ||
      (messages?.remetenteId === UserSCont?.id &&
        messages?.destinatarioId === meuId);
    return conversaComigo;
  });

  useEffect(() => {
    if (ulRef.current) {
      ulRef.current.scrollTo({
        top: ulRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [mensagensFiltradas.length]);

  let timerDigitando;

  function digitando() {
    socketRef.current?.emit("digitando", UserSCont?.id);

    clearTimeout(timerDigitando);

    timerDigitando = setTimeout(() => {
      socketRef.current?.emit("parou-digitando", UserSCont?.id);
    }, 1000);
  }
  return (
    <>
      {UserSCont ? (
        <div className="Messages">
          <header>
            {mobile && (
              <button
                className="seta"
                onClick={() => {
                  setUserSCont(null);
                }}
              >
                <ArrowBigLeft color="white" size={23} />
              </button>
            )}

            <div className="areaImg">
              <img
                src={`https://robohash.org/${UserSCont.id}`}
                alt="foto de perfil"
              />
              {UserSCont?.id !== meuId && (
                <strong
                  className="bolaStatus"
                  style={{
                    background: online ? "greenyellow" : "red",
                  }}
                />
              )}
            </div>
            <div className="des">
              <h2>{UserSCont.id === meuId ? "Voce" : UserSCont.nome}</h2>

              {UserSCont?.id !== meuId &&
                (online ? (
                  <p>
                    <Bot />
                    online
                  </p>
                ) : (
                  <p>
                    <BotOff /> offline
                  </p>
                ))}
            </div>
            <a target="_blank" href="http://github.com/gilsongillazaro-cyber/">
              <GitCompare /> gilson gil
            </a>
          </header>
          <ul ref={ulRef}>
            {mensagensFiltradas?.length > 0 ? (
              mensagensFiltradas.map((mensagem) => (
                <li
                  className={
                    mensagem.remetenteId
                      ? mensagem.remetenteId === meuId
                        ? "enviada"
                        : "recebida"
                      : "enviada"
                  }
                  key={mensagem.id}
                >
                  <p>{mensagem.texto}</p>

                  <div>
                    <span>
                      {mensagem.data &&
                        dayjs(mensagem.data).format("DD/MM/YYYY HH:mm")}
                    </span>

                    {mensagem.remetenteId === meuId &&
                      (mensagem.status === "enviando" ? (
                        <Clock size={20} />
                      ) : mensagem.status === "enviada" ? (
                        <Check size={20} />
                      ) : mensagem.status === "entregue" ? (
                        <CheckCheck size={20} />
                      ) : mensagem.status === "lida" ? (
                        <CheckCheck size={20} color="greenyellow" />
                      ) : (
                        <AlertCircle size={20} color="red" />
                      ))}
                  </div>
                </li>
              ))
            ) : (
              <div className="semSms">
                <MessageCircleX size={60} />

                <h1>nao ha mensagens</h1>

                {UserSCont?.id !== meuId ? (
                  <p>
                    mande uma mensagem para o {UserSCont?.nome} e inicie uma
                    conversa
                  </p>
                ) : (
                  <p>
                    mande uma mensagem para voce mesmo e inicie uma conversa
                    contigo proprio <q>anormal</q>
                  </p>
                )}
              </div>
            )}
            {usuarioDigitando && (
              <p className="pon">
                <p className="pontinhos"></p>
                <p className="pontinhos"></p>
                <p className="pontinhos"></p>
              </p>
            )}
          </ul>

          <form>
            {MonstrarEmojis && (
              <div className="emojis">
                <EmojiPicker
                  onEmojiClick={(data) => {
                    mensagemRef.current.value += data.emoji;
                  }}
                />
              </div>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                setMonstrarEmojis(!MonstrarEmojis);
              }}
            >
              {!MonstrarEmojis ? <FaceGrinning /> : <X />}
            </button>
            <textarea
              ref={mensagemRef}
              placeholder="Escreva sua Mensagem..."
              autoFocus
              onChange={digitando}
            ></textarea>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMonstrarEmojis(false);
                if (mensagemRef.current.value === "")
                  return toast.error(
                    `adicione uma mensagem pra enviar para o/a ${UserSCont?.nome}`,
                  );
                const mensagem = {
                  id: crypto.randomUUID(),
                  texto: mensagemRef.current.value,
                  destinatarioId: UserSCont?.id,
                  destinatarioNome: UserSCont?.nome,
                  status: "enviando",
                  temporaria: true,
                };

                SetMensagens((prev) => [...prev, mensagem]);
                socketRef.current
                  .timeout(5000)
                  .emit("mensagem-enviada", mensagem, (err, resposta) => {
                    if (err) {
                      SetMensagens((prev) =>
                        prev.map((sms) =>
                          sms.id === mensagem.id
                            ? { ...sms, status: "erro" }
                            : sms,
                        ),
                      );
                      return toast.error(
                        <div>
                          <h4>
                            <ServerOff /> Servidor nao respondeu
                          </h4>
                          <p>
                            <MailWarning /> Erro ao enviar a mensagem para o
                            usuario {UserSCont?.nome}
                          </p>
                        </div>,
                      );
                    }
                    if (resposta.enviada) {
                      SetMensagens((prev) =>
                        prev.map((sms) =>
                          sms.id === resposta.mensagem.id
                            ? resposta.mensagem
                            : sms,
                        ),
                      );
                    }
                  });

                mensagemRef.current.value = "";
              }}
            >
              <Send />
            </button>
          </form>
        </div>
      ) : (
        <div className="sem">
          <img src={image} alt="" />
          <p>selecine um usuario e inicie uma conversa</p>
        </div>
      )}
    </>
  );
}
