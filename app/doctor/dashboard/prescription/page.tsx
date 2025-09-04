"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PrescriptionPage() {
  const [form, setForm] = useState({
    patient: "Fatima Mulla", // hardcoded for prototype
    diagnosis: "",
    medication: "",
    dosage: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Prescription created:", form);
    alert("Prescription saved (dummy prototype) ✅");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Prescription</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div>
          <Label htmlFor="patient">Patient</Label>
          <Input id="patient" type="text" value={form.patient} disabled />
        </div>

        <div>
          <Label htmlFor="diagnosis">Diagnosis</Label>
          <Input
            id="diagnosis"
            name="diagnosis"
            type="text"
            placeholder="e.g. Fever, Cough"
            value={form.diagnosis}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="medication">Medication</Label>
          <Input
            id="medication"
            name="medication"
            type="text"
            placeholder="e.g. Paracetamol"
            value={form.medication}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="dosage">Dosage</Label>
          <Input
            id="dosage"
            name="dosage"
            type="text"
            placeholder="e.g. 500mg twice daily"
            value={form.dosage}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="Any advice or special instructions..."
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full">Save Prescription</Button>
      </form>
    </div>
  );
}
