import { useState } from "react";
import { LightButton, DropDown } from "noplin-uis";
import { HiOutlineTicket, HiOutlineArrowLeft, HiOutlineUser } from "react-icons/hi2";
import { useAppContext } from "../context/AppContext";
import { useTicketById } from "../hooks/useTickets";
import { NplBadge, NplEmpty } from "../components/ui";
import { StatusBadge, PriorityBadge } from "../components/tickets/TicketBadges";
import MessageThread from "../components/tickets/MessageThread";
import ActivityTimeline from "../components/tickets/ActivityTimeline";
import TicketInfoPanel from "../components/tickets/TicketInfoPanel";
import { AGENTS, STATUSES } from "../data/constants";
import { capitalize, toDropDownList } from "../utils/helpers";

export default function TicketDetailPage() {
  const { state, dispatch } = useAppContext();
  const ticket = useTicketById(state.selectedTicketId);
  const [showAssign, setShowAssign] = useState(false);
  const [assignAgent, setAssignAgent] = useState(AGENTS[0]);
  const { role } = state;

  if (!ticket) {
    return <NplEmpty icon={<HiOutlineTicket size={32} />} title="Ticket not found" subtitle="It may have been deleted." />;
  }

  const isStaff = role === "agent" || role === "manager";

  const handleStatusChange = (e) =>
    dispatch({ type: "UPDATE_STATUS", ticketId: ticket.id, status: e.target.value });

  const handleAssignConfirm = () => {
    dispatch({
      type: "ASSIGN_TICKET",
      ticketId: ticket.id,
      agent: assignAgent,
      team: ticket.assignedTeam ?? "Support",
    });
    setShowAssign(false);
  };

  const statusOptions = STATUSES.map((s) => ({ value: s, label: capitalize(s) }));
  const agentOptions  = AGENTS.map((a) => ({ value: a, label: a }));

  return (
    <div>
      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid var(--npl-general-border-color)",
          padding: "14px 20px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        {/* Breadcrumb */}
        <div className="de-flex gap-10" style={{ alignItems: "center", marginBottom: 12 }}>
          <LightButton onClick={() => dispatch({ type: "SET_VIEW", payload: "dashboard" })}>
            <HiOutlineArrowLeft size={14} style={{ marginRight: 5, verticalAlign: "middle" }} />Back
          </LightButton>
          <span style={{ color: "#bbb" }}>/</span>
          <span style={{ fontSize: 13, color: "#888" }}>{ticket.id}</span>
        </div>

        {/* Title + actions */}
        <div
          className="de-flex"
          style={{ alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}
        >
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>
              {ticket.title}
            </h1>
            <div className="de-flex gap-5" style={{ flexWrap: "wrap" }}>
              <StatusBadge status={ticket.status} />
              <PriorityBadge priority={ticket.priority} />
              <NplBadge>{ticket.category}</NplBadge>
              {ticket.assignedTeam && (
                <NplBadge variant="info">{ticket.assignedTeam}</NplBadge>
              )}
            </div>
          </div>

          {isStaff && (
            <div className="de-flex gap-5">
              <DropDown
                isMouseInsideParentRow={true}
                list={toDropDownList(statusOptions, (v) => dispatch({ type: "UPDATE_STATUS", ticketId: ticket.id, status: v }))}
                button={{ icon: { icon: null, class: "" }, text: { text: statusOptions.find((o) => o.value === ticket.status)?.label || "Status", class: "_npl-mbnm-btn-txt" } }}
                buttonClasses="_npl-mbnm-btn"
                enableLoading={{ enable: false, duration: 0 }}
                dropDownsearch={false}
                debug={false}
                breakpoints={[{ ratio: 1200, fullWidth: false }, { ratio: 780, fullWidth: false }, { ratio: 480, fullWidth: true }]}
              />
              <LightButton onClick={() => setShowAssign((v) => !v)}>
                <HiOutlineUser size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> Assign
              </LightButton>
            </div>
          )}
        </div>

        {/* Assign panel */}
        {showAssign && (
          <div
            className="de-flex gap-10"
            style={{
              alignItems: "center",
              marginTop: 12,
              background: "#f9f9f9",
              padding: 12,
              borderRadius: 6,
            }}
          >
            <span style={{ fontSize: 13 }}>Assign to:</span>
            <DropDown
              isMouseInsideParentRow={true}
              list={toDropDownList(agentOptions, (v) => setAssignAgent(v))}
              button={{ icon: { icon: null, class: "" }, text: { text: agentOptions.find((o) => o.value === assignAgent)?.label || "Select agent", class: "_npl-mbnm-btn-txt" } }}
              buttonClasses="_npl-mbnm-btn"
              enableLoading={{ enable: false, duration: 0 }}
              dropDownsearch={false}
              debug={false}
              breakpoints={[{ ratio: 1200, fullWidth: false }, { ratio: 780, fullWidth: false }, { ratio: 480, fullWidth: true }]}
            />
            <LightButton onClick={handleAssignConfirm} style={{ background: "#053d79ff", color: "#fff" }}>
              Confirm
            </LightButton>
            <LightButton onClick={() => setShowAssign(false)}>Cancel</LightButton>
          </div>
        )}
      </div>

      {/* Body — 2-column grid */}
      <div className="npl-row" style={{ padding: 20, margin: 0, alignItems: "flex-start" }}>
        {/* Left: thread */}
        <div className="npl-col-8 npl-col-tb-12 npl-col-mb-12" style={{ paddingLeft: 0 }}>
          <MessageThread ticket={ticket} />
        </div>

        {/* Right: info + timeline */}
        <div className="npl-col-4 npl-col-tb-12 npl-col-mb-12" style={{ paddingRight: 0 }}>
          <TicketInfoPanel ticket={ticket} />
          <ActivityTimeline history={ticket.history} />
        </div>
      </div>
    </div>
  );
}
