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

    // Update last_seen, IP address, and desktop name
    await supabase
      .from("computers")
      .update({
        last_seen: new Date().toISOString(),
        ip_address: ipAddress,
        desktop_name: desktopName,
      })
      .eq("id", computer.id)

    const jsonContent = await jsonFile.text()
    const chainsawLogs = JSON.parse(jsonContent)

    if (chainsawLogs.length === 0) {
      return NextResponse.json({
        message: "No chainsaw logs to process",
      })
    }

    // Store JSON file in Supabase storage
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const jsonFilePath = `chainsaw_logs/${accessKey}/${timestamp}.json`

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

    // Insert chainsaw logs into the database
    const { error: insertError } = await supabase.from("chainsaw_logs").insert(
      chainsawLogs.map((log: any) => ({
        computer_id: computer.id,
        timestamp: log.timestamp,
        group_name: log.group,
        kind: log.kind,
        name: log.name,
        level: log.level,
        source: log.source,
        status: log.status,
        authors: log.authors,
        tags: log.tags,
        event_data: log.document?.data,
        document_kind: log.document?.kind,
        document_path: log.document?.path,
        false_positives: log.falsepositives,
        log_id: log.id,
        logsource: log.logsource,
        reference_links: log.references,
        ip_address: ipAddress,
        desktop_name: desktopName,
      })),
    )

    if (insertError) {
      console.error("Error inserting chainsaw logs:", insertError)
      return NextResponse.json(
        {
          error: "Error inserting chainsaw logs",
          details: insertError,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      message: "Chainsaw logs processed and stored successfully",
      jsonPath: jsonFilePath,
    })
  } catch (error) {
    console.error("Error processing chainsaw logs:", error)
    return NextResponse.json(
      {
        error: "Error processing chainsaw logs",
      },
      { status: 500 },
    )
  }
}

