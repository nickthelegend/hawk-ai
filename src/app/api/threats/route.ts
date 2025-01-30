import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const jsonFile: File | null = data.get("json_file") as unknown as File
    const accessKey = data.get("accessKey") as string
    const ipAddress = data.get("ipAddress") as string
    const desktopName = data.get("desktopName") as string

    if (!jsonFile || !accessKey || !ipAddress || !desktopName) {
      return NextResponse.json(
        {
          error: "Missing required fields: json_file, accessKey, ipAddress, or desktopName",
        },
        { status: 400 },
      )
    }

    // Verify access key
    const { data: computer, error: computerError } = await supabase
      .from("computers")
      .select("*")
      .eq("access_key", accessKey)
      .single()

    if (computerError || !computer) {
      return NextResponse.json(
        {
          error: "Invalid access key",
        },
        { status: 401 },
      )
    }

    // Update last_seen and IP address
    await supabase
      .from("computers")
      .update({
        last_seen: new Date().toISOString(),
        ip_address: ipAddress,
        desktop_name: desktopName,
      })
      .eq("id", computer.id)

    const jsonContent = await jsonFile.text()
    const threats = JSON.parse(jsonContent)

    // Store JSON file in Supabase storage
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const jsonFilePath = `threats/${accessKey}/${timestamp}.json`

    const { error: jsonUploadError } = await supabase.storage
      .from("chainsaw-results")
      .upload(jsonFilePath, jsonContent, {
        contentType: "application/json",
        upsert: true,
        cacheControl: "3600",
      })

    if (jsonUploadError) {
      console.error("Error uploading JSON to storage:", jsonUploadError)
      return NextResponse.json(
        {
          error: "Error uploading JSON to storage",
          details: jsonUploadError,
        },
        { status: 500 },
      )
    }

    // Insert threats into the database
    const { error: insertError } = await supabase.from("threats").insert(
      threats.map((threat: any) => ({
        computer_id: computer.id,
        timestamp: threat.timestamp,
        name: threat.name,
        level: threat.level,
        source: threat.source,
        authors: threat.authors,
        tags: threat.tags,
        event_data: threat.document.data,
        ip_address: ipAddress,
        desktop_name: desktopName,
      })),
    )

    if (insertError) {
      console.error("Error inserting threats:", insertError)
      return NextResponse.json(
        {
          error: "Error inserting threats",
          details: insertError,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      message: "Threats processed and stored successfully",
      jsonPath: jsonFilePath,
    })
  } catch (error) {
    console.error("Error processing threats:", error)
    return NextResponse.json(
      {
        error: "Error processing threats",
      },
      { status: 500 },
    )
  }
}

