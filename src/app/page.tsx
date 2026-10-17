import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { listSnapshots } from "@/lib/sources"

// Always render fresh, so new snapshots in data/private show up.
export const dynamic = "force-dynamic"

// The start page. Teams build their own pages under src/app/<team>/, so leave this one as it is.
export default function StartPage() {
  const snapshots = listSnapshots()

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-primary to-[hsl(var(--primary-deep))] p-8 text-primary-foreground">
        <p className="text-sm font-medium uppercase tracking-widest opacity-80">Hackathon Dakhla</p>
        <h1 className="mt-2 text-4xl">Bouw iets waar ENTR beter van wordt</h1>
        <p className="mt-4 max-w-2xl text-lg opacity-90">
          Voor klanten of voor onszelf. Begin in Claude: typ{" "}
          <code className="rounded bg-white/15 px-1.5 py-0.5">/start-team</code>.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Zo begin je</CardTitle>
          <CardDescription>Alles gebeurt in de Claude-desktopapp, in deze map.</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal space-y-2 pl-5 text-sm">
            <li>
              Typ <code>/start-team</code>: Claude maakt je teambranch en een map voor jullie werk.
            </li>
            <li>
              Nog geen idee? <code>/bmad-brainstorming</code>. Wel een idee? Zet het onder druk met{" "}
              <code>/bmad-forge-idea</code>.
            </li>
            <li>Schrijf de probleemstelling op: voor wie, welk probleem, en wanneer is het gelukt.</li>
            <li>Bouw, en bekijk het resultaat in het previewvenster.</li>
          </ol>
        </CardContent>
      </Card>

      {snapshots.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Snapshots op deze laptop</CardTitle>
            <CardDescription>Opgehaald uit bedrijfssystemen met /snapshot. Ze blijven op deze laptop.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              {snapshots.map((s) => (
                <li key={`${s.source}/${s.name}`}>
                  <span className="font-medium">
                    {s.source}/{s.name}
                  </span>{" "}
                  <span className="text-muted-foreground">
                    · {s.record_count} records · {s.taken_at} · {s.query}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
