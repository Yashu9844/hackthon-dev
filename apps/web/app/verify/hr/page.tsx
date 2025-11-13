"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { 
  Briefcase, 
  LogOut, 
  CheckCircle, 
  XCircle,
  Upload,
  FileText,
  Heart,
  Plane,
  CarFront,
  GraduationCap
} from "lucide-react";

export default function HRVerificationPage() {
  const { ready, authenticated, user, logout } = usePrivy();
  const router = useRouter();
  
  const [degreeTitle, setDegreeTitle] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [issuerUniversity, setIssuerUniversity] = useState("");
  const [internshipRole, setInternshipRole] = useState("");
  const [internshipDuration, setInternshipDuration] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<"PASS" | "FAIL">("PASS");

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/login");
    }
  }, [ready, authenticated, router]);

  if (!ready || !authenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const handleAddToVault = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    // Treat HR credentials as professional documents in the vault
    params.set("type", "professional");

    const nameParts = ["HR Credentials"];
    if (degreeTitle) nameParts.push(`- ${degreeTitle}`);
    if (graduationYear) nameParts.push(`(${graduationYear})`);
    params.set("name", nameParts.join(" "));

    const descriptionLines = [
      issuerUniversity ? `University: ${issuerUniversity}` : null,
      internshipRole ? `Internship: ${internshipRole}` : null,
      internshipDuration ? `Duration: ${internshipDuration} month(s)` : null,
      `Verification: ${verificationStatus === "PASS" ? "Pass" : "Fail"}`,
    ].filter(Boolean) as string[];
    params.set("description", descriptionLines.join(" | "));

    router.push(`/wallet/upload?${params.toString()}`);
  };

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
                <DropdownMenu trigger="Multi-Domain Verification">
                  <DropdownMenuItem 
                    icon={<Briefcase className="h-4 w-4" />}
                    onClick={() => router.push("/verify/hr")}
                  >
                    HR Verify
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    icon={<Heart className="h-4 w-4" />}
                    onClick={() => router.push("/verify/health")}
                  >
                    Health Vault
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    icon={<Plane className="h-4 w-4" />}
                    onClick={() => router.push("/verify/travel")}
                  >
                    Travel ID
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    icon={<CarFront className="h-4 w-4" />}
                    onClick={() => router.push("/verify/traffic")}
                  >
                    Traffic Verify
                  </DropdownMenuItem>
                </DropdownMenu>
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-950">
              <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold">HR Recruitment Verification</h2>
          </div>
          <p className="text-muted-foreground">
            Streamline candidate verification with instant credential checks
          </p>
        </div>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle>Educational & Professional Credentials</CardTitle>
            <CardDescription>
              Enter candidate's academic and internship details to add to the document vault
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddToVault} className="space-y-6">
              {/* Degree Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Degree Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="degreeTitle">Degree Title *</Label>
                    <Input
                      id="degreeTitle"
                      value={degreeTitle}
                      onChange={(e) => setDegreeTitle(e.target.value)}
                      placeholder="e.g., Bachelor of Science in Computer Science"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="graduationYear">Graduation Year *</Label>
                    <Input
                      id="graduationYear"
                      type="number"
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      placeholder="e.g., 2023"
                      required
                      className="mt-2"
                      min="1950"
                      max="2030"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="issuerUniversity">Issuer University *</Label>
                  <Input
                    id="issuerUniversity"
                    value={issuerUniversity}
                    onChange={(e) => setIssuerUniversity(e.target.value)}
                    placeholder="e.g., Massachusetts Institute of Technology"
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Internship Information */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Internship Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="internshipRole">Internship Role</Label>
                    <Input
                      id="internshipRole"
                      value={internshipRole}
                      onChange={(e) => setInternshipRole(e.target.value)}
                      placeholder="e.g., Software Engineering Intern"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="internshipDuration">Duration (months)</Label>
                    <Input
                      id="internshipDuration"
                      type="number"
                      value={internshipDuration}
                      onChange={(e) => setInternshipDuration(e.target.value)}
                      placeholder="e.g., 6"
                      className="mt-2"
                      min="1"
                      max="24"
                    />
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div>
                <Label htmlFor="verificationStatus">Verification Status *</Label>
                <Select
                  id="verificationStatus"
                  value={verificationStatus}
                  onChange={(e) => setVerificationStatus(e.target.value as "PASS" | "FAIL")}
                  className="mt-2"
                  required
                >
                  <option value="PASS">PASS</option>
                  <option value="FAIL">FAIL</option>
                </Select>
                <div className="mt-2">
                  {verificationStatus === "PASS" ? (
                    <Badge variant="success" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verification Passed
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs">
                      <XCircle className="h-3 w-3 mr-1" />
                      Verification Failed
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  <Upload className="mr-2 h-4 w-4" />
                  Add to Document Vault
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
