import { createContext, useContext, useReducer } from "react";
import { mkId, now } from "../utils/helpers";
import INITIAL_TICKETS from "../data/seedTickets";

//  CONTEXT 

export const AppContext = createContext(null);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
};

//  INITIAL STATE 

const initialState = {
  role: null,
  currentUser: "You",
  view: "login",
  selectedTicketId: null,
  tickets: INITIAL_TICKETS,
  filters: {
    status: "all",
    priority: "all",
    team: "all",
    sort: "newest",
  },
  search: "",
};

//  REDUCER 

function appReducer(state, action) {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.payload, view: "dashboard" };

    case "SET_VIEW":
      return { ...state, view: action.payload, selectedTicketId: null };

    case "SELECT_TICKET":
      return { ...state, selectedTicketId: action.payload, view: "detail" };

    case "CREATE_TICKET": {
      const newTicket = {
        ...action.payload,
        id: `TK-${String(state.tickets.length + 1).padStart(3, "0")}`,
        status: "open",
        assignedTo: null,
        createdBy: state.currentUser,
        createdAt: now(),
        updatedAt: now(),
        messages: [],
        history: [
          { type: "created", by: state.currentUser, at: now(), detail: "Ticket created" },
        ],
      };
      return {
        ...state,
        tickets: [newTicket, ...state.tickets],
        view: "dashboard",
      };
    }

    case "ADD_REPLY":
      return {
        ...state,
        tickets: state.tickets.map((t) =>
          t.id !== action.ticketId
            ? t
            : {
                ...t,
                updatedAt: now(),
                messages: [
                  ...t.messages,
                  {
                    id: mkId(),
                    author: state.currentUser,
                    role: state.role,
                    body: action.body,
                    createdAt: now(),
                  },
                ],
                history: [
                  ...t.history,
                  { type: "reply", by: state.currentUser, at: now(), detail: "Reply added" },
                ],
              }
        ),
      };

    case "UPDATE_STATUS":
      return {
        ...state,
        tickets: state.tickets.map((t) =>
          t.id !== action.ticketId
            ? t
            : {
                ...t,
                status: action.status,
                updatedAt: now(),
                history: [
                  ...t.history,
                  {
                    type: "status",
                    by: state.currentUser,
                    at: now(),
                    detail: `Status changed to ${action.status}`,
                  },
                ],
              }
        ),
      };

    case "ASSIGN_TICKET":
      return {
        ...state,
        tickets: state.tickets.map((t) =>
          t.id !== action.ticketId
            ? t
            : {
                ...t,
                assignedTo: action.agent,
                assignedTeam: action.team,
                updatedAt: now(),
                history: [
                  ...t.history,
                  {
                    type: "assigned",
                    by: state.currentUser,
                    at: now(),
                    detail: `Assigned to ${action.agent || action.team}`,
                  },
                ],
              }
        ),
      };

    case "SET_FILTER":
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case "SET_SEARCH":
      return { ...state, search: action.payload };

    default:
      return state;
  }
}

//  PROVIDER 

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
