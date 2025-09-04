import { Card, CardHeader, CardContent } from "@/components/ui/card";

const prescriptions = [
  {
    patient: "Fatima Mulla",
    diagnosis: "Fever",
    medication: "Paracetamol",
    dosage: "500mg twice daily",
    date: "2025-09-01",
  },
  {
    patient: "John Doe",
    diagnosis: "Hypertension",
    medication: "Amlodipine",
    dosage: "5mg daily",
    date: "2025-08-30",
  },
];

export default function HistoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Prescription History</h1>
      <div className="space-y-4">
        {prescriptions.map((p, i) => (
          <Card key={i}>
            <CardHeader>
              <h3 className="font-semibold">{p.patient}</h3>
              <p className="text-sm text-gray-500">{p.date}</p>
            </CardHeader>
            <CardContent>
              <p><strong>Diagnosis:</strong> {p.diagnosis}</p>
              <p><strong>Medication:</strong> {p.medication}</p>
              <p><strong>Dosage:</strong> {p.dosage}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
