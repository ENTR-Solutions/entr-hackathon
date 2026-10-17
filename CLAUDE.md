# CLAUDE.md

Starter-repo voor de ENTR-hackathon in Dakhla. Teams van developers en niet-developers bouwen in één dag iets waar ENTR beter van wordt: iets wat klanten nodig hebben, of een interne tool voor onszelf. De repo is bewust leeg: het idee komt van het team, niet uit deze map.

## Met wie je werkt

Veel gebruikers hier zijn geen developer. Met hen:
- Gebruik gewone woorden, korte antwoorden en één volgende stap tegelijk. Leg git, npm of code alleen uit als ze erom vragen.
- Antwoord in het Nederlands, tenzij iemand een andere taal schrijft.
- Start zelf de preview als er iets te zien is, en zeg waar ze moeten klikken.
- Vraag het eerst bij grote stappen (bestanden verwijderen, de teammap van een ander team aanpassen, packages installeren).

`/start-team` zet een team op; `/snapshot` haalt bedrijfsdata alleen-lezen op.

## Regels

1. **Eerst de probleemstelling.** Voor wie is het, welk probleem lost het op, en wanneer is het gelukt? Die staat in `teams/<slug>/TEAM.md`. Wil een team bouwen zonder probleemstelling: vraag er één keer naar en respecteer daarna hun keuze.
2. **Kleine stappen.** Bouw een stukje, laat het zien in de preview, draai `npm run typecheck`, commit, en dan het volgende stukje.
3. **Dataniveaus** (`docs/data-rules.md`): verzonnen data mag altijd; ENTR-systemen (HubSpot, Notion, Fireflies, Drive, Airtable) alleen-lezen via de eigen connector van de gebruiker en de skill `/snapshot`; klantdata, mailboxen, productiedatabases en financiële data nooit.
4. **Geen geheimen in code.** De LLM-sleutel staat in `.env.local` (nooit lezen, nooit tonen, nooit committen). Vraag gebruikers nooit om API-sleutels of wachtwoorden van bedrijfssystemen.
5. **Git:** werk op de teambranch `team/<slug>`, nooit op `main` (een pre-commit-hook blokkeert dat). **Nooit pushen:** deze repo is openbaar, en het werk van een team blijft op hun laptop. Vraagt iemand om te pushen of te delen: leg dat uit, en zeg dat Thomas een privérepo opzet voor projecten die na de hackathon verdergaan.

## Waar alles staat

| Pad | Wat |
| --- | --- |
| `src/lib/llm.ts` | `ask()` en `askJson()` om Claude aan te roepen vanuit servercode |
| `src/lib/db.ts` | `db()`: de lokale SQLite-database, alleen vanuit servercode |
| `data/schema.sql` | De tabellen van de database (`CREATE TABLE IF NOT EXISTS`) |
| `data/app.db` | De database zelf (door git genegeerd, elke laptop heeft zijn eigen data) |
| `src/lib/sources.ts` | `readSnapshot(source, name)` voor data die met `/snapshot` is opgehaald |
| `data/private/` | Snapshots uit bedrijfssystemen (door git genegeerd) |
| `src/components/ui/` | ENTR's eigen UI-kit (shadcn), gekopieerd uit Entr-Core. Gebruik hem, pas hem niet aan; kopieer een component naar je teammap als je een variant nodig hebt |
| `src/app/<slug>/`, `src/components/<slug>/` | De app van een team, als het idee een scherm heeft |
| `teams/<slug>/` | TEAM.md en de BMAD-documenten van een team (`planning/`, `build/`); ook de plek voor alles wat geen scherm is |
| `docs/data-rules.md` | Welke data mag, en hoe connectors werken |

## Codeafspraken

- Er staat een lege Next.js 16-app klaar (App Router, TypeScript, Tailwind 3, de ENTR-shadcn-kit), dezelfde stack als het ENTR-product. Gebruik die als het idee een scherm nodig heeft. Iets anders bouwen (een script, een Claude-skill, een rapport) mag ook.
- In de app: standaard server components; `"use client"` alleen voor interactie. LLM- en database-aanroepen alleen op de server (server actions of route handlers).
- Data die de app zelf bewaart, gaat in de SQLite-database: `db()` uit `@/lib/db` (SQLite van Node.js zelf, `node:sqlite`; installeer geen andere database of ORM). Zet tabellen in `data/schema.sql`; een nieuwe tabel werkt meteen. Bestaande tabel veranderd: stop de dev-server, draai `npm run db:reset` (wist alle data) en start opnieuw. Geef waarden altijd mee als `?`-parameter, plak ze nooit in de SQL. `GET /api/db/ping` laat zien of de database werkt.
- De interface is Nederlands. Code (namen en commentaar) blijft Engels, zoals in Entr-Core.
- Houd het een prototype: geen login, niet schrijven naar echte systemen. Laat zien wat het systeem *zou* versturen of wegschrijven.

## BMAD (v6.12)

BMAD praat en schrijft Nederlands (ingesteld in `_bmad/custom/config.toml`).

| Stap | Typ | Skill |
| --- | --- | --- |
| Ideeën verzamelen | `/bmad-brainstorming` | bmad-brainstorming |
| Een idee onder druk zetten | `/bmad-forge-idea` | bmad-forge-idea |
| Bouwen | `/bmad-build` | bmad-build |
| Kwijt? | `/bmad-help` | bmad-help |

`/start-team` zet de output van BMAD in `teams/<slug>/` via `_bmad/custom/config.toml`.
