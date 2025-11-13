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
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { 
  Heart, 
  LogOut, 
  CheckCircle, 
  XCircle,
  Upload,
  FileText,
  Briefcase,
  Plane,
  CarFront
} from "lucide-react";

export default function HealthVaultPage() {
  const { ready, authenticated, user, logout } = usePrivy();
  const router = useRouter();
  
  const [testSummary, setTestSummary] = useState("");
  const [issuingHospital, setIssuingHospital] = useState("");
  const [verificationPassed, setVerificationPassed] = useState<"yes" | "no">("yes");

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
    // Treat health records as "other" type in the vault
    params.set("type", "other");

    const nameParts = ["Health Report"];
    if (issuingHospital) nameParts.push(`- ${issuingHospital}`);
    params.set("name", nameParts.join(" "));

    const descriptionLines = [
      testSummary || "No summary provided",
      `Verification: ${verificationPassed === "yes" ? "Passed" : "Failed"}`,
    ];
    params.set("description", descriptionLines.join(" | "));

    // Route into the Document Vault upload flow prefilled with health info
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
            <div className="p-3 rounded-lg bg-red-100 dark:bg-red-950">
              <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-3xl font-bold">Universal Health Identity + Medical Record Vault</h2>
          </div>
          <p className="text-muted-foreground">
            Securely verify and store medical records with blockchain technology
          </p>
        </div>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle>Medical Record Vault</CardTitle>
            <CardDescription>
              Enter test results and hospital information to add to your document vault
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddToVault} className="space-y-6">
              {/* Test Result Summary */}
              <div>
                <Label htmlFor="testSummary">Test Result Summary *</Label>
                <Textarea
                  id="testSummary"
                  value={testSummary}
                  onChange={(e) => setTestSummary(e.target.value)}
                  placeholder="Enter comprehensive test result summary (e.g., Blood Test - All parameters within normal range)"
                  required
                  className="mt-2"
                  rows={4}
                />
              </div>

              {/* Issuing Hospital/Doctor */}
              <div>
                <Label htmlFor="issuingHospital">Issuing Hospital/Doctor *</Label>
                <Input
                  id="issuingHospital"
                  value={issuingHospital}
                  onChange={(e) => setIssuingHospital(e.target.value)}
                  placeholder="e.g., Apollo Hospital, New Delhi - Dr. Smith"
                  required
                  className="mt-2"
                />
              </div>

              {/* Verification Passed */}
              <div>
                <Label htmlFor="verificationPassed">Verification Status *</Label>
                <Select
                  id="verificationPassed"
                  value={verificationPassed}
                  onChange={(e) => setVerificationPassed(e.target.value as "yes" | "no")}
                  className="mt-2"
                  required
                >
                  <option value="yes">Yes - Passed</option>
                  <option value="no">No - Failed</option>
                </Select>
                <div className="mt-2">
                  {verificationPassed === "yes" ? (
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

              {/* Upload Report Button - routes to wallet upload */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Report to Document Vault
                </Button>
              </div>

              {/* Info Box */}
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-md p-4">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Health Vault Benefits
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Secure medical record storage</li>
                  <li>• Universal health identity across providers</li>
                  <li>• Instant access to verified health data</li>
                  <li>• Privacy-preserving verification</li>
                </ul>
              </div>

              {/* Cancel Button */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
