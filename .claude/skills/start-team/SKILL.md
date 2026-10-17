---
name: start-team
description: Zet een hackathonteam op in deze repo - teammap, plek voor de BMAD-documenten en een startpagina. Gebruik als iemand /start-team typt, of zegt dat ze willen beginnen of hun team willen aanmaken.
---

# Een team starten

Veel deelnemers zijn geen developer. Doe het git-werk voor ze en leg het in één zin uit.

## Vraag (in één bericht)

1. De teamnaam.
2. Wie er in het team zitten.
3. Hun idee in één zin, als ze er al een hebben.

## Doe

1. Maak een slug van de teamnaam: kleine letters, cijfers en streepjes (bijv. "Team Duin" → `team-duin`). Alles blijft op `main`: maak geen branch.
2. Bestaat `teams/<slug>/` al, zeg dat dan en ga verder met wat er is.
3. Maak `teams/<slug>/TEAM.md`:

   ```markdown
   # <Teamnaam>

   **Leden:** <namen>
   **Idee:** <hun idee in één zin, of "nog open">

   ## Probleemstelling
   Voor wie:
   Welk probleem:
   Wanneer is het gelukt:
   ```

4. Laat BMAD in de teammap schrijven, in `_bmad/custom/config.toml`:
   - Voeg in de bestaande `[core]`-tabel (die met `communication_language`) deze regel toe: `output_folder = "teams/<slug>"`. Maak geen tweede `[core]`-tabel; dat breekt het bestand.
   - Voeg onderaan deze tabel toe:

     ```toml

     [modules.bmm]
     planning_artifacts = "{project-root}/teams/<slug>/planning"
     implementation_artifacts = "{project-root}/teams/<slug>/build"
     ```

   - Controleer met `uv run _bmad/scripts/resolve_config.py --project-root .` dat `core.output_folder` nu `teams/<slug>` is.
5. Maak `src/app/<slug>/page.tsx`: een eenvoudige server component met de teamnaam als titel, met `Card` uit `@/components/ui/card`, in het Nederlands. Daar komt hun app, op `/<slug>`, als hun idee een scherm krijgt.
6. Commit op `main`: `git add teams/<slug> src/app/<slug> _bmad/custom/config.toml` en `git commit -m "<teamnaam>: start"`.

## Vertel ze daarna

- Hun map, en dat hun app in de preview op `/<slug>` staat.
- De volgende stap: `/bmad-brainstorming` als het idee nog open is, anders `/bmad-forge-idea`. Daarna vullen ze de probleemstelling in TEAM.md in.
