import { LightButton } from "noplin-uis";
import { HiOutlinePlus } from "react-icons/hi2";
import { useAppContext } from "../context/AppContext";
import { useTickets } from "../hooks/useTickets";
import TicketFilters from "../components/tickets/TicketFilters";
import TicketTable from "../components/tickets/TicketTable";

export default function DashboardPage() {
  const { state, dispatch } = useAppContext();
  const { role } = state;
  const { filtered, total } = useTickets();

  return (
    <div>
      {/* Top bar */}
      <div
        style={{
          padding: "14px 20px",
          borderBottom: "1px solid var(--npl-general-border-color)",
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          className="de-flex"
          style={{ alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
              {role === "requester" ? "My Tickets" : "All Tickets"}
            </h2>
            <span style={{ fontSize: 13, color: "#6b7280" }}>
              {filtered.length} ticket{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
          <LightButton
            onClick={() => dispatch({ type: "SET_VIEW", payload: "create" })}
            style={{ background: "#053d79ff", color: "#fff" }}
          >
            <HiOutlinePlus size={14} style={{ marginRight: 5, verticalAlign: "middle" }} />
            New Ticket
          </LightButton>
        </div>

        <TicketFilters showTeamFilter={role !== "requester"} />
      </div>

      {/* Table */}
      <div style={{ padding: 20 }}>
        <TicketTable tickets={filtered} totalCount={total} />
      </div>
    </div>
  );
}
