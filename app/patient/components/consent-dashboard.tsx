"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Shield, UserCheck, X, Check } from "lucide-react"

//
// ---- MOCK TYPES & DATA ----
//
type ConsentStatus = "pending" | "active" | "revoked" | "expired"
type DataType = "Prescriptions" | "Lab Reports" | "Medical History"
type AccessType = "Temporary 3 Hours" | "Permanent"

interface ConsentRequest {
  id: string
  doctorName: string
  requestedAt: Date
  approvedAt?: Date
  revokedAt?: Date
  expiresAt?: Date
  status: ConsentStatus
  dataTypes: DataType[]
  accessType: AccessType
}

// Fake data for demo
const MOCK_CONSENTS: ConsentRequest[] = [
  {
    id: "1",
    doctorName: "Dr. Mehta",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60),
    status: "pending",
    dataTypes: ["Prescriptions", "Lab Reports"],
    accessType: "Temporary 3 Hours",
  },
  {
    id: "2",
    doctorName: "Dr. Sharma",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    approvedAt: new Date(Date.now() - 1000 * 60 * 30),
    status: "active",
    dataTypes: ["Medical History"],
    accessType: "Permanent",
  },
  {
    id: "3",
    doctorName: "Dr. Rao",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    approvedAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // Example: 5 hours ago
    revokedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),  // Example: 2 hours ago
    status: "revoked",
    dataTypes: ["Prescriptions"],
    accessType: "Temporary 3 Hours",
  }
]

//
// ---- MOCK FUNCTIONS ----
//
function getConsentsByStatus(status: ConsentStatus): ConsentRequest[] {
  return MOCK_CONSENTS.filter((c) => c.status === status)
}

function updateConsentStatusWithNotification(id: string, newStatus: ConsentStatus) {
  const consent = MOCK_CONSENTS.find((c) => c.id === id)
  if (consent) {
    consent.status = newStatus
    if (newStatus === "active") consent.approvedAt = new Date()
    if (newStatus === "revoked") consent.revokedAt = new Date()
  }
  console.log(`Consent ${id} updated to ${newStatus}`)
}

//
// ---- UI COMPONENT ----
//
export function ConsentDashboard() {
  const [pendingConsents, setPendingConsents] = useState<ConsentRequest[]>([])
  const [activeConsents, setActiveConsents] = useState<ConsentRequest[]>([])
  const [revokedConsents, setRevokedConsents] = useState<ConsentRequest[]>([])

  useEffect(() => {
    loadConsents()
  }, [])

  const loadConsents = () => {
    setPendingConsents(getConsentsByStatus("pending"))
    setActiveConsents(getConsentsByStatus("active"))
    setRevokedConsents([...getConsentsByStatus("revoked"), ...getConsentsByStatus("expired")])
  }

  const handleApprove = (id: string) => {
    updateConsentStatusWithNotification(id, "active")
    loadConsents()
  }

  const handleReject = (id: string) => {
    updateConsentStatusWithNotification(id, "revoked")
    loadConsents()
  }

  const handleRevoke = (id: string) => {
    updateConsentStatusWithNotification(id, "revoked")
    loadConsents()
  }

  const getAccessTypeBadge = (accessType: AccessType) => {
    if (accessType === "Temporary 3 Hours") {
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Temporary (3h)
        </Badge>
      )
    }
    return (
      <Badge variant="default" className="flex items-center gap-1">
        <Shield className="w-3 h-3" />
        Permanent Access
      </Badge>
    )
  }

  const formatDateTime = (date: Date) =>
    date.toLocaleDateString() +
    " at " +
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  const ConsentCard = ({
    consent,
    showActions = false,
    showRevokeAction = false,
  }: {
    consent: ConsentRequest
    showActions?: boolean
    showRevokeAction?: boolean
  }) => (
    <Card className="mb-4 border border-border bg-card shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{consent.doctorName}</CardTitle>
          {getAccessTypeBadge(consent.accessType)}
        </div>
        <CardDescription>Requested on {formatDateTime(consent.requestedAt)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Data Types Requested:</p>
            <div className="flex flex-wrap gap-2">
              {consent.dataTypes.map((dataType) => (
                <Badge key={dataType} className="bg-gray-200 text-black">
                  {dataType}
                </Badge>
              ))}
            </div>
          </div>

          {/* Active Consents - Show Approved Date */}
          {consent.status === "active" && consent.approvedAt && (
            <p className="text-sm text-green-600">
              Approved on {formatDateTime(consent.approvedAt)}
            </p>
          )}

          {/* Revoked Consents - Show Access Granted + Revoked Date */}
          {consent.status === "revoked" && consent.revokedAt && (
            <div className="space-y-1">
              {consent.approvedAt && (
                <p className="text-sm text-green-600">
                  Access granted on {formatDateTime(consent.approvedAt)}
                </p>
              )}
              <p className="text-sm text-red-600">
                Revoked on {formatDateTime(consent.revokedAt)}
              </p>
            </div>
          )}

          {showActions && (
            <div className="flex gap-2 pt-2">
              <Button onClick={() => handleApprove(consent.id)} size="sm" className="flex items-center gap-1 bg-green-600">
                <Check className="w-4 h-4" />
                Approve
              </Button>
              <Button
                onClick={() => handleReject(consent.id)}
                variant="destructive"
                size="sm"
                className="flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Reject
              </Button>
            </div>
          )}

          {showRevokeAction && (
            <div className="pt-2">
              <Button
                onClick={() => handleRevoke(consent.id)}
                variant="destructive"
                size="sm"
                className="flex items-center gap-1"
              >
                <X className="w-4" />
                Revoke Access
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Consent Management</h2>
        <p className="text-muted-foreground">Manage your healthcare data sharing permissions</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Pending ({pendingConsents.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            Active ({activeConsents.length})
          </TabsTrigger>
          <TabsTrigger value="revoked" className="flex items-center gap-2">
            <X className="w-4 h-4" />
            Revoked ({revokedConsents.length})
          </TabsTrigger>
        </TabsList>

        {/* Pending Tab */}
        <TabsContent value="pending" className="mt-6">
          {pendingConsents.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No pending consent requests</p>
              </CardContent>
            </Card>
          ) : (
            pendingConsents.map((consent) => (
              <ConsentCard key={consent.id} consent={consent} showActions />
            ))
          )}
        </TabsContent>

        {/* Active Tab */}
        <TabsContent value="active" className="mt-6">
          {activeConsents.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <UserCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No active consents</p>
              </CardContent>
            </Card>
          ) : (
            activeConsents.map((consent) => (
              <ConsentCard key={consent.id} consent={consent} showRevokeAction />
            ))
          )}
        </TabsContent>

        {/* Revoked Tab */}
        <TabsContent value="revoked" className="mt-6">
          {revokedConsents.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <X className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No revoked or expired consents</p>
              </CardContent>
            </Card>
          ) : (
            revokedConsents.map((consent) => <ConsentCard key={consent.id} consent={consent} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
