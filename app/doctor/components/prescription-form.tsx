"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, FileText, Mic, User, ArrowLeft } from "lucide-react";
import { VoiceInput } from "./voice-input";

interface Medicine {
  id: string;
  name: string;
  strength: string;
  frequency: string;
  days: number;
  summary?: string; // ✅ AI summary added
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
}

interface PrescriptionFormProps {
  selectedPatient: any;
  onGoToFindPatient: () => void;
}

export function PrescriptionForm({
  selectedPatient,
  onGoToFindPatient,
}: PrescriptionFormProps) {
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: "1", name: "", strength: "", frequency: "", days: 0, summary: "" },
  ]);
  const [notes, setNotes] = useState("");
  const [showReview, setShowReview] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const frequencyOptions = [
    { value: "OD", label: "OD (Once Daily)" },
    { value: "BD", label: "BD (Twice Daily)" },
    { value: "TDS", label: "TDS (Three Times Daily)" },
    { value: "Morning", label: "Morning Only" },
    { value: "Evening", label: "Evening Only" },
    { value: "Morning-Evening", label: "Morning & Evening" },
  ];

  const addMedicineRow = () => {
    const newId = (medicines.length + 1).toString();
    setMedicines([
      ...medicines,
      {
        id: newId,
        name: "",
        strength: "",
        frequency: "",
        days: 0,
        summary: "",
      },
    ]);
  };

  const removeMedicineRow = (id: string) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter((med) => med.id !== id));
    }
  };

  const updateMedicine = (
    id: string,
    field: keyof Medicine,
    value: string | number
  ) => {
    setMedicines(
      medicines.map((med) => (med.id === id ? { ...med, [field]: value } : med))
    );
  };

  const frequencyMap: { [key: string]: string } = {
    OD: "OD",
    BD: "BD",
    TDS: "TDS",
    "Morning Only": "Morning",
    "Evening Only": "Evening",
    "Morning & Evening": "Morning-Evening",
  };

  // ✅ Now includes summary from AI response
  const handleVoiceMedicines = (voiceMedicines: Medicine[]) => {
    setMedicines((prevMedicines) => {
      const isOnlyEmpty =
        prevMedicines.length === 1 && prevMedicines[0].name.trim() === "";
      const existingNames = new Set(
        prevMedicines.map((med) => med.name.trim().toLowerCase())
      );

      const newMedicines = voiceMedicines.filter(
        (med) => !existingNames.has(med.name.trim().toLowerCase())
      );

      const updatedNewMedicines = newMedicines.map((med) => ({
        ...med,
        id: `${Date.now()}-${Math.random()}`,
        frequency: frequencyMap[med.frequency] || med.frequency,
        days: med.days && med.days > 0 ? med.days : 0,
        summary: med.summary || "", // ✅ keep AI summary
      }));

      if (isOnlyEmpty) {
        return updatedNewMedicines.length > 0
          ? updatedNewMedicines
          : prevMedicines;
      }

      return [...prevMedicines, ...updatedNewMedicines];
    });

    setIsVoiceMode(false);
  };

  const handleVoiceNotes = (voiceNotes: string) => {
    setNotes(voiceNotes);
  };

  const handleReview = () => {
    setShowReview(true);
  };

  const handleSavePrescription = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setMedicines([
      { id: "1", name: "", strength: "", frequency: "", days: 0, summary: "" },
    ]);
    setNotes("");
    setShowReview(false);
    setIsSaving(false);

    // alert("Prescription saved successfully!");
    return(<div className="font-sm text-bold text-green-700">Prescription saved successfully!</div>)
  };

  const isFormValid = () => {
    return (
      medicines.every(
        (med) =>
          med.name.trim() &&
          med.strength.trim() &&
          med.frequency &&
          med.days > 0
      ) && selectedPatient
    );
  };

  if (!selectedPatient) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <User className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                No Patient Selected
              </h3>
              <p className="text-muted-foreground text-balance">
                Please select a patient from the "Find Patient" section to
                create a prescription.
              </p>
            </div>
            <Button variant="outline" onClick={() => onGoToFindPatient()}>
              Go to Find Patient
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showReview) {
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => setShowReview(false)} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Edit
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Review Prescription</CardTitle>
          <CardDescription>Please confirm before saving.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Patient</h3>
            <p>{selectedPatient.name} ({selectedPatient.age}, {selectedPatient.gender})</p>
          </div>

          <div>
            <h3 className="font-semibold">Medicines</h3>
            <ul className="list-disc pl-6">
              {medicines.map((med) => (
                <li key={med.id}>
                  {med.name} – {med.strength}, {med.frequency}, {med.days} days
                </li>
              ))}
            </ul>
          </div>

          {notes && (
            <div>
              <h3 className="font-semibold">Notes</h3>
              <p>{notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button onClick={handleSavePrescription} disabled={isSaving} className="flex-1">
          {isSaving ? "Saving..." : "Save Prescription"}
        </Button>
      </div>
    </div>
  )
}


  return (
    <div className="space-y-6">
      {/* Patient Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>Patient Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-semibold text-balance">
                {selectedPatient.name}
              </p>
              <p className="text-sm text-muted-foreground">
                AbhaID: {selectedPatient.abhaId} • {selectedPatient.age} years •{" "}
                {selectedPatient.gender}
              </p>
            </div>
            <Badge variant="secondary">Active</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Prescription Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Prescription Form
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsVoiceMode(!isVoiceMode)}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Mic className="h-4 w-4" />
              {isVoiceMode ? "Manual Entry" : "Voice Input"}
            </Button>
          </CardTitle>
          <CardDescription>
            {isVoiceMode
              ? "Use voice input to dictate prescription details"
              : "Add medicines manually using the form below"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {isVoiceMode ? (
            <VoiceInput
              onMedicinesGenerated={handleVoiceMedicines}
              onNotesGenerated={handleVoiceNotes}
            />
          ) : (
            <>
              {/* Medicine Rows */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <Label className="text-base font-semibold">Medicines</Label>
                  <Button
                    onClick={addMedicineRow}
                    size="sm"
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Medicine
                  </Button>
                </div>

                {medicines.map((medicine, index) => (
                  <Card key={medicine.id} className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="outline">Medicine {index + 1}</Badge>
                      {medicines.length > 1 && (
                        <Button
                          onClick={() => removeMedicineRow(medicine.id)}
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor={`medicine-name-${medicine.id}`}>
                          Medicine Name
                        </Label>
                        <Input
                          id={`medicine-name-${medicine.id}`}
                          placeholder="e.g., Paracetamol"
                          value={medicine.name}
                          onChange={(e) =>
                            updateMedicine(medicine.id, "name", e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor={`medicine-strength-${medicine.id}`}>
                          Strength
                        </Label>
                        <Input
                          id={`medicine-strength-${medicine.id}`}
                          placeholder="e.g., 500mg"
                          value={medicine.strength}
                          onChange={(e) =>
                            updateMedicine(
                              medicine.id,
                              "strength",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor={`medicine-frequency-${medicine.id}`}>
                          Frequency
                        </Label>
                        <Select
                          value={medicine.frequency}
                          onValueChange={(value) =>
                            updateMedicine(medicine.id, "frequency", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            {frequencyOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor={`medicine-days-${medicine.id}`}>
                          Days
                        </Label>
                        <Input
                          id={`medicine-days-${medicine.id}`}
                          type="number"
                          min="1"
                          placeholder="e.g., 7"
                          value={medicine.days || ""}
                          onChange={(e) =>
                            updateMedicine(
                              medicine.id,
                              "days",
                              Number.parseInt(e.target.value) || 0
                            )
                          }
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* ✅ Medicine Summary with AI knowledge */}
              {medicines.some((med) => med.name.trim()) && (
                <Card className="border border-primary mt-6">
                  <CardHeader>
                    <CardTitle>Medicine Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      {medicines
                        .filter((med) => med.name.trim())
                        .map((med, idx) => (
                          <li key={med.id} className="border-b pb-3">
                            <div className="flex justify-between items-center">
                              <span>
                                <strong>{med.name}</strong> – {med.strength},{" "}
                                {med.frequency}, {med.days} days
                              </span>
                              <Badge variant="outline">{idx + 1}</Badge>
                            </div>

                            {/* ✅ Show AI-generated summary */}
                            {med.summary && med.summary.trim() !== "" && (
                              <div className="mt-2 bg-muted p-2 rounded text-gray-600 text-sm leading-relaxed font-bold">
                                {med.summary}
                              </div>
                            )}
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Separator />

              {/* Additional Notes */}
              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional instructions for the patient..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={handleReview}
                  disabled={!isFormValid()}
                  className="flex-1"
                >
                  Review Prescription
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
