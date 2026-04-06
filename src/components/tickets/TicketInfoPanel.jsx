import { NoplinCard, NoplinCardBodyArea } from "noplin-uis";
import { fmtDate } from "../../utils/helpers";

export default function TicketInfoPanel({ ticket }) {
  const rows = [
    { label: "ID",         val: ticket.id },
    { label: "Created by", val: ticket.createdBy },
    { label: "Assignee",   val: ticket.assignedTo ?? "—" },
    { label: "Team",       val: ticket.assignedTeam ?? "—" },
    { label: "Created",    val: fmtDate(ticket.createdAt) },
    { label: "Updated",    val: fmtDate(ticket.updatedAt) },
  ];

  return (
    <NoplinCard style={{ marginBottom: 14 }}>
      <NoplinCardBodyArea>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#929eaa",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 12,
        }}
      >
        Ticket Info
      </div>

      {rows.map((row) => (
        <div
          key={row.label}
          className="de-flex"
          style={{
            justifyContent: "space-between",
            padding: "6px 0",
            borderBottom: "1px solid var(--npl-general-border-color)",
            fontSize: 13,
          }}
        >
          <span style={{ color: "#888" }}>{row.label}</span>
          <span style={{ fontWeight: 600 }}>{row.val}</span>
        </div>
      ))}
      </NoplinCardBodyArea>
    </NoplinCard>
  );
}
