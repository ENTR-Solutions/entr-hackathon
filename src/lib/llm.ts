// Call Claude from your prototype (server-side only: route handlers, server actions, server components).
// The key comes from .env.local (ANTHROPIC_API_KEY). It is a shared hackathon key with a spending cap: be reasonable.

import Anthropic from "@anthropic-ai/sdk"

export const DEFAULT_MODEL = process.env.LLM_MODEL || "claude-sonnet-5-5"
/** Cheaper and faster, fine for classification and short drafts. */
export const FAST_MODEL = "claude-haiku-4-5-20251001"

let client: Anthropic | null = null

function getClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY ontbreekt. Kopieer .env.example naar .env.local, plak de hackathon-sleutel en herstart de dev-server.",
    )
  }
  client ??= new Anthropic()
  return client
}

export interface AskOptions {
  system?: string
  model?: string
  maxTokens?: number
}

/** Send one prompt, get plain text back. */
export async function ask(prompt: string, opts: AskOptions = {}): Promise<string> {
  const response = await getClient().messages.create({
    model: opts.model ?? DEFAULT_MODEL,
    max_tokens: opts.maxTokens ?? 1024,
    ...(opts.system ? { system: opts.system } : {}),
    messages: [{ role: "user", content: prompt }],
  })
  return response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("")
}

/**
 * Ask for JSON and parse it. Describe the shape you want in the prompt, e.g.
 *   askJson<{ category: string }>('Classify this email ... Answer as JSON: {"category": "..."}')
 */
export async function askJson<T>(prompt: string, opts: AskOptions = {}): Promise<T> {
  const text = await ask(`${prompt}\n\nRespond with JSON only, no explanation and no code fences.`, opts)
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "")
  try {
    return JSON.parse(cleaned) as T
  } catch {
    throw new Error(`Het model gaf geen geldige JSON terug:\n${text}`)
  }
}
