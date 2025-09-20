"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill, Clock, Calendar, Download, Eye } from "lucide-react";
import { getPrescriptions } from "@/lib/api/patient";

interface Prescription {
  _id: string;
  displayId: string;
  condition: string;
  status: string;
  prescribedOn: string;
  nextReviewOn?: string;
  medicines: {
    name: string;
    strength: string;
    frequency: string;
    duration: string;
    remaining: number;
  }[];
  doctor?: {
    fullName: string;
    specialty: string;
  };
}

export function ActivePrescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // or from URL if you store it there
    console.log("Token:", token);
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    async function fetchPrescriptions() {
      try {
        const data = await getPrescriptions(token||"");
        setPrescriptions(
          data.filter((p: Prescription) => p.status === "Active")
        );
      } catch (err: any) {
        setError( "No Active Prescriptions Found");
      } finally {
        setLoading(false);
      }
    }

    fetchPrescriptions();
  }, []);

  const handleDownload = (id: string) => {
    alert(`Downloading prescription ${id}`);
  };

  const handleView = (id: string) => {
    alert(`Viewing detailed prescription ${id}`);
  };

  if (loading) return <p>Loading prescriptions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Active Prescriptions
          </h3>
          <p className="text-sm text-muted-foreground">
            Current medications and treatments
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {prescriptions.length} Active
        </Badge>
      </div>

      {prescriptions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Pill className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Active Prescriptions
            </h3>
            <p className="text-muted-foreground text-center">
              You don't have any active prescriptions at the moment.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {prescriptions.map((prescription) => (
            <Card key={prescription._id} className="border-l-4 border-l-accent">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Pill className="h-5 w-5 text-primary" />
                      {prescription.condition}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Prescribed by {prescription.doctor?.fullName} (
                      {prescription.doctor?.specialty})
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="default"
                      className="bg-accent text-accent-foreground"
                    >
                      {prescription.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      ID: {prescription.displayId}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Prescription Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Prescribed
                      </p>
                      <p className="text-sm font-medium">
                        {new Date(
                          prescription.prescribedOn
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Next Review
                      </p>
                      <p className="text-sm font-medium">
                        {prescription.nextReviewOn
                          ? new Date(
                              prescription.nextReviewOn
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Medicines</p>
                      <p className="text-sm font-medium">
                        {prescription.medicines.length} items
                      </p>
                    </div>
                  </div>
                </div>

                {/* Medicines List */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">
                    Medications
                  </h4>
                  {prescription.medicines.map((medicine, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-foreground">
                            {medicine.name}
                          </h5>
                          <Badge variant="outline" className="text-xs">
                            {medicine.strength}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{medicine.frequency}</span>
                          <span>•</span>
                          <span>{medicine.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {medicine.remaining} days left
                        </p>
                        <div className="w-20 bg-muted rounded-full h-2 mt-1">
                          <div
                            className="bg-accent h-2 rounded-full transition-all"
                            style={{
                              width: `${
                                (medicine.remaining /
                                  Number.parseInt(medicine.duration)) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(prescription._id)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(prescription._id)}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
