"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Upload, Trash2, Eye, Search, Download } from "lucide-react"

const API_BASE = process.env.NEXT_PUBLIC_API_URL

interface DocumentItem {
  id: string
  name: string
  category: "Reports" | "Scans" | "Prescriptions" | "Others"
  uploadedAt: Date
  fileUrl: string
}

export function UploadDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [category, setCategory] = useState<DocumentItem["category"]>("Reports")
  const [activeTab, setActiveTab] = useState<DocumentItem["category"]>("Reports")
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch documents from backend
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

  // File select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  // Add document
  const handleAddDocument = async () => {
    if (!file) return
    try {
      // Step 1: Upload file to Cloudinary
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        alert("Cloudinary upload failed")
        return
      }

      const uploadData = await res.json()
      const cloudUrl = uploadData.url // Cloudinary permanent URL

      // Step 2: Save metadata to backend
      const savedToken = localStorage.getItem("authToken")
      const body = {
        abhaId: "12-3456-7890-0001", // replace dynamically if needed
        fileName: file.name,
        category: category,
        url: cloudUrl,
      }

      const postRes = await fetch(`${API_BASE}/auth/postReport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedToken}`,
        },
        body: JSON.stringify(body),
      })

      if (!postRes.ok) throw new Error("Failed to save metadata")

      const savedDoc = await postRes.json()

      // Step 3: Update local state with returned document
      const newDoc: DocumentItem = {
        id: savedDoc._id,
        name: savedDoc.fileName,
        category: savedDoc.category,
        uploadedAt: new Date(savedDoc.uploadedAt),
        fileUrl: savedDoc.url,
      }

      setDocuments((prev) => [...prev, newDoc])
      setFile(null)
      setOpen(false)
    } catch (err) {
      console.error(err)
    }
  }

  // Delete doc (only client-side removal here)
  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  // Download doc
  const handleDownload = (doc: DocumentItem) => {
    const link = document.createElement("a")
    link.href = doc.fileUrl
    link.download = doc.name
    link.click()
  }

  const categories: DocumentItem["category"][] = ["Reports", "Scans", "Prescriptions", "Others"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Documents</h2>
        <Button onClick={() => setOpen(true)}>
          <Upload className="w-4 h-4 mr-2" /> Add Document
        </Button>
      </div>

      {/* Tabs for categories */}
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-6 space-y-4">
            {/* Search bar */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder={`Search ${cat.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Documents list */}
            {documents.filter(
              (doc) => doc.category === cat && doc.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0 ? (
              <Card>
                <CardContent className="text-center py-6 text-muted-foreground">
                  No {cat.toLowerCase()} uploaded
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {documents
                  .filter(
                    (doc) =>
                      doc.category === cat &&
                      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((doc) => (
                    <Card key={doc.id} className="p-3">
                      <div className="flex items-center justify-between">
                        {/* Left side: name + date */}
                        <div className="flex flex-col gap-1">
                          <p className="text-md font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Uploaded on {doc.uploadedAt.toLocaleDateString()}
                          </p>
                        </div>

                        {/* Right side: buttons */}
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(doc.fileUrl, "_blank")}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(doc)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Add Document Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input type="file" onChange={handleFileChange} />
            <Select value={category} onValueChange={(val) => setCategory(val as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDocument} disabled={!file}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
