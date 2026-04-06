import { HiOutlineArrowDown, HiOutlineArrowRight, HiOutlineArrowUp, HiOutlineChevronDoubleUp } from "react-icons/hi2";
import NplBadge from "../ui/NplBadge";

const STATUS_VARIANT = {
  open: "open",
  pending: "pending",
  resolved: "resolved",
  closed: "closed",
};

const STATUS_LABEL = {
  open: "Open",
  pending: "Pending",
  resolved: "Resolved",
  closed: "Closed",
};

export function StatusBadge({ status }) {
  return (
    <NplBadge variant={STATUS_VARIANT[status] ?? "default"}>
      {STATUS_LABEL[status] ?? status}
    </NplBadge>
  );
}

const PRIORITY_ICON = { low: <HiOutlineArrowDown style={{ verticalAlign: "middle" }} />, medium: <HiOutlineArrowRight style={{ verticalAlign: "middle" }} />, high: <HiOutlineArrowUp style={{ verticalAlign: "middle" }} />, critical: <HiOutlineChevronDoubleUp style={{ verticalAlign: "middle" }} /> };

export function PriorityBadge({ priority }) {
  return (
    <NplBadge variant={priority}>
      {PRIORITY_ICON[priority]} {priority}
    </NplBadge>
  );
}
