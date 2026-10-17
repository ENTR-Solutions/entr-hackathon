# data/private

Snapshots uit echte bedrijfssystemen (HubSpot, Notion, Fireflies, ...) komen hier terecht als je `/snapshot` gebruikt in Claude.
Git negeert alles in deze map behalve dit bestand, dus snapshots verlaten nooit de laptop waarop ze zijn gemaakt.

Indeling: `data/private/<bron>/<naam>.json`, elk met een `_meta`-blok (bron, zoekvraag, wie, wanneer, welke velden zijn weggelaten) en `records`.
Lees ze in code met `readSnapshot(bron, naam)` uit `@/lib/sources`.

Maak deze map leeg na de hackathon.
