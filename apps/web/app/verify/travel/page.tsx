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
  PlaneTakeoff,
  Plane,
  Briefcase,
  Heart,
  CarFront,
  Globe,
  FileText,
  Upload,
  CheckCircle,
  XCircle,
  LogOut,
} from "lucide-react";

export default function TravelIDPage() {
  const { ready, authenticated, user, logout } = usePrivy();
  const router = useRouter();
  
  const [passportValid, setPassportValid] = useState<"yes" | "no">("yes");
  const [visaCountry, setVisaCountry] = useState("");
  const [visaValid, setVisaValid] = useState<"yes" | "no">("yes");
  const [vaccinationStatus, setVaccinationStatus] = useState<"complete" | "incomplete">("complete");
  const [bookingVerified, setBookingVerified] = useState<"yes" | "no">("yes");

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
    // Treat travel documents as government ID in the vault
    params.set("type", "government");

    const nameParts = ["Travel Documents"];
    if (visaCountry) nameParts.push(`- ${visaCountry}`);
    params.set("name", nameParts.join(" "));

    const descriptionLines = [
      `Passport: ${passportValid === "yes" ? "Valid" : "Expired"}`,
      `Visa (${visaCountry || "N/A"}): ${visaValid === "yes" ? "Valid" : "Expired"}`,
      `Vaccination: ${vaccinationStatus === "complete" ? "Complete" : "Incomplete"}`,
      `Booking: ${bookingVerified === "yes" ? "Verified" : "Not Verified"}`,
    ];
    params.set("description", descriptionLines.join(" | "));

    // Route into the Document Vault upload flow prefilled with travel info
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
            <div className="p-3 rounded-lg bg-cyan-100 dark:bg-cyan-950">
              <Plane className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold">Global Travel Identity Wallet</h2>
          </div>
          <p className="text-muted-foreground">
            Universal travel verification for immigration, hotels, and airlines
          </p>
        </div>

        <Card className="border-l-4 border-l-cyan-500">
          <CardHeader>
            <CardTitle>Travel Document Verification</CardTitle>
            <CardDescription>
              Verify passport, visa, vaccination, and booking details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddToVault} className="space-y-6">
              {/* Passport Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <PlaneTakeoff className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Passport Information</h3>
                </div>
                
                <div>
                  <Label htmlFor="passportValid">Passport Status *</Label>
                  <Select
                    id="passportValid"
                    value={passportValid}
                    onChange={(e) => setPassportValid(e.target.value as "yes" | "no")}
                    className="mt-2"
                    required
                  >
                    <option value="yes">Valid</option>
                    <option value="no">Expired</option>
                  </Select>
                  <div className="mt-2">
                    {passportValid === "yes" ? (
                      <Badge variant="success" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Valid Passport
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">
                        <XCircle className="h-3 w-3 mr-1" />
                        Expired Passport
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Visa Information */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Visa Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="visaCountry">Destination Country *</Label>
                    <Input
                      id="visaCountry"
                      value={visaCountry}
                      onChange={(e) => setVisaCountry(e.target.value)}
                      placeholder="e.g., United States"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="visaValid">Visa Status *</Label>
                    <Select
                      id="visaValid"
                      value={visaValid}
                      onChange={(e) => setVisaValid(e.target.value as "yes" | "no")}
                      className="mt-2"
                      required
                    >
                      <option value="yes">Valid</option>
                      <option value="no">Expired</option>
                    </Select>
                    <div className="mt-2">
                      {visaValid === "yes" ? (
                        <Badge variant="success" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Valid Visa
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs">
                          <XCircle className="h-3 w-3 mr-1" />
                          Expired Visa
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Vaccination & Booking Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <Label htmlFor="vaccinationStatus">Vaccination Status *</Label>
                  <Select
                    id="vaccinationStatus"
                    value={vaccinationStatus}
                    onChange={(e) => setVaccinationStatus(e.target.value as "complete" | "incomplete")}
                    className="mt-2"
                    required
                  >
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                  </Select>
                  <div className="mt-2">
                    {vaccinationStatus === "complete" ? (
                      <Badge variant="success" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Vaccination Complete
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">
                        <XCircle className="h-3 w-3 mr-1" />
                        Incomplete
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="bookingVerified">Booking Status *</Label>
                  <Select
                    id="bookingVerified"
                    value={bookingVerified}
                    onChange={(e) => setBookingVerified(e.target.value as "yes" | "no")}
                    className="mt-2"
                    required
                  >
                    <option value="yes">Verified</option>
                    <option value="no">Not Verified</option>
                  </Select>
                  <div className="mt-2">
                    {bookingVerified === "yes" ? (
                      <Badge variant="success" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Booking Verified
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">
                        <XCircle className="h-3 w-3 mr-1" />
                        Not Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 rounded-md p-4">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Global Travel Benefits
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Seamless immigration verification</li>
                  <li>• Instant hotel check-in</li>
                  <li>• Pre-verified airline boarding</li>
                  <li>• Universal travel identity</li>
                </ul>
              </div>

              {/* Submit Button */}
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
