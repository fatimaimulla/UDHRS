"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FileText, Calendar } from "lucide-react"

export function ReportSummarization() {
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState("")

  // Mock uploaded reports (later fetch from backend / UploadDocuments state)
  const uploadedReports = [
    { id: "1", name: "Blood Test Report.pdf", uploadedOn: "2025-08-20" },
    { id: "2", name: "X-Ray Scan.pdf", uploadedOn: "2025-08-25" },
    { id: "3", name: "MRI Report.pdf", uploadedOn: "2025-09-01" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Report Summarization</h2>
        <p className="text-muted-foreground">
          View AI-generated summaries of your medical reports or periodic summaries over time.
        </p>
      </div>

      <Tabs defaultValue="individual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individual">Individual Reports</TabsTrigger>
          <TabsTrigger value="periodic">Periodic Summary</TabsTrigger>
        </TabsList>

        {/* Individual Reports Tab */}
        <TabsContent value="individual" className="mt-6 space-y-4">
          <Select onValueChange={(val) => setSelectedReports([val])}>
            <SelectTrigger>
              <SelectValue placeholder="Select a report" />
            </SelectTrigger>
            <SelectContent>
              {uploadedReports.map((report) => (
                <SelectItem key={report.id} value={report.id}>
                  {report.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedReports.map((reportId) => {
            const report = uploadedReports.find((r) => r.id === reportId)
            return (
              <Card key={reportId} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {report?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Uploaded on {report?.uploadedOn}
                  </p>
                  <p className="mt-2">
                    <strong>Summary:</strong> This is a mock summary of {report?.name}. The system
                    will provide key findings and insights here.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">View Report</Button>
                    <Button variant="secondary" size="sm">Download Summary</Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        {/* Periodic Summary Tab */}
        <TabsContent value="periodic" className="mt-6 space-y-4">
          <Select onValueChange={setSelectedPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1M">Last 1 Month</SelectItem>
              <SelectItem value="2M">Last 2 Months</SelectItem>
              <SelectItem value="3M">Last 3 Months</SelectItem>
              <SelectItem value="6M">Last 6 Months</SelectItem>
              <SelectItem value="1Y">Last 1 Year</SelectItem>
            </SelectContent>
          </Select>

          {selectedPeriod && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Summary for {selectedPeriod}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Summary:</strong> Mock periodic summary covering reports from{" "}
                  {selectedPeriod}.
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                  <li>Blood sugar levels stable.</li>
                  <li>No abnormalities in X-Ray.</li>
                  <li>Improvement observed compared to last summary.</li>
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
