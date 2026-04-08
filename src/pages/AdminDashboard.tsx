import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users, Mail, ShieldCheck, LogOut, Clock, Activity } from "lucide-react";

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

  useEffect(() => {
    if (!sessionStorage.getItem("adminAuth")) {
      navigate("/admin", { replace: true });
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [contactsRes, loginsRes, sessionsRes] = await Promise.all([
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(100),
        supabase.from("login_attempts").select("*").order("attempted_at", { ascending: false }).limit(100),
        supabase.from("investor_sessions").select("*").order("created_at", { ascending: false }).limit(100),
      ]);

      if (contactsRes.data) setContacts(contactsRes.data);
      if (loginsRes.data) setLoginAttempts(loginsRes.data);
      if (sessionsRes.data) setSessions(sessionsRes.data);
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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
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
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Filmology Labs Admin</h1>
          <p className="text-sm text-muted-foreground">Analytics & CRM Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={fetchData}>Refresh</Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border bg-card px-6">
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
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
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10"><Mail className="w-5 h-5 text-primary" /></div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{contacts.length}</p>
                      <p className="text-sm text-muted-foreground">Contact Submissions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10"><ShieldCheck className="w-5 h-5 text-green-600" /></div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{successfulLogins}</p>
                      <p className="text-sm text-muted-foreground">Successful Logins</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-destructive/10"><Activity className="w-5 h-5 text-destructive" /></div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{failedLogins}</p>
                      <p className="text-sm text-muted-foreground">Failed Logins</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10"><Users className="w-5 h-5 text-blue-600" /></div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{activeSessions}</p>
                      <p className="text-sm text-muted-foreground">Active Sessions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Contacts */}
            <Card>
              <CardHeader><CardTitle className="text-base">Recent Contact Submissions</CardTitle></CardHeader>
              <CardContent>
                {contacts.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-4 text-center">No submissions yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Date</TableHead>
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

            {/* Recent Login Attempts */}
            <Card>
              <CardHeader><CardTitle className="text-base">Recent Login Attempts</CardTitle></CardHeader>
              <CardContent>
                {loginAttempts.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-4 text-center">No login attempts recorded.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loginAttempts.slice(0, 5).map(a => (
                        <TableRow key={a.id}>
                          <TableCell className="font-mono text-sm">{a.ip_address}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              a.was_successful ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}>
                              {a.was_successful ? "Success" : "Failed"}
                            </span>
                          </TableCell>
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

        {/* Contacts Tab */}
        {activeTab === "contacts" && (
          <Card>
            <CardHeader><CardTitle className="text-base">All Contact Submissions ({contacts.length})</CardTitle></CardHeader>
            <CardContent>
              {contacts.length === 0 ? (
                <p className="text-muted-foreground text-sm py-8 text-center">No submissions yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
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
              )}
            </CardContent>
          </Card>
        )}

        {/* Logins Tab */}
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
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loginAttempts.map(a => (
                      <TableRow key={a.id}>
                        <TableCell className="font-mono text-sm">{a.ip_address}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            a.was_successful ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {a.was_successful ? "Success" : "Failed"}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{formatDate(a.attempted_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}

        {/* Sessions Tab */}
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
                      <TableHead>Session Token</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Expires</TableHead>
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
                              isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
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

export default AdminDashboard;
