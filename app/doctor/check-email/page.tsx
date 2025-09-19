import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, User, ArrowLeft, Clock, Shield } from "lucide-react"

export default function PatientCheckEmailPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Mail className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <User className="h-6 w-6 text-accent" />
              Check Your Email
            </CardTitle>
            <CardDescription className="text-base">
              We've sent a secure magic link to your registered email address
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">Secure NMC ID Authentication</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  The magic link is associated with your verified NMC ID and will provide secure access to your health
                  records.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Click the link in your email to complete sign-in. The link will expire in 15 minutes for security.
                </p>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Magic link expires in 15 minutes</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Didn't receive the email? Check your spam folder or
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Resend Magic Link
                </Button>
              </div>

              <div className="text-center">
                <Link href="/doctor/login">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Login
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Having trouble? Contact support for assistance with NMC ID verification.
          </p>
        </div>
      </div>
    </div>
  )
}
