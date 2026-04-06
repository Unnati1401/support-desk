import { NoplinTableRow, NoplinTableDataCell, Avatar } from "noplin-uis";
import { useAppContext } from "../../context/AppContext";
import { fmtDate } from "../../utils/helpers";
import { NplBadge } from "../ui";
import { StatusBadge, PriorityBadge } from "./TicketBadges";

export default function TicketRow({ ticket }) {
  const { dispatch } = useAppContext();

  return (
    <NoplinTableRow
      onClick={() => dispatch({ type: "SELECT_TICKET", payload: ticket.id })}
      style={{ cursor: "pointer" }}
    >
      {/* Title column */}
      <NoplinTableDataCell>
        <div className="rpt-ti-cell">
          <div className="de-flex gap-5" style={{ alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#888", fontWeight: 600 }}>{ticket.id}</span>
            {!ticket.assignedTo && ticket.status === "open" && (
              <NplBadge variant="warning">Unassigned</NplBadge>
            )}
          </div>
          <span className="rpt-ti-txt" style={{ fontWeight: 600 }}>
            {ticket.title}
          </span>
          <span className="rpt-ti-sub">
            {ticket.createdBy} · {ticket.assignedTeam ?? "No team"} · {fmtDate(ticket.updatedAt)}
          </span>
        </div>
      </NoplinTableDataCell>

      {/* Status */}
      <NoplinTableDataCell>
        <StatusBadge status={ticket.status} />
      </NoplinTableDataCell>

      {/* Priority */}
      <NoplinTableDataCell>
        <PriorityBadge priority={ticket.priority} />
      </NoplinTableDataCell>

      {/* Assignee */}
      <NoplinTableDataCell>
        {ticket.assignedTo ? (
          <div className="de-flex gap-5" style={{ alignItems: "center" }}>
            <Avatar name={ticket.assignedTo || ""} size={24} statusColor="green" image="" />
            <span style={{ fontSize: 13 }}>{ticket.assignedTo.split(" ")[0]}</span>
          </div>
        ) : (
          <span style={{ color: "#bbb" }}>—</span>
        )}
      </NoplinTableDataCell>

      {/* Replies */}
      <NoplinTableDataCell>
        <span style={{ color: "#888", fontSize: 13 }}>
          {ticket.messages.length} msg{ticket.messages.length !== 1 ? "s" : ""}
        </span>
      </NoplinTableDataCell>
    </NoplinTableRow>
  );
}
