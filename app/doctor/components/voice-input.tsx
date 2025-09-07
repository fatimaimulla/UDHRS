"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mic, MicOff, Volume2, Loader2, Wand2 } from "lucide-react"

interface Medicine {
  id: string
  name: string
  strength: string
  frequency: string
  days: number
}

interface VoiceInputProps {
  onMedicinesGenerated: (medicines: Medicine[]) => void
  onNotesGenerated: (notes: string) => void
}

// Simulate AI processing of voice transcript
// const processVoiceTranscript = async (transcript: string): Promise<{ medicines: Medicine[]; notes: string }> => {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 2000))

//   // Mock AI processing - in real implementation, this would call your AI backend
//   const mockMedicines: Medicine[] = []
//   const lines = transcript.toLowerCase().split(/[.,;]/)

//   let medicineCounter = 1

//   for (const line of lines) {
//     if (line.includes("paracetamol") || line.includes("acetaminophen")) {
//       mockMedicines.push({
//         id: medicineCounter.toString(),
//         name: "Paracetamol",
//         strength: "500mg",
//         frequency: line.includes("twice") ? "BD" : line.includes("three times") ? "TDS" : "OD",
//         days: line.includes("week")
//           ? 7
//           : line.includes("days")
//             ? Number.parseInt(line.match(/(\d+)\s*days?/)?.[1] || "5")
//             : 5,
//       })
//       medicineCounter++
//     }

//     if (line.includes("ibuprofen")) {
//       mockMedicines.push({
//         id: medicineCounter.toString(),
//         name: "Ibuprofen",
//         strength: "400mg",
//         frequency: line.includes("twice") ? "BD" : line.includes("three times") ? "TDS" : "BD",
//         days: line.includes("week")
//           ? 7
//           : line.includes("days")
//             ? Number.parseInt(line.match(/(\d+)\s*days?/)?.[1] || "3")
//             : 3,
//       })
//       medicineCounter++
//     }

//     if (line.includes("amoxicillin") || line.includes("antibiotic")) {
//       mockMedicines.push({
//         id: medicineCounter.toString(),
//         name: "Amoxicillin",
//         strength: "250mg",
//         frequency: "TDS",
//         days: line.includes("week") ? 7 : 5,
//       })
//       medicineCounter++
//     }
//   }

//   // If no medicines detected, create a sample one
//   if (mockMedicines.length === 0) {
//     mockMedicines.push({
//       id: "1",
//       name: "Paracetamol",
//       strength: "500mg",
//       frequency: "BD",
//       days: 5,
//     })
//   }

//   // Extract notes
//   const notes =
//     transcript.includes("note") || transcript.includes("instruction")
//       ? "Take with food. Complete the full course as prescribed."
//       : ""

//   return { medicines: mockMedicines, notes }
// }
const processVoiceTranscript = async (
  transcript: string
): Promise<{ medicines: Medicine[]; notes: string }> => {
  const res = await fetch("/api/parse-prescription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ transcript }),
  });

  const result = await res.json();

  if (result.error) {
    throw new Error(result.error);
  }

  const medicines = result.medicine.map((name: string, i: number) => ({
    id: `${i}`,
    name,
    strength: result.medicineStrength[i] || "",
    frequency: result.frequencyForDay[i] || "",
    days: Number(result.forHowManyDays[i]) || 0,
  }));

  return {
    medicines,
    notes: result.notes || "",
  };
};


