"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Shield, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface Consent {
  _id: string;
  patientId: string;
  doctorId: { _id: string; fullName?: string }; // assuming you populate doctor
  dataTypes: string[];
  accessType: "Temporary 3 Hours" | "Permanent";
  status: "pending" | "accepted" | "revoked" | "expired";
  approvedAt?: string;
  createdAt: string;
}

export function ConsentDashboard() {
  const [activeConsents, setActiveConsents] = useState<Consent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchConsents();
  }, []);

  const fetchConsents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE}/consent/consentData`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
      });

      if (!res.ok) throw new Error("Failed to fetch consents");
      const data = await res.json();
      setActiveConsents(data.consents || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔑 New function to revoke consent
  const handleRevoke = async (consent: Consent) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No token found");
        return;
      }

      const res = await fetch(`${API_BASE}/consent/manageConsent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nmcId: consent.doctorId?._id, // or consent.nmcId depending on your schema
          action: "revoke",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to revoke consent");

      console.log("Revoke response:", data);
      fetchConsents(); // reload UI
    } catch (err: any) {
      console.error("Revoke error:", err.message);
      setError(err.message || "Something went wrong");
    }
  };

  const getAccessTypeBadge = (accessType: Consent["accessType"]) => {
    if (accessType === "Temporary 3 Hours") {
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Temporary (3h)
        </Badge>
      );
    }
    return (
      <Badge variant="default" className="flex items-center gap-1">
        <Shield className="w-3 h-3" />
        Permanent Access
      </Badge>
    );
  };

  const formatDateTime = (date?: string) =>
    date
      ? new Date(date).toLocaleString([], {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "N/A";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Active Consents</h2>
        <p className="text-muted-foreground">
          Currently approved consents for data sharing
        </p>
      </div>

      {loading ? (
        <p>Loading consents...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : activeConsents.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <UserCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No active consents</p>
          </CardContent>
        </Card>
      ) : (
        activeConsents.map((consent) => (
          <Card
            key={consent._id}
            className="mb-4 border border-border bg-card shadow-sm"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {consent.doctorId?.fullName || `Consent #${consent._id}`}
                </CardTitle>
                {getAccessTypeBadge(consent.accessType)}
              </div>
              <CardDescription>
                {consent.approvedAt
                  ? `Granted on ${formatDateTime(consent.approvedAt)}`
                  : `Requested on ${formatDateTime(consent.createdAt)}`}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Data Types:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {consent.dataTypes?.length ? (
                      consent.dataTypes.map((dt) => (
                        <Badge key={dt} className="bg-gray-200 text-black">
                          {dt}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No data types specified
                      </p>
                    )}
                  </div>
                </div>

                {/* ✅ Revoke Button calls API */}
                {consent.status === "accepted" && (
                  <div className="pt-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleRevoke(consent)}
                    >
                      <X className="w-4" />
                      Revoke Access
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
