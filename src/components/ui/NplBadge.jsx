const VARIANT_CLASS = {
  default:  "",
  green:    "_nmcls-2 public",
  warning:  "_pending",
  danger:   "personal",
  info:     "_ansp",
  open:     "_ansp",
  pending:  "_pending",
  resolved: "_nmcls-2 public",
  closed:   "",
  low:      "_nmcls-2 public",
  medium:   "_pending",
  high:     "personal",
  critical: "business",
};

export default function NplBadge({ children, variant = "default", style }) {
  const cls = VARIANT_CLASS[variant] ?? "";
  return (
    <span className={`rpt-bdg ${cls}`} style={style}>
      {children}
    </span>
  );
}
