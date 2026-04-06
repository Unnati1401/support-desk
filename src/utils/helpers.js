export const mkId = () => Math.random().toString(36).slice(2, 8).toUpperCase();

export const now = () => new Date().toISOString();

export const ago = (hours) => new Date(Date.now() - hours * 3600000).toISOString();

export const fmtDate = (iso) => {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

export const prioritySortValue = (priority) =>
  ({ critical: 0, high: 1, medium: 2, low: 3 }[priority] ?? 9);

/**
 * Converts simple {value, label} options into noplin-uis DropDown `list` format.
 * @param {Array<{value: string, label: string}>} options
 * @param {(value: string) => void} onSelect - called with the selected value
 */
export const toDropDownList = (options, onSelect) =>
  options.map((o) => ({
    category: "",
    label: o.label,
    icon: "",
    data_object: { value: o.value },
    onClick: (data) => onSelect(data.value),
  }));
