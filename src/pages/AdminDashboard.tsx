import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users, Mail, ShieldCheck, LogOut, Activity, Download, LayoutList, LayoutGrid } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
}

interface LoginAttempt {
  id: string;
  ip_address: string;
  attempted_at: string;
  was_successful: boolean;
}

interface InvestorSession {
  id: string;
  created_at: string;
  expires_at: string;
  token: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const [sessions, setSessions] = useState<InvestorSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "contacts" | "logins" | "sessions">("overview");
  const [contactView, setContactView] = useState<"list" | "card">("list");

  useEffect(() => {
    const pw = sessionStorage.getItem("adminAuth");
    if (!pw) {
      navigate("/admin", { replace: true });
      return;
    }
    fetchData(pw);
  }, []);

  const fetchData = async (password?: string) => {
    const pw = password || sessionStorage.getItem("adminAuth");
    if (!pw) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-data", {
        body: { password: pw },
      });
      if (error) throw error;
      setContacts(data.contacts || []);
      setLoginAttempts(data.loginAttempts || []);
      setSessions(data.sessions || []);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/admin", { replace: true });
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
    });

  const downloadCSV = () => {
    const headers = ["Name", "Email", "Company", "Message", "Date"];
    const escapeCSV = (val: string) => `"${val.replace(/"/g, '""')}"`;
    const rows = contacts.map(c => [
      escapeCSV(c.name),
      escapeCSV(c.email),
      escapeCSV(c.company || ""),
      escapeCSV(c.message),
      escapeCSV(formatDate(c.created_at)),
    ].join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contact-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const successfulLogins = loginAttempts.filter(a => a.was_successful).length;
  const failedLogins = loginAttempts.filter(a => !a.was_successful).length;
  const activeSessions = sessions.filter(s => new Date(s.expires_at) > new Date()).length;

  const tabs = [
    { key: "overview" as const, label: "Overview" },
    { key: "contacts" as const, label: "Contact Submissions" },
    { key: "logins" as const, label: "Login Attempts" },
    { key: "sessions" as const, label: "Active Sessions" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Filmology Labs Admin</h1>
          <p className="text-sm text-muted-foreground">Analytics & CRM Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => fetchData()}>Refresh</Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <div className="border-b border-border bg-card px-6">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={<Mail className="w-5 h-5 text-primary" />} value={contacts.length} label="Contact Submissions" bgClass="bg-primary/10" />
              <StatCard icon={<ShieldCheck className="w-5 h-5 text-green-600" />} value={successfulLogins} label="Successful Logins" bgClass="bg-green-500/10" />
              <StatCard icon={<Activity className="w-5 h-5 text-destructive" />} value={failedLogins} label="Failed Logins" bgClass="bg-destructive/10" />
              <StatCard icon={<Users className="w-5 h-5 text-blue-600" />} value={activeSessions} label="Active Sessions" bgClass="bg-blue-500/10" />
            </div>

            <Card>
              <CardHeader><CardTitle className="text-base">Recent Contact Submissions</CardTitle></CardHeader>
              <CardContent>
                {contacts.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-4 text-center">No submissions yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Company</TableHead><TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.slice(0, 5).map(c => (
                        <TableRow key={c.id}>
                          <TableCell className="font-medium">{c.name}</TableCell>
                          <TableCell>{c.email}</TableCell>
                          <TableCell>{c.company || "—"}</TableCell>
                          <TableCell className="text-muted-foreground">{formatDate(c.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">Recent Login Attempts</CardTitle></CardHeader>
              <CardContent>
                {loginAttempts.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-4 text-center">No login attempts recorded.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>IP Address</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loginAttempts.slice(0, 5).map(a => (
                        <TableRow key={a.id}>
                          <TableCell className="font-mono text-sm">{a.ip_address}</TableCell>
                          <TableCell><StatusBadge success={a.was_successful} /></TableCell>
                          <TableCell className="text-muted-foreground">{formatDate(a.attempted_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === "contacts" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="text-base">All Contact Submissions ({contacts.length})</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-border rounded-md overflow-hidden">
                    <button
                      onClick={() => setContactView("list")}
                      className={`p-2 transition-colors ${contactView === "list" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
                      title="List view"
                    >
                      <LayoutList className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setContactView("card")}
                      className={`p-2 transition-colors ${contactView === "card" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
                      title="Card view"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                  </div>
                  <Button variant="outline" size="sm" onClick={downloadCSV} disabled={contacts.length === 0}>
                    <Download className="w-4 h-4 mr-1" /> Download CSV
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {contacts.length === 0 ? (
                <p className="text-muted-foreground text-sm py-8 text-center">No submissions yet.</p>
              ) : contactView === "list" ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Company</TableHead><TableHead>Message</TableHead><TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map(c => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium whitespace-nowrap">{c.name}</TableCell>
                        <TableCell className="whitespace-nowrap">{c.email}</TableCell>
                        <TableCell>{c.company || "—"}</TableCell>
                        <TableCell className="max-w-xs truncate">{c.message}</TableCell>
                        <TableCell className="text-muted-foreground whitespace-nowrap">{formatDate(c.created_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contacts.map(c => (
                    <Card key={c.id} className="border border-border">
                      <CardContent className="pt-5 space-y-2">
                        <div className="flex items-start justify-between">
                          <p className="font-semibold text-foreground">{c.name}</p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{formatDate(c.created_at)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{c.email}</p>
                        {c.company && <p className="text-sm text-muted-foreground">🏢 {c.company}</p>}
                        <p className="text-sm text-foreground/80 pt-1 border-t border-border mt-2 line-clamp-4">{c.message}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "logins" && (
          <Card>
            <CardHeader><CardTitle className="text-base">Login Attempts ({loginAttempts.length})</CardTitle></CardHeader>
            <CardContent>
              {loginAttempts.length === 0 ? (
                <p className="text-muted-foreground text-sm py-8 text-center">No login attempts recorded.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>IP Address</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loginAttempts.map(a => (
                      <TableRow key={a.id}>
                        <TableCell className="font-mono text-sm">{a.ip_address}</TableCell>
                        <TableCell><StatusBadge success={a.was_successful} /></TableCell>
                        <TableCell className="text-muted-foreground">{formatDate(a.attempted_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "sessions" && (
          <Card>
            <CardHeader><CardTitle className="text-base">Investor Sessions ({sessions.length})</CardTitle></CardHeader>
            <CardContent>
              {sessions.length === 0 ? (
                <p className="text-muted-foreground text-sm py-8 text-center">No sessions recorded.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token</TableHead><TableHead>Status</TableHead><TableHead>Created</TableHead><TableHead>Expires</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map(s => {
                      const isActive = new Date(s.expires_at) > new Date();
                      return (
                        <TableRow key={s.id}>
                          <TableCell className="font-mono text-sm">{s.token.slice(0, 16)}...</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              isActive ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"
                            }`}>
                              {isActive ? "Active" : "Expired"}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{formatDate(s.created_at)}</TableCell>
                          <TableCell className="text-muted-foreground">{formatDate(s.expires_at)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, value, label, bgClass }: { icon: React.ReactNode; value: number; label: string; bgClass: string }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${bgClass}`}>{icon}</div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const StatusBadge = ({ success }: { success: boolean }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
    success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }`}>
    {success ? "Success" : "Failed"}
  </span>
);

export default AdminDashboard;
