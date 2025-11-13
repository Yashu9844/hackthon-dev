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
  CarFront, 
  LogOut, 
  CheckCircle, 
  XCircle,
  Upload,
  FileText,
  Briefcase,
  Heart,
  Plane
} from "lucide-react";

export default function TrafficVerificationPage() {
  const { ready, authenticated, user, logout } = usePrivy();
  const router = useRouter();
  
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseStatus, setLicenseStatus] = useState<"valid" | "expired">("valid");
  const [licenseType, setLicenseType] = useState<"2W" | "4W">("2W");
  const [issuerRTO, setIssuerRTO] = useState("");
  const [status, setStatus] = useState<"active" | "revoked">("active");

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
    // Treat traffic license as government document in the vault
    params.set("type", "government");

    const nameParts = ["Driving License"];
    if (licenseNumber) nameParts.push(`- ${licenseNumber}`);
    params.set("name", nameParts.join(" "));

    const descriptionLines = [
      `License Status: ${licenseStatus === "valid" ? "Valid" : "Expired"}`,
      `Type: ${licenseType === "2W" ? "Two Wheeler" : "Four Wheeler"}`,
      issuerRTO ? `Issuer: ${issuerRTO}` : null,
      `Traffic Status: ${status === "active" ? "Active" : "Revoked"}`,
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
            <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-950">
              <CarFront className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-3xl font-bold">Traffic Police Verification</h2>
          </div>
          <p className="text-muted-foreground">
            Verify driving license without Aadhaar dependency
          </p>
        </div>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle>License Document Details</CardTitle>
            <CardDescription>
              Enter driver's license information to add to the document vault
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddToVault} className="space-y-6">
              {/* License Number */}
              <div>
                <Label htmlFor="licenseNumber">License Number *</Label>
                <Input
                  id="licenseNumber"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="e.g., DL-1420110012345"
                  required
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* License Status */}
                <div>
                  <Label htmlFor="licenseStatus">License Status *</Label>
                  <Select
                    id="licenseStatus"
                    value={licenseStatus}
                    onChange={(e) => setLicenseStatus(e.target.value as "valid" | "expired")}
                    className="mt-2"
                    required
                  >
                    <option value="valid">Valid</option>
                    <option value="expired">Expired</option>
                  </Select>
                  <div className="mt-2">
                    {licenseStatus === "valid" ? (
                      <Badge variant="success" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Valid License
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">
                        <XCircle className="h-3 w-3 mr-1" />
                        Expired License
                      </Badge>
                    )}
                  </div>
                </div>

                {/* License Type */}
                <div>
                  <Label htmlFor="licenseType">License Type *</Label>
                  <Select
                    id="licenseType"
                    value={licenseType}
                    onChange={(e) => setLicenseType(e.target.value as "2W" | "4W")}
                    className="mt-2"
                    required
                  >
                    <option value="2W">Two Wheeler (2W)</option>
                    <option value="4W">Four Wheeler (4W)</option>
                  </Select>
                </div>
              </div>

              {/* Issuer RTO */}
              <div>
                <Label htmlFor="issuerRTO">Issuer (RTO) *</Label>
                <Input
                  id="issuerRTO"
                  value={issuerRTO}
                  onChange={(e) => setIssuerRTO(e.target.value)}
                  placeholder="e.g., RTO Delhi - DL14"
                  required
                  className="mt-2"
                />
              </div>

              {/* Status */}
              <div>
                <Label htmlFor="status">Traffic Status *</Label>
                <Select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "active" | "revoked")}
                  className="mt-2"
                  required
                >
                  <option value="active">Active</option>
                  <option value="revoked">Revoked</option>
                </Select>
                <div className="mt-2">
                  {status === "active" ? (
                    <Badge variant="success" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active Status
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs">
                      <XCircle className="h-3 w-3 mr-1" />
                      Revoked Status
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
