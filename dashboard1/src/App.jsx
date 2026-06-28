import { useState, useEffect, useCallback } from "react";
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import StatCard from "./components/StatCard.jsx";
import PieChart from "./components/PieChart.jsx";
import LineGraph from "./components/LineGraph.jsx";
import ApplicationsTable from "./components/ApplicationsTable.jsx";
import EditModal from "./components/EditModal.jsx";
import DeleteDialog from "./components/DeleteDialog.jsx";
import AddApplicationModal from "./components/AddApplicationModal.jsx";
import Toast from "./components/Toast.jsx";
import { fetchApplications, addApplication, updateApplication, deleteApplication } from "./lib/supabase.js";
import AT1 from "./components/AT1.jsx";
import { FileText, Clock3, Users, Briefcase, CircleX } from "lucide-react";


export default function App() {
  
  const [authed, setAuthed] = useState(() => localStorage.getItem("jt_auth") === "1");
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState(null);

  const notify = (message, type = "success") => setToast({ message, type });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchApplications();
      setApps(data);
    } catch (e) {
      notify("Failed to load applications", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (authed) load(); }, [authed, load]);

  const handleAdd = async (form) => {
    try {
      await addApplication(form);
      await load();
      setShowAdd(false);
      notify("✅ Application added!");
    } catch {
      notify("Failed to add application", "error");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateApplication(id, { status });
      setApps(a => a.map(r => r.id === id ? { ...r, status } : r));
    } catch {
      notify("Failed to update status", "error");
    }
  };

  const handleEdit = async (form) => {
    const { id, created_at, ...body } = form;
    try {
      await updateApplication(id, body);
      setApps(a => a.map(r => r.id === id ? { ...r, ...body } : r));
      setEditTarget(null);
      notify("✅ Application updated!");
    } catch {
      notify("Failed to update", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteApplication(deleteTarget.id);
      setApps(a => a.filter(r => r.id !== deleteTarget.id));
      setDeleteTarget(null);
      notify("Application deleted");
    } catch {
      notify("Failed to delete", "error");
    }
  };

  const stats = {
    total:      apps.length,
    underReview: apps.filter(a => a.status === "Under Review" || a.status === "Applied").length,
    interviews: apps.filter(a => a.status === "Interview" || a.status === "Scheduled").length,
    offers:     apps.filter(a => a.status === "Accepted" || a.status === "Offer").length,
    rejections: apps.filter(a => a.status === "Rejected").length,
  };

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0D1117",
        fontFamily: "'Inter', sans-serif",
        color: "#E6EDF3",
      }}
    >
      <Toast
        message={toast?.message}
        type={toast?.type}
        onDone={() => setToast(null)}
      />

      {editTarget && (
        <EditModal
          row={editTarget}
          onSave={handleEdit}
          onCancel={() => setEditTarget(null)}
        />
      )}
      {deleteTarget && (
        <DeleteDialog
          company={deleteTarget.company}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      {showAdd && (
        <AddApplicationModal
          onSave={handleAdd}
          onCancel={() => setShowAdd(false)}
        />
      )}

      <Header
        search={search}
        onSearchChange={setSearch}
        onLogout={() => {
          localStorage.removeItem("jt_auth");
          setAuthed(false);
        }}
      />

      {/* Add application button */}
      <div
        style={{
          padding: "20px 32px 0",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={() => setShowAdd(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "9px 18px",
            borderRadius: 10,
            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
            whiteSpace: "nowrap",
          }}
        >
          + Add Application
        </button>
      </div>

      <div
        style={{
          padding: "28px 36px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Stat cards row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          <StatCard
            icon={<FileText size={24} />}
            label="Total Applications"
            value={stats.total}
            color="#6366F1"
            bg="rgba(99,102,241,0.15)"
            trend={12}
          />

          <StatCard
            icon={<Users size={24} />}
            label="Interviews"
            value={stats.interviews}
            color="#8B5CF6"
            bg="rgba(139,92,246,0.15)"
            trend={25}
          />
          <StatCard
            icon={<Briefcase size={24} />}
            label="Offers"
            value={stats.offers}
            color="#10B981"
            bg="rgba(16,185,129,0.15)"
            trend={100}
          />
          <StatCard
            icon={<CircleX size={24} />}
            label="Rejections"
            value={stats.rejections}
            color="#EF4444"
            bg="rgba(239,68,68,0.15)"
            trend={7}
          />
        </div>

        {/* Charts row */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <PieChart apps={apps} />
          <LineGraph apps={apps} />
        </div>

        {/* Table */}
        {loading ? (
          <div
            style={{
              color: "#8B949E",
              textAlign: "center",
              padding: "48px 0",
              fontSize: 14,
            }}
          >
            Loading applications...
          </div>
        ) : (
          <ApplicationsTable
            apps={apps}
            onSearchChange={setSearch}
            search={search}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
            onStatusChange={handleStatusChange}
            onEdit={setEditTarget}
            onDelete={setDeleteTarget}
          />
        )}
      </div>
    </div>
  );
}
