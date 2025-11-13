"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VerificationRequestCard } from "@/components/organization/VerificationRequestCard";
import { 
  LogOut, 
  Search, 
  Filter,
  RefreshCw
} from "lucide-react";

interface VerificationRequest {
  id: string;
  documentName: string;
  documentType: string;
  description?: string;
  issuerName: string;
  issuerEmail?: string;
  issuerOrganization: string;
  documentCID?: string;
  documentUrl?: string;
  status: string;
  verificationNotes?: string;
  submittedBy?: string;
  submitterEmail?: string;
  verifiedBy?: string;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default function OrganizationVerificationsPage() {
  const { ready, authenticated, user, logout } = usePrivy();
  const router = useRouter();
  
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [organizationFilter, setOrganizationFilter] = useState("");

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/login");
    }
  }, [ready, authenticated, router]);

  // Mock data for demonstration
  const fetchRequests = async () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Mock verification requests
      const mockRequests: VerificationRequest[] = [
        {
          id: '1',
          documentName: 'Bachelor of Science Degree',
          documentType: 'academic',
          description: 'Computer Science degree certificate',
          issuerName: 'MIT Registrar',
          issuerEmail: 'registrar@mit.edu',
          issuerOrganization: 'Massachusetts Institute of Technology',
          status: 'pending',
          submittedBy: 'user123',
          submitterEmail: 'student@example.com',
          createdAt: new Date('2025-01-10T10:00:00Z'),
          updatedAt: new Date('2025-01-10T10:00:00Z'),
        },
        {
          id: '2',
          documentName: 'Professional Certificate',
          documentType: 'professional',
          description: 'AWS Solutions Architect certification',
          issuerName: 'AWS Training',
          issuerEmail: 'training@aws.com',
          issuerOrganization: 'Amazon Web Services',
          status: 'approved',
          verificationNotes: 'Verified successfully',
          verifiedBy: 'admin1',
          verifiedAt: new Date('2025-01-11T14:30:00Z'),
          submittedBy: 'user456',
          submitterEmail: 'professional@example.com',
          createdAt: new Date('2025-01-09T15:20:00Z'),
          updatedAt: new Date('2025-01-11T14:30:00Z'),
        },
        {
          id: '3',
          documentName: 'Government ID',
          documentType: 'government',
          description: 'National Identity Card',
          issuerName: 'Department of State',
          issuerOrganization: 'US Government',
          status: 'rejected',
          verificationNotes: 'Document expired',
          verifiedBy: 'admin2',
          verifiedAt: new Date('2025-01-12T09:15:00Z'),
          submittedBy: 'user789',
          submitterEmail: 'citizen@example.com',
          createdAt: new Date('2025-01-11T08:00:00Z'),
          updatedAt: new Date('2025-01-12T09:15:00Z'),
        },
      ];
      
      setRequests(mockRequests);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (ready && authenticated) {
      fetchRequests();
    }
  }, [ready, authenticated]);

  // Filter requests based on status and search term
  useEffect(() => {
    let filtered = requests;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    // Filter by organization
    if (organizationFilter) {
      filtered = filtered.filter(req => 
        req.issuerOrganization.toLowerCase().includes(organizationFilter.toLowerCase())
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(req =>
        req.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.issuerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.documentType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRequests(filtered);
  }, [requests, statusFilter, searchTerm, organizationFilter]);

  const handleApprove = async (id: string, notes: string) => {
    setActionLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Approving request:', { id, notes, verifiedBy: user?.id });
      
      // Update local state
      setRequests(prev => prev.map(req => 
        req.id === id 
          ? { 
              ...req, 
              status: 'approved', 
              verificationNotes: notes,
              verifiedBy: user?.id || 'admin',
              verifiedAt: new Date(),
              updatedAt: new Date(),
            }
          : req
      ));
      
      setActionLoading(false);
      alert('Request approved successfully!');
    }, 1000);
  };

  const handleReject = async (id: string, notes: string) => {
    setActionLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Rejecting request:', { id, notes, verifiedBy: user?.id });
      
      // Update local state
      setRequests(prev => prev.map(req => 
        req.id === id 
          ? { 
              ...req, 
              status: 'rejected', 
              verificationNotes: notes,
              verifiedBy: user?.id || 'admin',
              verifiedAt: new Date(),
              updatedAt: new Date(),
            }
          : req
      ));
      
      setActionLoading(false);
      alert('Request rejected successfully!');
    }, 1000);
  };

  if (!ready || !authenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold">PixelGenesis</h1>
              <div className="hidden md:flex gap-4">
                <Button variant="ghost" onClick={() => router.push("/dashboard")}>
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={() => router.push("/wallet")}>
                  Wallet
                </Button>
                <Button variant="ghost" onClick={() => router.push("/verify")}>
                  Verify
                </Button>
                <Button variant="ghost" onClick={() => router.push("/organization/verifications")}>
                  Verifications
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.push("/profile")}>
                Profile
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Document Verifications</h1>
          <p className="text-muted-foreground">
            Review and verify document authenticity requests from users
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending</CardTitle>
              <CardDescription>Awaiting review</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {pendingCount}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Approved</CardTitle>
              <CardDescription>Verified documents</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {approvedCount}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Rejected</CardTitle>
              <CardDescription>Invalid documents</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {rejectedCount}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchRequests}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="mt-2"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  placeholder="Filter by organization..."
                  value={organizationFilter}
                  onChange={(e) => setOrganizationFilter(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Requests List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading verification requests...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No verification requests found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <VerificationRequestCard
                key={request.id}
                request={request}
                onApprove={handleApprove}
                onReject={handleReject}
                isLoading={actionLoading}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
