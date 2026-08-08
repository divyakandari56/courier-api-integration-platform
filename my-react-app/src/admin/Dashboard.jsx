import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    fetch("http://localhost:5000/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load users");
        }
        return response.json();
      })
      .then((data) => {
        if (!active) return;
        setUsers(data);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Unable to load users");
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const totalUsers = users.length;
  const activeUsers = Math.max(1, Math.floor(totalUsers * 0.85));
  const recentUsers = users.slice(0, 5);

  return (
   <div className="dashboard-layout">
 
     <aside className="sidebar">
       <div className="sidebar-brand">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="brand-icon"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
         <h2>Admin Panel</h2>
       </div>
 
       <ul className="sidebar-menu">
         <li>
           <Link to="/delhivery">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2" ry="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
             <span>Delhivery Portal</span>
           </Link>
         </li>
 
         <li>
           <Link to="/xpressbees">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2" ry="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
             <span>XpressBees Portal</span>
           </Link>
         </li>
 
         <li className="coming-soon">
           <Link to="#" onClick={(e) => e.preventDefault()}>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
             <span>Rivigo (Soon)</span>
           </Link>
         </li>
 
         <li className="coming-soon">
           <Link to="#" onClick={(e) => e.preventDefault()}>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/></svg>
             <span>DP World (Soon)</span>
           </Link>
         </li>
       </ul>
     </aside>    
     <main className="dashboard-page">
       <header className="dashboard-header">
         <div>
           <p className="dashboard-eyebrow">Admin Dashboard</p>
           <h1>System Control</h1>
           <p className="dashboard-copy">
             Review the latest user activity and system stats for your project.
           </p>
         </div>
       </header>
 
       <section className="dashboard-grid">
         <div className="dashboard-card">
           <div className="card-header">
             <p>Total users</p>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
           </div>
           <strong>{totalUsers}</strong>
         </div>
         <div className="dashboard-card">
           <div className="card-header">
             <p>Active users</p>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
           </div>
           <strong>{activeUsers}</strong>
         </div>
         <div className="dashboard-card">
           <div className="card-header">
             <p>Backend Connection</p>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
           </div>
           <strong className={error ? "status-offline" : "status-online"}>
             {error ? "Offline" : "Online"}
           </strong>
         </div>
         <div className="dashboard-card">
           <div className="card-header">
             <p>Recent login</p>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
           </div>
           <strong>Just now</strong>
         </div>
       </section>

      <section className="dashboard-panel">
        <div className="panel-heading">
          <div>
            <h2>Recent users</h2>
            <p>Latest profile activity from the backend.</p>
          </div>
          <span>{loading ? "Refreshing..." : `${recentUsers.length} shown`}</span>
        </div>

        {loading ? (
          <p className="dashboard-message">Loading user data…</p>
        ) : error ? (
          <p className="dashboard-error">{error}</p>
        ) : (
          <div className="table-container">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.user_id || user.id || user.email}>
                    <td>{user.user_id ?? user.id ?? "—"}</td>
                    <td>{user.username ?? user.name ?? "—"}</td>
                    <td>{user.email ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
</div>
  );
}

export default Dashboard;
