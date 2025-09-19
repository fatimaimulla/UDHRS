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

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No token found");
        setIsSearching(false);
        return;
      }
      console.log(token)
      const res = await fetch(
        `${API_BASE}/auth/patients?search=${encodeURIComponent(searchTerm)}`,
        {
          method:"GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(res)

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

      {/* Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results ({searchResults.length})</CardTitle>
            <CardDescription>Click a patient to view details</CardDescription>
          </CardHeader>
          <CardContent>
            {searchResults.map((patient) => (
              <Card
                key={patient._id}
                className={`cursor-pointer mb-3 ${
                  selectedPatient?._id === patient._id
                    ? "ring-2 ring-primary"
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}
