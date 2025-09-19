"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  User,
  Phone,
  Calendar,
  MapPin,
  FileText,
  History,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface Patient {
  _id: string;
  fullName: string;
  abhaId: string;
  gender: string;
  age: number;
  contact?: {
    phone?: string;
    address?: {
      line1?: string;
      city?: string;
    };
  };
  createdAt: string;
}

interface PatientSearchProps {
  onSelectPatient?: (patient: Patient) => void;
  onNavigateToPrescription?: () => void;
  onNavigateToHistory?: () => void;
}

export function PatientSearch({
  onSelectPatient,
  onNavigateToPrescription,
  onNavigateToHistory,
}: PatientSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    setError("");
    setSelectedPatient(null); // reset previously selected

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No token found");
        setIsSearching(false);
        return;
      }

      const res = await fetch(
        `${API_BASE}/auth/patients?search=${encodeURIComponent(searchTerm)}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch patients");
      const data = await res.json();
      setSearchResults(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    onSelectPatient?.(patient);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleCreatePrescription = () => {
    if (selectedPatient) {
      onNavigateToPrescription?.();
    }
  };

  const handleViewHistory = () => {
    if (selectedPatient) {
      onNavigateToHistory?.();
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Patient Search
          </CardTitle>
          <CardDescription>
            Search for patients by ABHA ID or Name
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Patient ABHA ID or Name</Label>
              <Input
                id="search"
                type="text"
                placeholder="Enter ABHA ID (e.g., 12-1234-5678-9876) or Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                disabled={isSearching || !searchTerm.trim()}
                className="w-full sm:w-auto"
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
      </Card>

      {/* Results Card */}
      {searchTerm && !isSearching && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results ({searchResults.length})</CardTitle>
            <CardDescription>
              {selectedPatient
                ? "Selected patient details"
                : "Click a patient to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* No results */}
            {searchResults.length === 0 ? (
              <div className="p-6 text-center">
                <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  No patients found matching "{searchTerm}"
                </p>
                <p className="text-sm text-muted-foreground">
                  Try searching with a different ABHA ID or Name
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* List results */}
                {searchResults.map((patient) => (
                  <Card
                    key={patient._id}
                    className={`cursor-pointer ${
                      selectedPatient?._id === patient._id
                        ? "ring-2 ring-primary bg-accent/30"
                        : ""
                    }`}
                    onClick={() => handleSelectPatient(patient)}
                  >
                    <CardContent className="p-4 flex justify-between">
                      <div>
                        <h3 className="font-semibold">{patient.fullName}</h3>
                        <p className="text-sm text-muted-foreground">
                          ABHA: {patient.abhaId} • {patient.age} yrs •{" "}
                          {patient.gender}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {patient.contact?.phone}
                        </p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <Calendar className="inline h-3 w-3 mr-1" />
                        {new Date(patient.createdAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Selected Patient Details */}
                {selectedPatient && (
                  <div className="mt-6 border-t border-border pt-6">
                    <h4 className="text-accent font-semibold flex items-center gap-2 mb-4">
                      <User className="h-5 w-5" />
                      Selected Patient
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium">
                          Patient Information
                        </Label>
                        <div className="mt-2 space-y-2">
                          <p>
                            <span className="font-medium">Name:</span>{" "}
                            {selectedPatient.fullName}
                          </p>
                          <p>
                            <span className="font-medium">ABHA:</span>{" "}
                            {selectedPatient.abhaId}
                          </p>
                          <p>
                            <span className="font-medium">Age:</span>{" "}
                            {selectedPatient.age} years
                          </p>
                          <p>
                            <span className="font-medium">Gender:</span>{" "}
                            {selectedPatient.gender}
                          </p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Contact Info
                        </Label>
                        <div className="mt-2 space-y-2">
                          <p>
                            <span className="font-medium">Phone:</span>{" "}
                            {selectedPatient.contact?.phone || "N/A"}
                          </p>
                          <p>
                            <span className="font-medium">Address:</span>{" "}
                            {selectedPatient.contact?.address?.line1},{" "}
                            {selectedPatient.contact?.address?.city}
                          </p>
                          <p>
                            <span className="font-medium">Joined:</span>{" "}
                            {new Date(
                              selectedPatient.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                      <Button
                        className="flex-1 flex items-center gap-2"
                        onClick={onNavigateToPrescription}
                      >
                        <FileText className="h-4 w-4" />
                        Create Prescription
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 flex items-center gap-2 bg-transparent"
                        onClick={onNavigateToHistory}
                      >
                        <History className="h-4 w-4" />
                        View History
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
