import { useCallback } from "react";
import { LightButton, Avatar } from "noplin-uis";
import { HiOutlineTicket, HiOutlineBolt, HiOutlinePlus, HiOutlineArrowLeft } from "react-icons/hi2";
import { useAppContext } from "../../context/AppContext";
import { useTicketCounts } from "../../hooks/useTickets";
import { NplBadge, NplDivider, NplNavItem } from "../ui";

const NAV_ITEMS = [
  { id: "dashboard", label: "Tickets",      icon: <HiOutlineTicket />, showBadge: true },
  { id: "triage",    label: "Triage Queue", icon: <HiOutlineBolt />, roles: ["agent", "manager"] },
  { id: "create",    label: "New Ticket",   icon: <HiOutlinePlus /> },
];

const ROLE_BADGE_VARIANT = { manager: "warning", agent: "green", requester: "info" };
const ROLE_LABEL        = { manager: "Manager",  agent: "Agent",  requester: "Requester" };

export default function Sidebar() {
  const { state, dispatch } = useAppContext();
  const { role, view, currentUser } = state;
  const counts = useTicketCounts();

  const onNav = useCallback(
    (id) => dispatch({ type: "SET_VIEW", payload: id }),
    [dispatch]
  );

  const visibleItems = NAV_ITEMS.filter(
    (n) => !n.roles || n.roles.includes(role)
  );

  const statsRows = [
    { label: "Open",       val: counts.open,       color: "#475584" },
    { label: "Pending",    val: counts.pending,     color: "#876019" },
    { label: "Unassigned", val: counts.unassigned,  color: "#c12c2c" },
  ];

  return (
    <div
      className="_npl-dash-left"
      style={{ minWidth: 240, maxWidth: 240, height: "100vh", position: "sticky", top: 0, flexShrink: 0 }}
    >
      <div className="_npl-dash-left-parent" style={{ width: 240 }}>
        <div className="_npl-dash-left-base" style={{ display: "flex", flexDirection: "column" }}>

          {/* Brand + user */}
          <div className="_npl-dn-l-t">
            <div className="de-flex gap-10" style={{ alignItems: "center", marginBottom: 16 }}>
              <div
                style={{
                  background: "var(--meeedly-button-background)",
                  borderRadius: 8,
                  padding: "6px 9px",
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <HiOutlineTicket size={18} color="#fff" />
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#000000",
                }}
              >
                SupportDesk
              </span>
            </div>

            <div className="de-flex gap-10" style={{ alignItems: "center" }}>
              <Avatar name={currentUser || ""} size={32} statusColor="green" image="" />
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#000000",
                    marginBottom: 3,
                  }}
                >
                  {currentUser}
                </div>
                <NplBadge variant={ROLE_BADGE_VARIANT[role]}>
                  {ROLE_LABEL[role]}
                </NplBadge>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div className="_npl-dn-l-c" style={{ flex: 1, paddingTop: 0 }}>
            <div className="__npl-mnl-23 _am-2">
              <ul className="__npl-mnl-23-nav-list _am-2">
                {visibleItems.map((n) => (
                  <NplNavItem
                    key={n.id}
                    label={n.label}
                    icon={n.icon}
                    active={view === n.id || (view === "detail" && n.id === "dashboard")}
                    onClick={() => onNav(n.id)}
                    badge={n.showBadge ? counts.total : undefined}
                  />
                ))}
              </ul>
            </div>

            <NplDivider />

            {/* Quick stats */}
            <div style={{ padding: "0 4px" }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#929eaa",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 8,
                  padding: "0 4px",
                }}
              >
                Quick Stats
              </div>
              {statsRows.map((s) => (
                <div
                  key={s.label}
                  className="de-flex"
                  style={{ justifyContent: "space-between", padding: "5px 4px", fontSize: 13 }}
                >
                  <span style={{ color: "#929eaa" }}>{s.label}</span>
                  <span style={{ fontWeight: 700, color: s.color }}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sign out */}
          <div className="_npl-dn-l-b">
            <LightButton
              onClick={() => dispatch({ type: "SET_ROLE", payload: null })}
              style={{ width: "100%" }}
            >
              <HiOutlineArrowLeft size={14} style={{ marginRight: 5, verticalAlign: "middle" }} />
              Sign out
            </LightButton>
          </div>

        </div>
      </div>
    </div>
  );
}
