"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Calendar, 
  User, 
  Building2, 
  CheckCircle, 
  XCircle,
  Clock,
  Mail
} from "lucide-react";
import { format } from "date-fns";

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

interface VerificationRequestCardProps {
  request: VerificationRequest;
  onApprove?: (id: string, notes: string) => void;
  onReject?: (id: string, notes: string) => void;
  isLoading?: boolean;
}

export function VerificationRequestCard({ 
  request, 
  onApprove, 
  onReject,
  isLoading = false
}: VerificationRequestCardProps) {
  const [verificationNotes, setVerificationNotes] = useState("");
  const [showActions, setShowActions] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="success"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case "pending":
      default:
        return <Badge variant="warning"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    }
  };

  const handleApprove = () => {
    if (onApprove) {
      onApprove(request.id, verificationNotes);
      setVerificationNotes("");
      setShowActions(false);
    }
  };

  const handleReject = () => {
    if (onReject) {
      onReject(request.id, verificationNotes);
      setVerificationNotes("");
      setShowActions(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {request.documentName}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline">{request.documentType}</Badge>
              {getStatusBadge(request.status)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Document Description */}
        {request.description && (
          <div>
            <p className="text-sm text-muted-foreground">{request.description}</p>
          </div>
        )}

        {/* Request Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <User className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Issuer Name</p>
              <p className="text-sm text-muted-foreground">{request.issuerName}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Organization</p>
              <p className="text-sm text-muted-foreground">{request.issuerOrganization}</p>
            </div>
          </div>

          {request.issuerEmail && (
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Issuer Email</p>
                <p className="text-sm text-muted-foreground">{request.issuerEmail}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Submitted</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(request.createdAt), "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
          </div>
        </div>

        {/* Submitter Info */}
        {request.submitterEmail && (
          <div className="p-3 rounded-lg bg-muted">
            <p className="text-xs font-medium mb-1">Submitted by</p>
            <p className="text-sm text-muted-foreground">{request.submitterEmail}</p>
          </div>
        )}

        {/* Verification Notes (if any) */}
        {request.verificationNotes && request.status !== "pending" && (
          <div className="p-3 rounded-lg bg-muted">
            <p className="text-xs font-medium mb-1">Verification Notes</p>
            <p className="text-sm text-muted-foreground">{request.verificationNotes}</p>
            {request.verifiedAt && (
              <p className="text-xs text-muted-foreground mt-2">
                Verified on {format(new Date(request.verifiedAt), "MMM d, yyyy 'at' h:mm a")}
              </p>
            )}
          </div>
        )}

        {/* Actions for pending requests */}
        {request.status === "pending" && (
          <div className="space-y-3 pt-4 border-t">
            {showActions ? (
              <div className="space-y-3">
                <div>
                  <Label htmlFor={`notes-${request.id}`}>Verification Notes (Optional)</Label>
                  <Textarea
                    id={`notes-${request.id}`}
                    placeholder="Add any notes about this verification..."
                    value={verificationNotes}
                    onChange={(e) => setVerificationNotes(e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleApprove}
                    disabled={isLoading}
                    className="flex-1"
                    variant="default"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={handleReject}
                    disabled={isLoading}
                    className="flex-1"
                    variant="destructive"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => {
                      setShowActions(false);
                      setVerificationNotes("");
                    }}
                    disabled={isLoading}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setShowActions(true)}
                variant="outline"
                className="w-full"
              >
                Review Request
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
