import { useAppContext } from "./context/AppContext";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TicketDetailPage from "./pages/TicketDetailPage";
import CreateTicketPage from "./pages/CreateTicketPage";
import TriagePage from "./pages/TriagePage";

const PAGE_MAP = {
  dashboard: <DashboardPage />,
  detail:    <TicketDetailPage />,
  create:    <CreateTicketPage />,
  triage:    <TriagePage />,
};

function AuthenticatedApp() {
  const { state } = useAppContext();
  const page = PAGE_MAP[state.view] ?? <DashboardPage />;

  return <AppLayout>{page}</AppLayout>;
}

export default function App() {
  const { state } = useAppContext();

  if (!state.role) return <LoginPage />;
  return <AuthenticatedApp />;
}
