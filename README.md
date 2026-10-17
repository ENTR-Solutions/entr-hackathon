# ENTR-hackathon starter

Een lege Next.js-app met ENTR's eigen UI-kit en een lokale database, BMAD om je idee scherp te krijgen, en vangrails voor echte bedrijfsdata. Wat je bouwt bepaal je zelf: iets voor klanten of een interne tool, zolang ENTR er beter van wordt.

## Je laptop klaarmaken (ongeveer 20 minuten, thuis met goede wifi)

Je installeert alleen Claude zelf. De rest doet Claude voor je.

1. Installeer de **Claude-desktopapp** (claude.ai/download) en log in met je ENTR-account.
2. Maak een lege map **Hackathon** in je map Documenten.
3. Open Claude, ga naar het tabblad **Code**, klik op **Select folder** en kies de map Hackathon.
4. Kopieer de opdracht hieronder, plak hem in Claude en druk op Enter.
5. Claude vraagt bij elke stap toestemming: klik op **Toestaan**. Vraagt Windows of een app wijzigingen mag aanbrengen, klik dan op **Ja**. Op een Mac typ je soms je Mac-wachtwoord.
6. Zegt Claude dat je Claude opnieuw moet starten: sluit Claude helemaal af, open hem opnieuw, kies weer de map Hackathon en plak dezelfde opdracht nog een keer. Claude gaat verder waar hij was.
7. Vraag Thomas om de hackathon-sleutel. Claude opent een bestand waarin je hem plakt.

```text
Maak mijn laptop klaar voor de ENTR-hackathon. Ik ben geen developer: leg elke stap in één korte zin uit, in het Nederlands, en zeg wanneer ik iets moet aanklikken. Ik plak deze opdracht misschien vaker, dus kijk eerst wat er al is en sla over wat klaar is.

1. Kijk of dit Windows of macOS is, en of deze programma's er zijn: Node.js 22.13 of nieuwer, git en uv.
2. Installeer wat ontbreekt:
   - Windows: met winget (OpenJS.NodeJS.LTS, Git.Git, astral-sh.uv; met --accept-source-agreements --accept-package-agreements). Zeg dat ik op Ja klik als Windows om toestemming vraagt.
   - macOS: git met xcode-select --install (ik klik op Installeren). Node.js met het officiële macOS-installatiebestand (.pkg) van de huidige LTS-versie op nodejs.org: download het en open het, ik klik het door. uv met het officiële installatiescript van astral.sh. Gebruik Homebrew alleen als die er al is.
   Heb je iets geïnstalleerd, stop dan en zeg: "Sluit Claude helemaal af, open hem opnieuw in dezelfde map en plak de opdracht nog een keer." Nieuwe programma's zijn pas na een herstart te vinden.
3. Clone https://github.com/ENTR-Solutions/entr-hackathon in deze map, als de map entr-hackathon er nog niet is. Draai daarin npm install (blokkeert PowerShell dat, gebruik dan npm.cmd).
4. Draai in entr-hackathon: uv run _bmad/scripts/resolve_config.py --project-root . Dat haalt alvast op wat BMAD nodig heeft.
5. Maak in entr-hackathon het bestand .env.local als kopie van .env.example, als het nog niet bestaat, en open het in Kladblok (Windows) of TextEdit (macOS). Zeg dat ik de hackathon-sleutel van Thomas achter ANTHROPIC_API_KEY= plak en opsla. Vraag nooit om de sleutel in deze chat en lees het bestand niet.
6. Sluit af met: "Klaar. Start een nieuwe sessie, kies de map entr-hackathon (in Hackathon), laat de optie worktree uit, en typ: start de app, controleer /api/llm/ping en /api/db/ping, en laat me de startpagina zien."
```

Zie je daarna de startpagina in het previewvenster, dan ben je klaar. Start een sessie voortaan altijd in de map entr-hackathon, zonder de optie **worktree**: dan komt alles direct op `main` en maakt Claude geen pull request.

Optioneel, voor ideeën met bedrijfsdata: koppel HubSpot, Notion, Fireflies of Google Drive via claude.ai → Instellingen → Connectors met je eigen account. Zie `docs/data-rules.md`.

Developer? Installeer Node.js 22.13+, git en uv zelf, clone de repo, draai `npm install`, en maak `.env.local` aan. Je kunt in dezelfde map ook de Claude Code-CLI gebruiken.

## Op de dag zelf

1. Typ `/start-team`: Claude maakt jullie teammap.
2. Brainstorm (`/bmad-brainstorming`) of zet je idee onder druk (`/bmad-forge-idea`), en schrijf de probleemstelling op.
3. Bouw. Kwijt? Typ `/bmad-help`.

## Wat zit erin

| | |
| --- | --- |
| `src/components/ui/` | ENTR's eigen UI-kit, dezelfde als in het product |
| `src/lib/` | `llm.ts` (Claude aanroepen), `db.ts` (de lokale SQLite-database), `sources.ts` (snapshots lezen) |
| `data/schema.sql` | De tabellen van de database. De database zelf (`data/app.db`) blijft op je laptop |
| `docs/data-rules.md` | Welke data mag, en hoe connectors werken |
| `_bmad/`, `.claude/skills/` | BMAD 6.12.0 plus twee hackathon-skills: `/start-team` en `/snapshot` |

## Echte bedrijfsdata

ENTR's eigen systemen (HubSpot, Notion, Fireflies, Drive, Airtable) mogen **alleen-lezen, via je eigen connector**: typ `/snapshot` en Claude bewaart alleen wat jullie idee nodig heeft in `data/private/`, dat nooit wordt gecommit. Schrijven naar die systemen is geblokkeerd in `.claude/settings.json`. Klantdata mag nooit. Details: `docs/data-rules.md`.

## Voor beheerders

- Teams committen op `main` en maken geen branches of pull requests. `.githooks/pre-commit` weigert alleen `.env`-bestanden, snapshots en de database.
- De repo is openbaar, dus teams pushen niet: `.githooks/pre-push` en `.claude/settings.json` blokkeren elke push. Beheerders pushen updates van de starter met `ALLOW_PUSH=1 git push`. Gaat een project verder na de hackathon, dan krijgt het een eigen privérepo.
- BMAD praat en schrijft Nederlands via `_bmad/custom/config.toml`.
- Na de hackathon: de documenten in `teams/<slug>/` van de winnende teams gaan naar `Entr-Core/_bmad-output/planning-artifacts/hackathon-2026-10/`; de prototypecode is de UX-referentie, geen productiecode.
