import "../styles/Users.css";

import { UserSContext } from "../Context/UserSelecionadoContext";

import { useContext, useState } from "react";

import {
  BotMessageSquare,
  SearchAlert,
  TextAlignStart,
  UserPlus,
} from "lucide-react";

export default function Users({ meuId, users, MensagensNaoLidas, Mensagens }) {
  const { UserSCont, setUserSCont } = useContext(UserSContext);

  const [pesquisa, setPesquisa] = useState("");

  // Filtrar usuários pela pesquisa
  const usuariosFiltrados = users?.filter((user) =>
    user?.nome?.toLowerCase().includes(pesquisa.toLowerCase()),
  );

  return (
    <aside className="Users">
      <h1>
        <BotMessageSquare />
        Chat
        <sub>
          <UserPlus />
          todos{users?.length}
        </sub>
      </h1>

      <input
        type="search"
        placeholder="Buscar Usuarios..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />

      <ul>
        {usuariosFiltrados?.length > 0 ? (
          usuariosFiltrados.map((user) => {
            // Mensagens desta conversa
            const mensagensUsuario = Mensagens?.filter(
              (msg) =>
                (msg.remetenteId === user.id && msg.destinatarioId === meuId) ||
                (msg.remetenteId === meuId && msg.destinatarioId === user.id),
            );

            // Última mensagem
            const ultimaMensagem =
              mensagensUsuario?.[mensagensUsuario.length - 1];

            return (
              <li
                key={user.id}
                className={UserSCont?.id === user.id ? "Check" : ""}
                onClick={() => setUserSCont(user)}
              >
                <img src={`https://robohash.org/${user.id}`} alt="" />

                <div>
                  <h4>{user.id === meuId ? "Você" : user.nome}</h4>

                  <p>
                    <TextAlignStart size={10} />

                    {ultimaMensagem
                      ? ultimaMensagem.remetenteId === meuId
                        ? `Você: ${ultimaMensagem.texto}`
                        : `ele/a: ${ultimaMensagem.texto}`
                      : "Nenhuma mensagem"}
                  </p>
                </div>

                {MensagensNaoLidas?.[user.id] > 0 && (
                  <span className="bola">{MensagensNaoLidas[user.id]}</span>
                )}
              </li>
            );
          })
        ) : (
          <li>
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SearchAlert size={60} />

              <h4>Nenhum usuário encontrado</h4>
            </div>
          </li>
        )}
      </ul>
    </aside>
  );
}