export function VoiceInput({ onMedicinesGenerated, onNotesGenerated }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [finalTranscript, setFinalTranscript] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [isSupported, setIsSupported] = useState(true)

  const recognitionRef = useRef<any>(null)
 const timeoutRef = useRef<NodeJS.Timeout | null>(null)


  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) {
        setIsSupported(false)
        return
      }

      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setError("")
        
      }

      recognition.onresult = (event: any) => {
        let interimTranscript = ""
        let finalTranscriptPart = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscriptPart += transcript
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(interimTranscript)
        if (finalTranscriptPart) {
          setFinalTranscript((prev) => prev + finalTranscriptPart + " ")
        }

      
      }

      recognition.onerror = (event: any) => {
        setError(`Speech recognition error: ${event.error}`)
        setIsListening(false)
      }

      recognition.onend = () => {

        setIsListening(false)
        setTranscript("")
      }

      recognitionRef.current = recognition
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const startListening = () => {
    if (!recognitionRef.current || isListening) return

    setError("")
    setTranscript("")
    setFinalTranscript("")
    setIsListening(true)

    try {
      recognitionRef.current.start()
    } catch (error) {

      setError("Failed to start speech recognition")
      setIsListening(false)
    }
  }

  const stopListening = () => {
    if (!recognitionRef.current || !isListening) return

    recognitionRef.current.stop()
    setIsListening(false)
  }

  const processTranscript = async () => {
    if (!finalTranscript.trim()) {
      setError("No speech detected. Please try again.")
      return
    }

    setIsProcessing(true)
    try {
      const result = await processVoiceTranscript(finalTranscript)
      onMedicinesGenerated(result.medicines)
      if (result.notes) {
        onNotesGenerated(result.notes)
      }

      // Reset transcript after successful processing
      setFinalTranscript("")
      setTranscript("")
    } catch (error) {

      setError("Failed to process voice input. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const clearTranscript = () => {
    setFinalTranscript("")
    setTranscript("")
    setError("")
  }

  if (!isSupported) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <MicOff className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Speech Recognition Not Supported</h3>
              <p className="text-muted-foreground">
                Your browser doesn't support speech recognition. Please use Chrome or Edge for voice input.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Voice Recording Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Voice Input
          </CardTitle>
          <CardDescription>Speak your prescription details and we'll convert them to structured form</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={startListening}
              disabled={isListening || isProcessing}
              size="lg"
              className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
            >
              {isListening ? (
                <>
                  <Volume2 className="mr-2 h-5 w-5 animate-pulse" />
                  Listening...
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-5 w-5" />
                  Start Recording
                </>
              )}
            </Button>

            {isListening && (
              <Button onClick={stopListening} variant="outline" size="lg">
                <MicOff className="mr-2 h-4 w-4" />
                Stop Recording
              </Button>
            )}
          </div>

          {isListening && (
            <div className="text-center">
              <Badge variant="secondary" className="animate-pulse">
                <Volume2 className="mr-1 h-3 w-3" />
                Recording in progress...
              </Badge>
            </div>
          )}

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live Transcript */}
      {(transcript || finalTranscript) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Live Transcript</CardTitle>
            <CardDescription>Your speech is being converted to text in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {finalTranscript && (
                <div>
                  <Badge variant="outline" className="mb-2">
                    Final
                  </Badge>
                  <p className="text-sm bg-muted p-3 rounded-lg">{finalTranscript}</p>
                </div>
              )}

              {transcript && (
                <div>
                  <Badge variant="secondary" className="mb-2">
                    Live
                  </Badge>
                  <p className="text-sm bg-accent/20 p-3 rounded-lg italic">{transcript}</p>
                </div>
              )}
            </div>

            <Separator className="my-4" />

            <div className="flex gap-3">
              <Button onClick={processTranscript} disabled={!finalTranscript.trim() || isProcessing} className="flex-1">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Prescription
                  </>
                )}
              </Button>

              <Button onClick={clearTranscript} variant="outline">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Voice Input Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Example:</strong> "Prescribe paracetamol 500mg twice daily for 5 days, and ibuprofen 400mg three
              times daily for 3 days"
            </p>
            <p>
              <strong>Tips:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Speak clearly and at a normal pace</li>
              <li>Include medicine name, strength, frequency, and duration</li>
              <li>Use terms like "twice daily", "three times daily", "once daily"</li>
              <li>Mention duration as "for X days" or "for one week"</li>
              <li>Add any special instructions at the end</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
