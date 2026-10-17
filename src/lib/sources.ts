// Snapshots of real company systems (HubSpot, Notion, Fireflies, ...) that Claude pulled through
// your own connectors with the /snapshot skill. They live in data/private/<source>/<name>.json,
// which git ignores: they stay on the laptop that took them. Prototypes read them from here,
// so the app itself never needs credentials and the demo keeps working offline.

import fs from "node:fs"
import path from "node:path"

const PRIVATE_DIR = path.join(process.cwd(), "data", "private")

export interface SnapshotMeta {
  source: string
  name: string
  taken_at: string
  taken_by: string
  query: string
  fields_removed: string[]
  record_count: number
}

export interface Snapshot<T> {
  _meta: SnapshotMeta
  records: T[]
}

/** Read a snapshot, or null when this laptop does not have it (run /snapshot to create it). */
export function readSnapshot<T = Record<string, unknown>>(source: string, name: string): Snapshot<T> | null {
  const file = path.join(PRIVATE_DIR, source, `${name}.json`)
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, "utf-8")) as Snapshot<T>
}

/** All snapshots on this laptop. */
export function listSnapshots(): SnapshotMeta[] {
  if (!fs.existsSync(PRIVATE_DIR)) return []
  return fs
    .readdirSync(PRIVATE_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .flatMap((dir) =>
      fs
        .readdirSync(path.join(PRIVATE_DIR, dir.name))
        .filter((f) => f.endsWith(".json"))
        .map((f) => readSnapshot(dir.name, f.replace(/\.json$/, ""))?._meta)
        .filter((m): m is SnapshotMeta => Boolean(m)),
    )
}
