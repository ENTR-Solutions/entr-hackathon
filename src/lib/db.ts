// A small local SQLite database for your prototype (server-side only: route handlers, server actions,
// server components). It uses SQLite built into Node.js 22.13+, so there is nothing to install.
// The file is data/app.db, which git ignores: every laptop has its own data.
// Tables live in data/schema.sql. Changed an existing table? Stop the dev server, run `npm run db:reset`,
// and start it again.

import fs from "node:fs"
import path from "node:path"
import { DatabaseSync } from "node:sqlite"

const DATA_DIR = path.join(process.cwd(), "data")
const DB_FILE = path.join(DATA_DIR, "app.db")
const SCHEMA_FILE = path.join(DATA_DIR, "schema.sql")

// Keep one connection across hot reloads in development.
const globalForDb = globalThis as unknown as { db?: DatabaseSync; schemaMtime?: number }

/**
 * The database connection. Always pass values as parameters, never paste them into the SQL:
 *   db().prepare("INSERT INTO notes (text) VALUES (?)").run(text)
 *   db().prepare("SELECT * FROM notes ORDER BY id DESC").all()
 */
export function db(): DatabaseSync {
  if (!globalForDb.db) {
    const database = new DatabaseSync(DB_FILE)
    database.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;")
    globalForDb.db = database
  }
  // Re-run the schema when data/schema.sql changed, so a new table works without restarting the dev server.
  const mtime = fs.statSync(SCHEMA_FILE).mtimeMs
  if (mtime !== globalForDb.schemaMtime) {
    globalForDb.db.exec(fs.readFileSync(SCHEMA_FILE, "utf-8"))
    globalForDb.schemaMtime = mtime
  }
  return globalForDb.db
}
