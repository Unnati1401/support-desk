export function NplDivider({ style }) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--npl-general-border-color)",
        margin: "12px 0",
        ...style,
      }}
    />
  );
}

export function NplEmpty({ icon, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 24px", color: "#888" }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontWeight: 600, color: "#444", marginBottom: 6 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 13 }}>{subtitle}</div>}
    </div>
  );
}


export function NplNavItem({ label, icon, active, onClick, badge }) {
  return (
    <li className="__npl-mnl-23-item _am-2">
      <a
        className={`__npl-mnl-23-link _am-2 _As2 _am-21${active ? " active" : ""}`}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <div className="__npl-mnl-23-content">
          <span className="__npl-mnl-23-icon" style={{ fontSize: 16, marginRight: 10 }}>
            {icon}
          </span>
          <span className="__npl-mnl-23-text">{label}</span>
          {badge !== undefined && (
            <span className="__npl-mnl-23-badge">{badge}</span>
          )}
        </div>
      </a>
    </li>
  );
}
