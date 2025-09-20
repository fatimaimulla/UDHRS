"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FileText, Calendar } from "lucide-react"

const API_BASE = process.env.NEXT_PUBLIC_API_URL

interface DocumentItem {
  id: string
  name: string
  category: "Reports" | "Scans" | "Prescriptions" | "Others"
  uploadedAt: Date
  fileUrl: string
}

export function ReportSummarization() {
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState("")
const savedToken = localStorage.getItem("authToken")
  // Fetch documents from backend
  const handleSummary = async () => {
  try {
    console.log("Generating summary for reports:", selectedReports[0]);

    const res = await fetch(`${API_BASE}/api/report-summarize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${savedToken}`, // 👈 add token here
      },
      body: JSON.stringify({ report: selectedReports[0] }),
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    const data = await res.json();
    console.log("Summary response:", data);

    return data;
  } catch (err) {
    console.error("Error summarizing report:", err);
  }
};
  const fetchDocuments = async () => {
    try {
      const savedToken = localStorage.getItem("authToken")
      const res = await fetch(`${API_BASE}/auth/getReport`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      })
      if (!res.ok) throw new Error("Failed to fetch documents")

      const data = await res.json()
      const mappedDocs: DocumentItem[] = data.map((doc: any) => ({
        id: doc._id,
        name: doc.fileName,
        category: doc.category,
        uploadedAt: new Date(doc.uploadedAt),
        fileUrl: doc.url,
      }))

      setDocuments(mappedDocs)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

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
              {documents.map((report) => (
                <SelectItem key={report.id} value={report.fileUrl}>
                  {report.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedReports.map((reportId) => {
            const report = documents.find((r) => r.id === reportId)
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
                    Uploaded on {report?.uploadedAt.toLocaleDateString()}
                  </p>
                  <p className="mt-2">
                    <strong>Summary:</strong> This will be an AI-generated summary of{" "}
                    {report?.name}. (currently placeholder)
                  </p>
                  <div className="flex gap-2 mt-4">
                    
                    <Button className="bg-black" size="sm" onClick={handelSummary}>Generate Summary</Button>
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
