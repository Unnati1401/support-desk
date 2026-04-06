import { useState } from "react";
import { LightButton, NoplinCard, NoplinCardBodyArea, DropDown, GeneralSuccessNotification } from "noplin-uis";
import { HiOutlineBolt, HiOutlineXMark, HiOutlineArrowRight } from "react-icons/hi2";
import { useAppContext } from "../context/AppContext";
import { useTriageQueue } from "../hooks/useTickets";
import { NplBadge } from "../components/ui";
import { StatusBadge, PriorityBadge } from "../components/tickets/TicketBadges";
import { AGENTS } from "../data/constants";
import { fmtDate, toDropDownList } from "../utils/helpers";

const PRIORITY_BORDER = {
  critical: "#c12c2c",
  high:     "#D85A30",
  medium:   "#876019",
  low:      "#3B6D11",
};

function TriageCard({ ticket, rank }) {
  const { dispatch } = useAppContext();
  const [showAssign, setShowAssign] = useState(false);
  const [agent, setAgent] = useState(AGENTS[0]);

  const handleAssign = () => {
    dispatch({
      type: "ASSIGN_TICKET",
      ticketId: ticket.id,
      agent,
      team: ticket.assignedTeam ?? "Support",
    });
    setShowAssign(false);
  };

  const handleMarkPending = () =>
    dispatch({ type: "UPDATE_STATUS", ticketId: ticket.id, status: "pending" });

  const handleView = () =>
    dispatch({ type: "SELECT_TICKET", payload: ticket.id });

  return (
    <NoplinCard
      style={{
        marginBottom: 10,
        borderLeft: `4px solid ${PRIORITY_BORDER[ticket.priority] ?? "#ccc"}`,
      }}
    >
      <NoplinCardBodyArea>
      <div className="de-flex gap-15" style={{ alignItems: "flex-start" }}>
        {/* Rank badge */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: rank === 0 ? "#fff4e5" : "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 13,
            color: rank === 0 ? "#876019" : "#6b7280",
            flexShrink: 0,
          }}
        >
          #{rank + 1}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="de-flex gap-5" style={{ flexWrap: "wrap", marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: "#888", fontWeight: 600 }}>{ticket.id}</span>
            <PriorityBadge priority={ticket.priority} />
            <StatusBadge status={ticket.status} />
            {!ticket.assignedTo && <NplBadge variant="warning">Unassigned</NplBadge>}
          </div>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{ticket.title}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            {ticket.category} · {ticket.createdBy} · {fmtDate(ticket.createdAt)}
            {ticket.assignedTo && (
              <> · <strong>→ {ticket.assignedTo}</strong></>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="de-flex gap-5" style={{ flexShrink: 0, flexWrap: "wrap", alignItems: "center" }}>
          <LightButton onClick={handleView}>View</LightButton>

          {!ticket.assignedTo && (
            showAssign ? (
              <>
                <DropDown
                  isMouseInsideParentRow={true}
                  list={toDropDownList(AGENTS.map((a) => ({ value: a, label: a })), (v) => setAgent(v))}
                  button={{ icon: { icon: null, class: "" }, text: { text: agent, class: "_npl-mbnm-btn-txt" } }}
                  buttonClasses="_npl-mbnm-btn"
                  enableLoading={{ enable: false, duration: 0 }}
                  dropDownsearch={true}
                  debug={false}
                  breakpoints={[{ ratio: 1200, fullWidth: false }, { ratio: 780, fullWidth: false }, { ratio: 480, fullWidth: true }]}
                />
                <LightButton onClick={handleAssign} style={{ background: "#053d79ff", color: "#fff" }}>Assign</LightButton>
                <LightButton onClick={() => setShowAssign(false)}><HiOutlineXMark size={14} /></LightButton>
              </>
            ) : (
              <LightButton onClick={() => setShowAssign(true)} style={{ background: "#0F6E56", color: "#fff" }}>
                Assign <HiOutlineArrowRight size={14} style={{ verticalAlign: "middle" }} />
              </LightButton>
            )
          )}

          {ticket.status === "open" && (
            <LightButton onClick={handleMarkPending}>Mark Pending</LightButton>
          )}
        </div>
      </div>
      </NoplinCardBodyArea>
    </NoplinCard>
  );
}

export default function TriagePage() {
  const queue = useTriageQueue();

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>
          <HiOutlineBolt style={{ verticalAlign: "middle", marginRight: 6 }} /> Smart Triage Queue
        </h2>
        <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
          Sorted: Unassigned → Critical / High priority → Oldest unresolved
        </p>
      </div>

      {queue.length === 0 ? (
        <GeneralSuccessNotification
          message="Queue is clear — all open tickets are assigned!"
          onClose={() => {}}
        />
      ) : (
        queue.map((ticket, i) => (
          <TriageCard key={ticket.id} ticket={ticket} rank={i} />
        ))
      )}
    </div>
  );
}
