// GET /api/llm/ping checks that the shared API key in .env.local works.

import { NextResponse } from "next/server"
import { ask, DEFAULT_MODEL } from "@/lib/llm"

export async function GET() {
  try {
    const reply = await ask("Reply with exactly: pong", { maxTokens: 10 })
    return NextResponse.json({ ok: true, model: DEFAULT_MODEL, reply })
  } catch (error) {
    return NextResponse.json({ ok: false, model: DEFAULT_MODEL, error: String(error) }, { status: 500 })
  }
}
