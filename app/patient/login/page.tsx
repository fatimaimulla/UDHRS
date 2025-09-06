import { PatientLoginForm } from "../components/patient-login-form"

export default function PatientLoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Patient Portal</h1>
          <p className="text-muted-foreground">Access Your Health Records with ABHA ID</p>
        </div>
        <PatientLoginForm />
      </div>
    </div>
  )
}
