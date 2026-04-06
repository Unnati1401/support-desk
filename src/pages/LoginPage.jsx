import { NoplinCard, NoplinCardBodyArea } from "noplin-uis";
import { HiOutlineTicket, HiOutlineUser, HiOutlinePhone, HiOutlineCog6Tooth } from "react-icons/hi2";
import { useAppContext } from "../context/AppContext";

const ROLES = [
  {
    id:   "requester",
    label: "Requester",
    desc:  "Create and track your support tickets",
    icon:  <HiOutlineUser size={22} />,
  },
  {
    id:   "agent",
    label: "Support Agent",
    desc:  "View and resolve tickets assigned to you",
    icon:  <HiOutlinePhone size={22} />,
  },
  {
    id:   "manager",
    label: "Manager / Admin",
    desc:  "Full access - all tickets, teams & assignments",
    icon:  <HiOutlineCog6Tooth size={22} />,
  },
];

export default function LoginPage() {
  const { dispatch } = useAppContext();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background-color, #f2f3f0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 460 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "var(--meeedly-button-background, #475584)",
              borderRadius: 10,
              padding: "10px 20px",
              marginBottom: 20,
            }}
          >
            <HiOutlineTicket size={20} color="#fff" />
            <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
              SupportDesk
            </span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#22232a", margin: "0 0 8px" }}>
            Sign in to your workspace
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
            Select your role to continue
          </p>
        </div>

        {/* Role cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ROLES.map((r) => (
            <NoplinCard
              key={r.id}
              onClick={() => dispatch({ type: "SET_ROLE", payload: r.id })}
              style={{ cursor: "pointer" }}
            >
              <NoplinCardBodyArea>
                <div className="de-flex gap-15" style={{ alignItems: "center" }}>
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 10,
                      background: "#eef0f8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    {r.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ fontSize: 15, fontWeight: 700, color: "#22232a", marginBottom: 3 }}
                    >
                      {r.label}
                    </div>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>{r.desc}</div>
                  </div>
                  <span style={{ color: "#bbb", fontSize: 20 }}>›</span>
                </div>
              </NoplinCardBodyArea>
            </NoplinCard>
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#b4b2a9", marginTop: 24 }}>
          Demo environment - no authentication required
        </p>
      </div>
    </div>
  );
}
