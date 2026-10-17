// GET /api/db/ping checks that the local SQLite database opens, and lists its tables.

import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const { version } = db().prepare("SELECT sqlite_version() AS version").get() as { version: string }
    const tables = db()
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
      .all()
      .map((row) => (row as { name: string }).name)
    return NextResponse.json({ ok: true, sqlite: version, tables })
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 })
  }
}
