import { PatientCard } from "./components/PatientCard";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome, Dr. Mehta 👨‍⚕️</h1>
      <p className="mb-4">Here are your patients:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PatientCard
          name="Fatima Mulla"
          email="fatima@example.com"
          dob="1999-07-10"
        />
        <PatientCard
          name="John Doe"
          email="john@example.com"
          dob="1995-03-15"
        />
      </div>
    </div>
  );
}
