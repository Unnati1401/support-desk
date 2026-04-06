import { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { prioritySortValue } from "../utils/helpers";

export function useTickets() {
  const { state } = useAppContext();
  const { tickets, filters, search } = state;

  const filtered = useMemo(() => {
    let result = [...tickets];

    if (filters.status !== "all")
      result = result.filter((t) => t.status === filters.status);

    if (filters.priority !== "all")
      result = result.filter((t) => t.priority === filters.priority);

    if (filters.team !== "all")
      result = result.filter((t) => t.assignedTeam === filters.team);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q) ||
          t.createdBy.toLowerCase().includes(q)
      );
    }

    if (filters.sort === "newest")
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (filters.sort === "oldest")
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else if (filters.sort === "priority")
      result.sort(
        (a, b) => prioritySortValue(a.priority) - prioritySortValue(b.priority)
      );
    else if (filters.sort === "updated")
      result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return result;
  }, [tickets, filters, search]);

  return { filtered, total: tickets.length };
}

export function useTicketById(id) {
  const { state } = useAppContext();
  return state.tickets.find((t) => t.id === id) ?? null;
}

export function useTicketCounts() {
  const { state } = useAppContext();
  const { tickets } = state;
  return useMemo(
    () => ({
      total: tickets.length,
      open: tickets.filter((t) => t.status === "open").length,
      pending: tickets.filter((t) => t.status === "pending").length,
      resolved: tickets.filter((t) => t.status === "resolved").length,
      closed: tickets.filter((t) => t.status === "closed").length,
      unassigned: tickets.filter((t) => !t.assignedTo && t.status === "open").length,
    }),
    [tickets]
  );
}

export function useTriageQueue() {
  const { state } = useAppContext();

  return useMemo(() => {
    return [...state.tickets]
      .filter((t) => t.status === "open" || t.status === "pending")
      .sort((a, b) => {
        // Unassigned first
        if (!a.assignedTo && b.assignedTo) return -1;
        if (a.assignedTo && !b.assignedTo) return 1;
        // Then by priority
        const pd = prioritySortValue(a.priority) - prioritySortValue(b.priority);
        if (pd !== 0) return pd;
        // Then oldest first
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
  }, [state.tickets]);
}
