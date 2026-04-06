import { useState } from "react";
import { LightButton, Avatar, NoplinCard, NoplinCardBodyArea, TextAreaField } from "noplin-uis";
import { useAppContext } from "../../context/AppContext";
import { fmtDate } from "../../utils/helpers";
import { NplBadge } from "../ui";

function Message({ message }) {
  const roleVariant = { agent: "green", manager: "warning", requester: "info" };

  return (
    <div className="de-flex gap-10" style={{ marginBottom: 14, alignItems: "flex-start" }}>
      <Avatar name={message.author || ""} size={34} statusColor="green" image="" />
      <div style={{ flex: 1 }}>
        <div className="de-flex gap-5" style={{ alignItems: "center", marginBottom: 5 }}>
          <span style={{ fontWeight: 600, fontSize: 13 }}>{message.author}</span>
          <NplBadge variant={roleVariant[message.role] ?? "default"}>
            {message.role}
          </NplBadge>
          <span style={{ fontSize: 12, color: "#bbb" }}>{fmtDate(message.createdAt)}</span>
        </div>
        <NoplinCard style={{ margin: 0 }}>
          <NoplinCardBodyArea>
            <div style={{ padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {message.body}
            </div>
          </NoplinCardBodyArea>
        </NoplinCard>
      </div>
    </div>
  );
}

export default function MessageThread({ ticket }) {
  const { dispatch } = useAppContext();
  const [reply, setReply] = useState("");

  const handleSubmit = () => {
    if (!reply.trim()) return;
    dispatch({ type: "ADD_REPLY", ticketId: ticket.id, body: reply });
    setReply("");
  };

  return (
    <div>
      {/* Original description */}
      <NoplinCard style={{ marginBottom: 14 }}>
        <NoplinCardBodyArea>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>
            Original Request · {fmtDate(ticket.createdAt)}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.7 }}>{ticket.description}</div>
        </NoplinCardBodyArea>
      </NoplinCard>

      {/* Conversation */}
      {ticket.messages.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#929eaa",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: 10,
            }}
          >
            Conversation
          </div>
          {ticket.messages.map((m) => (
            <Message key={m.id} message={m} />
          ))}
        </div>
      )}

      {/* Reply box */}
      {ticket.status !== "closed" && (
        <NoplinCard>
          <NoplinCardBodyArea>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#929eaa",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 10,
              }}
            >
              Add Reply
            </div>
            <TextAreaField
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your reply…"
              rows={4}
            />
            <div className="de-flex" style={{ justifyContent: "flex-end", marginTop: 10 }}>
              <LightButton
                onClick={handleSubmit}
                disabled={!reply.trim()}
                style={{
                  background: "#053d79ff",
                  color: "#fff",
                  ...(reply.trim() ? {} : { opacity: 0.5, pointerEvents: "none" }),
                }}
              >
                Send Reply
              </LightButton>
            </div>
          </NoplinCardBodyArea>
        </NoplinCard>
      )}
    </div>
  );
}
