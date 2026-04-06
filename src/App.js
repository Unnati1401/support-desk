import { useState, useReducer, useContext, createContext, useCallback, useMemo } from "react";
import { HiOutlineTicket, HiOutlineBolt, HiOutlinePlus, HiOutlineArrowLeft, HiOutlineUser, HiOutlinePhone, HiOutlineCog6Tooth, HiOutlinePlusCircle, HiOutlineChatBubbleLeft, HiOutlineArrowPath, HiOutlineXMark, HiOutlineArrowDown, HiOutlineArrowRight, HiOutlineArrowUp, HiOutlineChevronDoubleUp, HiOutlineMagnifyingGlass } from "react-icons/hi2";

const NplBadge = ({ children, variant = "default", style }) => {
  const variantClass = {
    default: "",
    green: "_nmcls-2 public",
    warning: "_pending",
    danger: "personal",
    info: "_ansp",
    open: "_ansp",
    pending: "_pending",
    resolved: "_nmcls-2 public",
    closed: "",
    low: "_nmcls-2 public",
    medium: "_pending",
    high: "personal",
    critical: "business",
  }[variant] || "";
  return (
    <span className={`rpt-bdg ${variantClass}`} style={style}>
      {children}
    </span>
  );
};

const NplButton = ({ children, onClick, variant = "default", disabled, icon, fullWidth, style }) => {
  const variantClass = {
    default: "",
    primary: "_mdx-btn",
    black: "black-btn",
    lighter: "btn-lighter",
    ghost: "btn-lighter",
    success: "btn-lighter __nbld-bs23",
    danger: "black-btn",
  }[variant] || "";
  return (
    <button
      className={`_npl-btn gap-5${variantClass ? " " + variantClass : ""}${fullWidth ? " wi-100 mobile-width-100" : ""}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {icon && <span className="_npl-btn-icon">{icon}</span>}
      <span className={`_npl-btn-txt${variant === "lighter" || variant === "ghost" ? " -lighter" : ""}`}>
        {children}
      </span>
    </button>
  );
};

const NplCard = ({ children, style, onClick, className = "" }) => (
  <div className={`npl-card ${className}`} style={style} onClick={onClick}>
    <div className="npl-card-body">{children}</div>
  </div>
);

const NplInput = ({ value, onChange, placeholder, type = "text", label, style }) => (
  <div className="__npl-material-ipp" style={style}>
    {label && <label className="__npl-material-input-lbl-vp __cma32">{label}</label>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="_npl-field" />
  </div>
);

const NplTextarea = ({ value, onChange, placeholder, rows = 4, label }) => (
  <div className="__npl-material-ipp">
    {label && <label className="__npl-material-input-lbl-vp __cma32">{label}</label>}
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} className="_npl-field" />
  </div>
);

const NplSelect = ({ value, onChange, options, style, label }) => (
  <div className="__npl-material-ipp" style={style}>
    {label && <label className="__npl-material-input-lbl-vp __cma32">{label}</label>}
    <select value={value} onChange={onChange} className="_npl-field" style={{ cursor: "pointer" }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

const NplAvatar = ({ name, size = 40 }) => {
  const initials = name?.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase() || "??";
  const colors = ["#475584", "#0F6E56", "#854F0B", "#A32D2D", "#185FA5", "#993C1D"];
  const bg = colors[name ? name.charCodeAt(0) % colors.length : 0];
  return (
    <div className="__npl-avatar-icon" style={{ width: size, height: size, backgroundColor: bg, fontSize: size * 0.35, color: "#fff", minWidth: size, minHeight: size }}>
      <p style={{ color: "#fff", fontSize: size * 0.35, margin: 0, position: "static" }}>{initials}</p>
    </div>
  );
};

const NplNotification = ({ children, type = "info" }) => {
  const cls = { info: "_inf", success: "_scs", warning: "_wrn", danger: "_danger" }[type] || "_inf";
  return (
    <div className={`_npl-ntf ${cls}`}>
      <span className="_ntf-msg">{children}</span>
    </div>
  );
};

const NplDivider = ({ style }) => (
  <div style={{ borderTop: "1px solid var(--npl-general-border-color)", margin: "12px 0", ...style }} />
);

const NplEmpty = ({ icon, title, subtitle }) => (
  <div style={{ textAlign: "center", padding: "48px 24px", color: "#888" }}>
    <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
    <div style={{ fontWeight: 600, color: "#444", marginBottom: 6 }}>{title}</div>
    <div style={{ fontSize: 13 }}>{subtitle}</div>
  </div>
);

const NplNavItem = ({ label, icon, active, onClick, badge }) => (
  <li className="__npl-mnl-23-item _am-2">
    <a className={`__npl-mnl-23-link _am-2 _As2 _am-21${active ? " active" : ""}`} onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="__npl-mnl-23-content">
        <span className="__npl-mnl-23-icon" style={{ fontSize: 16, marginRight: 10 }}>{icon}</span>
        <span className="__npl-mnl-23-text">{label}</span>
        {badge !== undefined && <span className="__npl-mnl-23-badge">{badge}</span>}
      </div>
    </a>
  </li>
);

// DATA & HELPERS

const TEAMS = ["Frontend", "Backend", "DevOps", "Billing", "Support", "Security"];
const CATEGORIES = ["Bug Report", "Feature Request", "Account", "Billing", "Technical", "General"];
const AGENTS = ["Alex Chen", "Maria Santos", "James Wilson", "Priya Nair", "Tom Baker"];

const mkId = () => Math.random().toString(36).slice(2, 8).toUpperCase();
const now = () => new Date().toISOString();
const ago = (h) => new Date(Date.now() - h * 3600000).toISOString();
const fmtDate = (iso) => {
  const d = new Date(iso), diff = Date.now() - d.getTime();
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const INITIAL_TICKETS = [
  { id: "TK-001", title: "Login page throws 500 error on Safari", description: "Users on Safari 16 are unable to log in. The page shows a 500 internal server error after entering credentials. This affects approximately 20% of our user base.", status: "open", priority: "high", category: "Bug Report", createdBy: "Sarah Jones", assignedTo: null, assignedTeam: "Frontend", createdAt: ago(2), updatedAt: ago(1), messages: [{ id: mkId(), author: "Sarah Jones", role: "requester", body: "This is urgent — many customers are affected. We've had 15 complaints today.", createdAt: ago(1.8) }, { id: mkId(), author: "Alex Chen", role: "agent", body: "Looking into this now. Can you share the exact Safari version?", createdAt: ago(1.5) }], history: [{ type: "created", by: "Sarah Jones", at: ago(2), detail: "Ticket created" }, { type: "assigned", by: "System", at: ago(1.9), detail: "Assigned to Frontend team" }, { type: "reply", by: "Sarah Jones", at: ago(1.8), detail: "Reply added" }, { type: "reply", by: "Alex Chen", at: ago(1.5), detail: "Agent replied" }] },
  { id: "TK-002", title: "Unable to download invoices from billing portal", description: "When clicking 'Download PDF' on any invoice in the billing portal, nothing happens. Tried in Chrome and Firefox.", status: "pending", priority: "medium", category: "Billing", createdBy: "Marcus Lee", assignedTo: "Maria Santos", assignedTeam: "Billing", createdAt: ago(5), updatedAt: ago(3), messages: [{ id: mkId(), author: "Marcus Lee", role: "requester", body: "This is blocking our accounting team from closing monthly books.", createdAt: ago(4.5) }, { id: mkId(), author: "Maria Santos", role: "agent", body: "Hi Marcus, reproduced the issue. It's a CORS config problem with the PDF service. Working on a fix.", createdAt: ago(4) }], history: [{ type: "created", by: "Marcus Lee", at: ago(5), detail: "Ticket created" }, { type: "assigned", by: "Maria Santos", at: ago(4.8), detail: "Assigned to Maria Santos" }, { type: "status", by: "Maria Santos", at: ago(4), detail: "Status changed to Pending" }] },
  { id: "TK-003", title: "Request: Dark mode for the dashboard", description: "Our team works late hours and would love a dark mode option for the main dashboard. It would reduce eye strain significantly.", status: "open", priority: "low", category: "Feature Request", createdBy: "Diana Prince", assignedTo: null, assignedTeam: null, createdAt: ago(24), updatedAt: ago(24), messages: [], history: [{ type: "created", by: "Diana Prince", at: ago(24), detail: "Ticket created" }] },
  { id: "TK-004", title: "API rate limiting causing production outages", description: "Our integration is hitting rate limits unexpectedly. We're on the Enterprise plan which should allow 10k req/min but we're being throttled at 1k. Production service is degraded.", status: "open", priority: "critical", category: "Technical", createdBy: "Erik Nolan", assignedTo: "James Wilson", assignedTeam: "Backend", createdAt: ago(0.5), updatedAt: ago(0.3), messages: [{ id: mkId(), author: "Erik Nolan", role: "requester", body: "This is causing a P0 incident on our end. Need immediate help.", createdAt: ago(0.45) }, { id: mkId(), author: "James Wilson", role: "agent", body: "Escalating this now. Checking the rate limit config for your account.", createdAt: ago(0.3) }], history: [{ type: "created", by: "Erik Nolan", at: ago(0.5), detail: "Ticket created" }, { type: "assigned", by: "James Wilson", at: ago(0.4), detail: "Assigned to James Wilson" }] },
  { id: "TK-005", title: "Two-factor authentication not sending SMS codes", description: "2FA codes via SMS are not being delivered. Email-based 2FA works fine. This is affecting multiple users.", status: "resolved", priority: "high", category: "Account", createdBy: "Lena Kim", assignedTo: "Tom Baker", assignedTeam: "Security", createdAt: ago(48), updatedAt: ago(12), messages: [{ id: mkId(), author: "Tom Baker", role: "agent", body: "Issue was with SMS provider outage. Switched to backup provider — codes work now.", createdAt: ago(13) }], history: [{ type: "created", by: "Lena Kim", at: ago(48), detail: "Ticket created" }, { type: "assigned", by: "Tom Baker", at: ago(47), detail: "Assigned to Tom Baker" }, { type: "status", by: "Tom Baker", at: ago(12), detail: "Status changed to Resolved" }] },
  { id: "TK-006", title: "Webhook deliveries failing silently", description: "Webhooks appear to send successfully in our dashboard but the receiving endpoint logs show no incoming requests.", status: "open", priority: "high", category: "Technical", createdBy: "Ryan Clark", assignedTo: null, assignedTeam: "Backend", createdAt: ago(3), updatedAt: ago(3), messages: [], history: [{ type: "created", by: "Ryan Clark", at: ago(3), detail: "Ticket created" }] },
  { id: "TK-007", title: "Incorrect currency conversion on checkout", description: "Users paying in EUR are being charged the USD amount without conversion. This results in significant overcharges.", status: "open", priority: "critical", category: "Billing", createdBy: "Hana Fischer", assignedTo: null, assignedTeam: null, createdAt: ago(1), updatedAt: ago(1), messages: [], history: [{ type: "created", by: "Hana Fischer", at: ago(1), detail: "Ticket created" }] },
  { id: "TK-008", title: "Team member invites not arriving", description: "When inviting new team members, the invitation email is not received. We've checked spam folders.", status: "closed", priority: "medium", category: "Account", createdBy: "Yuki Tanaka", assignedTo: "Priya Nair", assignedTeam: "Support", createdAt: ago(72), updatedAt: ago(36), messages: [{ id: mkId(), author: "Priya Nair", role: "agent", body: "Issue resolved — domain was on blocklist. Invites resent.", createdAt: ago(37) }], history: [{ type: "created", by: "Yuki Tanaka", at: ago(72), detail: "Ticket created" }, { type: "status", by: "Priya Nair", at: ago(37), detail: "Status changed to Closed" }] },
];

//  CONTEXT & REDUCER 

const AppCtx = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "SET_ROLE": return { ...state, role: action.payload, view: "dashboard" };
    case "SET_VIEW": return { ...state, view: action.payload, selectedTicketId: null };
    case "SELECT_TICKET": return { ...state, selectedTicketId: action.payload, view: "detail" };
    case "CREATE_TICKET": return { ...state, tickets: [{ ...action.payload, id: `TK-${String(state.tickets.length + 1).padStart(3, "0")}`, createdAt: now(), updatedAt: now(), messages: [], history: [{ type: "created", by: state.currentUser, at: now(), detail: "Ticket created" }], createdBy: state.currentUser, status: "open" }, ...state.tickets], view: "dashboard" };
    case "ADD_REPLY": return { ...state, tickets: state.tickets.map(t => t.id === action.ticketId ? { ...t, updatedAt: now(), messages: [...t.messages, { id: mkId(), author: state.currentUser, role: state.role, body: action.body, createdAt: now() }], history: [...t.history, { type: "reply", by: state.currentUser, at: now(), detail: "Reply added" }] } : t) };
    case "UPDATE_STATUS": return { ...state, tickets: state.tickets.map(t => t.id === action.ticketId ? { ...t, status: action.status, updatedAt: now(), history: [...t.history, { type: "status", by: state.currentUser, at: now(), detail: `Status changed to ${action.status}` }] } : t) };
    case "ASSIGN_TICKET": return { ...state, tickets: state.tickets.map(t => t.id === action.ticketId ? { ...t, assignedTo: action.agent, assignedTeam: action.team, updatedAt: now(), history: [...t.history, { type: "assigned", by: state.currentUser, at: now(), detail: `Assigned to ${action.agent || action.team}` }] } : t) };
    case "SET_FILTER": return { ...state, filters: { ...state.filters, ...action.payload } };
    case "SET_SEARCH": return { ...state, search: action.payload };
    default: return state;
  }
}

const initState = { role: null, view: "login", selectedTicketId: null, currentUser: "You", tickets: INITIAL_TICKETS, filters: { status: "all", priority: "all", team: "all", sort: "newest" }, search: "" };

//  SHARED TICKET COMPONENTS 

const StatusBadge = ({ status }) => {
  const map = { open: "open", pending: "pending", resolved: "resolved", closed: "default" };
  const labels = { open: "Open", pending: "Pending", resolved: "Resolved", closed: "Closed" };
  return <NplBadge variant={map[status] || "default"}>{labels[status] || status}</NplBadge>;
};

const PriorityBadge = ({ priority }) => {
  const icons = { low: <HiOutlineArrowDown style={{ verticalAlign: "middle" }} />, medium: <HiOutlineArrowRight style={{ verticalAlign: "middle" }} />, high: <HiOutlineArrowUp style={{ verticalAlign: "middle" }} />, critical: <HiOutlineChevronDoubleUp style={{ verticalAlign: "middle" }} /> };
  return <NplBadge variant={priority}>{icons[priority]} {priority}</NplBadge>;
};

const TicketRow = ({ ticket, onClick }) => (
  <tr className="__npl-gentable-tr" onClick={onClick} style={{ cursor: "pointer" }}
    onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
    <td className="__npl-gentable-td">
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <div className="de-flex gap-5" style={{ alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#888", fontWeight: 600 }}>{ticket.id}</span>
          {!ticket.assignedTo && ticket.status === "open" && <NplBadge variant="warning">Unassigned</NplBadge>}
        </div>
        <span className="rpt-ti-txt" style={{ fontWeight: 600 }}>{ticket.title}</span>
        <span className="rpt-ti-sub">{ticket.createdBy} · {ticket.assignedTeam || "No team"} · {fmtDate(ticket.updatedAt)}</span>
      </div>
    </td>
    <td className="__npl-gentable-td"><StatusBadge status={ticket.status} /></td>
    <td className="__npl-gentable-td"><PriorityBadge priority={ticket.priority} /></td>
    <td className="__npl-gentable-td">
      {ticket.assignedTo
        ? <div className="de-flex gap-5" style={{ alignItems: "center" }}><NplAvatar name={ticket.assignedTo} size={24} /><span style={{ fontSize: 13 }}>{ticket.assignedTo.split(" ")[0]}</span></div>
        : <span style={{ color: "#bbb" }}>—</span>}
    </td>
    <td className="__npl-gentable-td" style={{ color: "#888", fontSize: 13 }}>{ticket.messages.length} msg{ticket.messages.length !== 1 ? "s" : ""}</td>
  </tr>
);

//  LOGIN PAGE

function LoginPage() {
  const { dispatch } = useContext(AppCtx);
  const roles = [
    { id: "requester", label: "Requester", desc: "Create and track your support tickets", icon: <HiOutlineUser size={22} /> },
    { id: "agent", label: "Support Agent", desc: "View and resolve tickets assigned to you", icon: <HiOutlinePhone size={22} /> },
    { id: "manager", label: "Manager / Admin", desc: "Full access - all tickets, teams & assignments", icon: <HiOutlineCog6Tooth size={22} /> },
  ];
  return (
    <div style={{ minHeight: "100vh", background: "var(--background-color,#f2f3f0)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 460 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--meeedly-button-background,#475584)", borderRadius: 10, padding: "10px 20px", marginBottom: 20 }}>
            <HiOutlineTicket size={20} color="#fff" />
            <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>SupportDesk</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#22232a", margin: "0 0 8px" }}>Sign in to your workspace</h1>
          <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>Select your role to continue</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {roles.map(r => (
            <div key={r.id} className="npl-card" onClick={() => dispatch({ type: "SET_ROLE", payload: r.id })}
              style={{ cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(71,85,132,0.18)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "var(--npl-card-box-shadow)"}>
              <div className="npl-card-body">
                <div className="de-flex gap-15" style={{ alignItems: "center" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 10, background: "#eef0f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{r.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#22232a", marginBottom: 3 }}>{r.label}</div>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>{r.desc}</div>
                  </div>
                  <span style={{ color: "#bbb", fontSize: 20 }}>›</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: "#b4b2a9", marginTop: 24 }}>Demo environment - no authentication required</p>
      </div>
    </div>
  );
}

//  SIDEBAR LAYOUT 

function AppLayout({ children }) {
  const { state, dispatch } = useContext(AppCtx);
  const { role, view } = state;

  const counts = useMemo(() => ({
    total: state.tickets.length,
    open: state.tickets.filter(t => t.status === "open").length,
    pending: state.tickets.filter(t => t.status === "pending").length,
    unassigned: state.tickets.filter(t => !t.assignedTo && t.status === "open").length,
  }), [state.tickets]);

  const onNav = useCallback((v) => dispatch({ type: "SET_VIEW", payload: v }), [dispatch]);

  const navItems = [
    { id: "dashboard", label: "Tickets", icon: <HiOutlineTicket />, badge: counts.total },
    { id: "triage", label: "Triage Queue", icon: <HiOutlineBolt />, roles: ["agent", "manager"] },
    { id: "create", label: "New Ticket", icon: <HiOutlinePlus /> },
  ].filter(n => !n.roles || n.roles.includes(role));

  return (
    <div className="de-flex" style={{ height: "100vh", overflow: "hidden" }}>
      {/* noplin-uis sidebar: _npl-dash-left */}
      <div className="_npl-dash-left" style={{ minWidth: 240, maxWidth: 240, height: "100vh", position: "sticky", top: 0, flexShrink: 0 }}>
        <div className="_npl-dash-left-parent" style={{ width: 240 }}>
          <div className="_npl-dash-left-base" style={{ display: "flex", flexDirection: "column" }}>
            <div className="_npl-dn-l-t">
              <div className="de-flex gap-10" style={{ alignItems: "center", marginBottom: 16 }}>
                <div style={{ background: "var(--meeedly-button-background)", borderRadius: 8, padding: "6px 9px", fontSize: 15, display: "flex", alignItems: "center" }}><HiOutlineTicket size={18} color="#fff" /></div>
                <span style={{ fontWeight: 700, fontSize: 15, color: "#000000" }}>SupportDesk</span>
              </div>
              <div className="de-flex gap-10" style={{ alignItems: "center" }}>
                <NplAvatar name="You" size={32} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#000000", marginBottom: 3 }}>You</div>
                  <NplBadge variant={role === "manager" ? "warning" : role === "agent" ? "green" : "info"}>
                    {role === "manager" ? "Manager" : role === "agent" ? "Agent" : "Requester"}
                  </NplBadge>
                </div>
              </div>
            </div>

            <div className="_npl-dn-l-c" style={{ flex: 1, paddingTop: 0 }}>
              <div className="__npl-mnl-23 _am-2">
                <ul className="__npl-mnl-23-nav-list _am-2">
                  {navItems.map(n => (
                    <NplNavItem key={n.id} label={n.label} icon={n.icon}
                      active={view === n.id || (view === "detail" && n.id === "dashboard")}
                      onClick={() => onNav(n.id)} badge={n.badge} />
                  ))}
                </ul>
              </div>
              <NplDivider />
              <div style={{ padding: "0 4px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#929eaa", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, padding: "0 4px" }}>Quick Stats</div>
                {[{ label: "Open", val: counts.open, color: "#475584" }, { label: "Pending", val: counts.pending, color: "#876019" }, { label: "Unassigned", val: counts.unassigned, color: "#c12c2c" }].map(s => (
                  <div key={s.label} className="de-flex" style={{ justifyContent: "space-between", padding: "5px 4px", fontSize: 13 }}>
                    <span style={{ color: "#929eaa" }}>{s.label}</span>
                    <span style={{ fontWeight: 700, color: s.color }}>{s.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="_npl-dn-l-b">
              <NplButton variant="lighter" fullWidth icon={<HiOutlineArrowLeft />} onClick={() => dispatch({ type: "SET_ROLE", payload: null })}>Sign out</NplButton>
            </div>
          </div>
        </div>
      </div>

      {/* Main content: _npl-dash-right */}
      <div className="_npl-dash-right" style={{ flex: 1, overflow: "auto" }}>
        {children}
      </div>
    </div>
  );
}

//  DASHBOARD 

function Dashboard() {
  const { state, dispatch } = useContext(AppCtx);
  const { tickets, filters, search, role } = state;

  const filtered = useMemo(() => {
    let r = [...tickets];
    if (filters.status !== "all") r = r.filter(t => t.status === filters.status);
    if (filters.priority !== "all") r = r.filter(t => t.priority === filters.priority);
    if (filters.team !== "all") r = r.filter(t => t.assignedTeam === filters.team);
    if (search) r = r.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()));
    const priMap = { critical: 0, high: 1, medium: 2, low: 3 };
    if (filters.sort === "newest") r.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (filters.sort === "oldest") r.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else if (filters.sort === "priority") r.sort((a, b) => (priMap[a.priority] || 9) - (priMap[b.priority] || 9));
    else if (filters.sort === "updated") r.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    return r;
  }, [tickets, filters, search]);

  const sf = (k, v) => dispatch({ type: "SET_FILTER", payload: { [k]: v } });

  return (
    <div>
      {/* Top bar: uses noplin-uis _npl-tbaDta pattern */}
      <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--npl-general-border-color)", background: "#fff", position: "sticky", top: 0, zIndex: 10 }}>
        <div className="de-flex" style={{ alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{role === "requester" ? "My Tickets" : "All Tickets"}</h2>
            <span style={{ fontSize: 13, color: "#6b7280" }}>{filtered.length} ticket{filtered.length !== 1 ? "s" : ""}</span>
          </div>
          <NplButton variant="primary" icon={<HiOutlinePlus />} onClick={() => dispatch({ type: "SET_VIEW", payload: "create" })}>New Ticket</NplButton>
        </div>
        <div className="de-flex gap-10" style={{ flexWrap: "wrap", alignItems: "flex-end" }}>
          {/* noplin-uis search: __npl-hsbr-* */}
          <div className="__npl-hsbr-p-ps" style={{ flex: "1 1 180px", minWidth: 180 }}>
            <span className="__npl-hsbr-SIC" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#888", display: "flex" }}><HiOutlineMagnifyingGlass size={16} /></span>
            <input className="__npl-hsbr-Sin" placeholder="Search tickets…" value={search} onChange={e => dispatch({ type: "SET_SEARCH", payload: e.target.value })} style={{ paddingLeft: 32, width: "100%" }} />
          </div>
          <NplSelect value={filters.status} onChange={e => sf("status", e.target.value)} options={[{ value: "all", label: "All statuses" }, ...["open","pending","resolved","closed"].map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))]} style={{ minWidth: 140 }} />
          <NplSelect value={filters.priority} onChange={e => sf("priority", e.target.value)} options={[{ value: "all", label: "All priorities" }, ...["critical","high","medium","low"].map(p => ({ value: p, label: p.charAt(0).toUpperCase() + p.slice(1) }))]} style={{ minWidth: 140 }} />
          {role !== "requester" && <NplSelect value={filters.team} onChange={e => sf("team", e.target.value)} options={[{ value: "all", label: "All teams" }, ...TEAMS.map(t => ({ value: t, label: t }))]} style={{ minWidth: 130 }} />}
          <NplSelect value={filters.sort} onChange={e => sf("sort", e.target.value)} options={[{ value: "newest", label: "Newest first" }, { value: "oldest", label: "Oldest first" }, { value: "priority", label: "By priority" }, { value: "updated", label: "Last updated" }]} style={{ minWidth: 140 }} />
        </div>
      </div>

      {/* Table: noplin-uis __npl-gentable-* */}
      <div style={{ padding: 20 }}>
        <div className="npl-card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="__npl-gentable-main">
            <table className="__npl-gentable-main-tble">
              <thead className="__npl-gentable-thd">
                <tr>
                  {["Title", "Status", "Priority", "Assignee", "Replies"].map(h => (
                    <th key={h} className="__npl-gentable-th">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0
                  ? <tr><td colSpan={5}><NplEmpty icon={<HiOutlineTicket size={32} />} title="No tickets found" subtitle="Try adjusting your filters or search query" /></td></tr>
                  : filtered.map(t => <TicketRow key={t.id} ticket={t} onClick={() => dispatch({ type: "SELECT_TICKET", payload: t.id })} />)
                }
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div className="__npl-gentable-pgin de-flex">
              <span className="__npl-gentable-pgin-left">Showing {filtered.length} of {tickets.length} tickets</span>
              <div className="__npl-gentable-pgin-right de-flex gap-8">
                <button className="__npl-gentable-pgin-btn" disabled><HiOutlineArrowLeft size={12} style={{ verticalAlign: "middle" }} /> Prev</button>
                <span className="__npl-gentable-pgin-num is-active">1</span>
                <button className="__npl-gentable-pgin-btn" disabled>Next <HiOutlineArrowRight size={12} style={{ verticalAlign: "middle" }} /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

//  TRIAGE QUEUE 

function TriageQueue() {
  const { state, dispatch } = useContext(AppCtx);
  const [assignTarget, setAssignTarget] = useState(null);
  const [assignAgent, setAssignAgent] = useState(AGENTS[0]);

  const triaged = useMemo(() => {
    const priMap = { critical: 0, high: 1, medium: 2, low: 3 };
    return [...state.tickets].filter(t => t.status === "open" || t.status === "pending").sort((a, b) => {
      if (!a.assignedTo && b.assignedTo) return -1;
      if (a.assignedTo && !b.assignedTo) return 1;
      if (priMap[a.priority] !== priMap[b.priority]) return priMap[a.priority] - priMap[b.priority];
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }, [state.tickets]);

  const borderColor = p => ({ critical: "#c12c2c", high: "#D85A30", medium: "#876019", low: "#3B6D11" }[p] || "#ccc");

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}><HiOutlineBolt style={{ verticalAlign: "middle", marginRight: 6 }} /> Smart Triage Queue</h2>
        <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>Sorted: Unassigned → Critical/High priority → Oldest unresolved</p>
      </div>
      {triaged.length === 0
        ? <NplNotification type="success">Queue is clear — all open tickets are assigned!</NplNotification>
        : triaged.map((t, i) => (
          <div key={t.id} className="npl-card" style={{ marginBottom: 10, borderLeft: `4px solid ${borderColor(t.priority)}` }}>
            <div className="npl-card-body">
              <div className="de-flex gap-15" style={{ alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: i === 0 ? "#fff4e5" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: i === 0 ? "#876019" : "#6b7280", flexShrink: 0 }}>#{i + 1}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="de-flex gap-5" style={{ flexWrap: "wrap", marginBottom: 5 }}>
                    <span style={{ fontSize: 11, color: "#888", fontWeight: 600 }}>{t.id}</span>
                    <PriorityBadge priority={t.priority} />
                    <StatusBadge status={t.status} />
                    {!t.assignedTo && <NplBadge variant="warning">Unassigned</NplBadge>}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{t.title}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{t.category} · {t.createdBy} · {fmtDate(t.createdAt)}{t.assignedTo && <> · <strong>→ {t.assignedTo}</strong></>}</div>
                </div>
                <div className="de-flex gap-5" style={{ flexShrink: 0, flexWrap: "wrap", alignItems: "center" }}>
                  <NplButton onClick={() => dispatch({ type: "SELECT_TICKET", payload: t.id })}>View</NplButton>
                  {!t.assignedTo && (
                    assignTarget === t.id
                      ? <><NplSelect value={assignAgent} onChange={e => setAssignAgent(e.target.value)} options={AGENTS.map(a => ({ value: a, label: a }))} /><NplButton variant="primary" onClick={() => { dispatch({ type: "ASSIGN_TICKET", ticketId: t.id, agent: assignAgent, team: "Support" }); setAssignTarget(null); }}>Assign</NplButton><NplButton onClick={() => setAssignTarget(null)}><HiOutlineXMark size={14} /></NplButton></>
                      : <NplButton variant="success" onClick={() => setAssignTarget(t.id)}>Assign <HiOutlineArrowRight size={14} style={{ verticalAlign: "middle" }} /></NplButton>
                  )}
                  {t.status === "open" && <NplButton onClick={() => dispatch({ type: "UPDATE_STATUS", ticketId: t.id, status: "pending" })}>Mark Pending</NplButton>}
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

//  TICKET DETAIL 

function TicketDetail() {
  const { state, dispatch } = useContext(AppCtx);
  const ticket = state.tickets.find(t => t.id === state.selectedTicketId);
  const [reply, setReply] = useState("");
  const [assignAgent, setAssignAgent] = useState(ticket?.assignedTo || AGENTS[0]);
  const [showAssign, setShowAssign] = useState(false);
  const { role } = state;

  if (!ticket) return <NplEmpty icon={<HiOutlineTicket size={32} />} title="Ticket not found" subtitle="" />;

  const submit = () => { if (!reply.trim()) return; dispatch({ type: "ADD_REPLY", ticketId: ticket.id, body: reply }); setReply(""); };
  const historyIcons = { created: <HiOutlinePlusCircle size={14} style={{ verticalAlign: "middle" }} />, reply: <HiOutlineChatBubbleLeft size={14} style={{ verticalAlign: "middle" }} />, status: <HiOutlineArrowPath size={14} style={{ verticalAlign: "middle" }} />, assigned: <HiOutlineUser size={14} style={{ verticalAlign: "middle" }} /> };

  return (
    <div>
      <div style={{ background: "#fff", borderBottom: "1px solid var(--npl-general-border-color)", padding: "14px 20px", position: "sticky", top: 0, zIndex: 10 }}>
        <div className="de-flex gap-10" style={{ alignItems: "center", marginBottom: 12 }}>
          <NplButton onClick={() => dispatch({ type: "SET_VIEW", payload: "dashboard" })} icon={<HiOutlineArrowLeft />}>Back</NplButton>
          <span style={{ color: "#bbb" }}>/</span>
          <span style={{ fontSize: 13, color: "#888" }}>{ticket.id}</span>
        </div>
        <div className="de-flex" style={{ alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>{ticket.title}</h1>
            <div className="de-flex gap-5" style={{ flexWrap: "wrap" }}>
              <StatusBadge status={ticket.status} />
              <PriorityBadge priority={ticket.priority} />
              <NplBadge>{ticket.category}</NplBadge>
              {ticket.assignedTeam && <NplBadge variant="info">{ticket.assignedTeam}</NplBadge>}
            </div>
          </div>
          {(role === "agent" || role === "manager") && (
            <div className="de-flex gap-5">
              <NplSelect value={ticket.status} onChange={e => dispatch({ type: "UPDATE_STATUS", ticketId: ticket.id, status: e.target.value })} options={["open","pending","resolved","closed"].map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))} />
              <NplButton onClick={() => setShowAssign(!showAssign)}><HiOutlineUser size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> Assign</NplButton>
            </div>
          )}
        </div>
        {showAssign && (
          <div className="de-flex gap-10" style={{ alignItems: "center", marginTop: 12, background: "#f9f9f9", padding: 12, borderRadius: 6 }}>
            <span style={{ fontSize: 13 }}>Assign to:</span>
            <NplSelect value={assignAgent} onChange={e => setAssignAgent(e.target.value)} options={AGENTS.map(a => ({ value: a, label: a }))} />
            <NplButton variant="primary" onClick={() => { dispatch({ type: "ASSIGN_TICKET", ticketId: ticket.id, agent: assignAgent, team: ticket.assignedTeam || "Support" }); setShowAssign(false); }}>Confirm</NplButton>
            <NplButton onClick={() => setShowAssign(false)}>Cancel</NplButton>
          </div>
        )}
      </div>

      <div className="npl-row" style={{ padding: 20, margin: 0, alignItems: "flex-start" }}>
        {/* Main thread */}
        <div className="npl-col-8 npl-col-tb-12 npl-col-mb-12" style={{ paddingLeft: 0 }}>
          <NplCard style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>Original Request · {fmtDate(ticket.createdAt)}</div>
            <div style={{ fontSize: 14, lineHeight: 1.7 }}>{ticket.description}</div>
          </NplCard>

          {ticket.messages.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#929eaa", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Conversation</div>
              {ticket.messages.map(m => (
                <div key={m.id} className="de-flex gap-10" style={{ marginBottom: 14, alignItems: "flex-start" }}>
                  <NplAvatar name={m.author} size={34} />
                  <div style={{ flex: 1 }}>
                    <div className="de-flex gap-5" style={{ alignItems: "center", marginBottom: 5 }}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{m.author}</span>
                      <NplBadge variant={m.role === "agent" ? "green" : m.role === "manager" ? "warning" : "info"}>{m.role}</NplBadge>
                      <span style={{ fontSize: 12, color: "#bbb" }}>{fmtDate(m.createdAt)}</span>
                    </div>
                    <NplCard style={{ margin: 0 }}>
                      <div style={{ padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>{m.body}</div>
                    </NplCard>
                  </div>
                </div>
              ))}
            </div>
          )}

          {ticket.status !== "closed" && (
            <NplCard>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#929eaa", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Add Reply</div>
              <NplTextarea value={reply} onChange={e => setReply(e.target.value)} placeholder="Type your reply…" rows={4} />
              <div className="de-flex" style={{ justifyContent: "flex-end", marginTop: 10 }}>
                <NplButton variant="primary" onClick={submit} disabled={!reply.trim()}>Send Reply</NplButton>
              </div>
            </NplCard>
          )}
        </div>

        {/* Sidebar */}
        <div className="npl-col-4 npl-col-tb-12 npl-col-mb-12" style={{ paddingRight: 0 }}>
          <NplCard style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#929eaa", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Ticket Info</div>
            {[{ label: "ID", val: ticket.id }, { label: "Created by", val: ticket.createdBy }, { label: "Assignee", val: ticket.assignedTo || "—" }, { label: "Team", val: ticket.assignedTeam || "—" }, { label: "Created", val: fmtDate(ticket.createdAt) }, { label: "Updated", val: fmtDate(ticket.updatedAt) }].map(r => (
              <div key={r.label} className="de-flex" style={{ justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--npl-general-border-color)", fontSize: 13 }}>
                <span style={{ color: "#888" }}>{r.label}</span>
                <span style={{ fontWeight: 600 }}>{r.val}</span>
              </div>
            ))}
          </NplCard>

          {/* Activity Timeline — noplin-uis __npl-pro-timeline-list */}
          <NplCard>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#929eaa", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Activity Timeline</div>
            <ul className="__npl-pro-timeline-list" style={{ margin: 0, paddingLeft: 0 }}>
              {ticket.history.map((h, i) => (
                <li key={i} className="__npl-pro-timeline-list-item" style={{ paddingLeft: 22, marginBottom: 14, position: "relative" }}>
                  <div className="__npl-pro-timeline-list-title" style={{ fontSize: 13, color: "#22232a", marginBottom: 3 }}>
                    <span style={{ marginRight: 5 }}>{historyIcons[h.type] || "•"}</span>{h.detail}
                  </div>
                  <div className="__npl-pro-timeline-list-content" style={{ fontSize: 11, color: "#929eaa" }}>{h.by} · {fmtDate(h.at)}</div>
                </li>
              ))}
            </ul>
          </NplCard>
        </div>
      </div>
    </div>
  );
}

//  CREATE TICKET 

function CreateTicket() {
  const { dispatch } = useContext(AppCtx);
  const [form, setForm] = useState({ title: "", description: "", category: CATEGORIES[0], priority: "medium", assignedTeam: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ padding: 24, maxWidth: 640, margin: "0 auto" }}>
      <div className="de-flex gap-10" style={{ alignItems: "center", marginBottom: 24 }}>
        <NplButton onClick={() => dispatch({ type: "SET_VIEW", payload: "dashboard" })} icon={<HiOutlineArrowLeft />}>Back</NplButton>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Create New Ticket</h2>
      </div>
      <NplCard>
        {/* noplin-uis form: __npl-form-gfld-a */}
        <div className="__npl-form-gfld-a">
          <NplInput label="Title *" value={form.title} onChange={e => set("title", e.target.value)} placeholder="Brief description of the issue…" />
        </div>
        <div className="__npl-form-gfld-a">
          <NplTextarea label="Description *" value={form.description} onChange={e => set("description", e.target.value)} placeholder="Steps to reproduce, expected behavior, screenshots…" rows={6} />
        </div>
        <div className="npl-row">
          <div className="npl-col-6 npl-col-mb-12">
            <div className="__npl-form-gfld-a">
              <NplSelect label="Category" value={form.category} onChange={e => set("category", e.target.value)} options={CATEGORIES.map(c => ({ value: c, label: c }))} style={{ width: "100%" }} />
            </div>
          </div>
          <div className="npl-col-6 npl-col-mb-12">
            <div className="__npl-form-gfld-a">
              <NplSelect label="Priority" value={form.priority} onChange={e => set("priority", e.target.value)} options={["low","medium","high","critical"].map(p => ({ value: p, label: p.charAt(0).toUpperCase() + p.slice(1) }))} style={{ width: "100%" }} />
            </div>
          </div>
        </div>
        <div className="__npl-form-gfld-a">
          <NplSelect label="Team (optional)" value={form.assignedTeam} onChange={e => set("assignedTeam", e.target.value)} options={[{ value: "", label: "Let system decide" }, ...TEAMS.map(t => ({ value: t, label: t }))]} style={{ width: "100%" }} />
        </div>
        <NplDivider />
        <div className="de-flex" style={{ justifyContent: "space-between" }}>
          <NplButton onClick={() => dispatch({ type: "SET_VIEW", payload: "dashboard" })}>Cancel</NplButton>
          <NplButton variant="primary" disabled={!form.title.trim() || !form.description.trim()}
            onClick={() => { if (form.title.trim() && form.description.trim()) dispatch({ type: "CREATE_TICKET", payload: { ...form, assignedTo: null } }); }}>
            Submit Ticket
          </NplButton>
        </div>
      </NplCard>
    </div>
  );
}

//  ROOT 

export default function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  if (!state.role) return (
    <AppCtx.Provider value={{ state, dispatch }}>
      <LoginPage />
    </AppCtx.Provider>
  );

  return (
    <AppCtx.Provider value={{ state, dispatch }}>
      <AppLayout>
        {state.view === "dashboard" && <Dashboard />}
        {state.view === "triage" && <TriageQueue />}
        {state.view === "detail" && <TicketDetail />}
        {state.view === "create" && <CreateTicket />}
      </AppLayout>
    </AppCtx.Provider>
  );
}