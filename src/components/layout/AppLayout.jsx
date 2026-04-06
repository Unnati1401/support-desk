import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="de-flex" style={{ height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <div className="_npl-dash-right" style={{ flex: 1, overflow: "auto" }}>
        {children}
      </div>
    </div>
  );
}
