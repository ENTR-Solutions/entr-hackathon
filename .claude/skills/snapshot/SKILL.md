---
name: snapshot
description: Haal een alleen-lezen snapshot op uit een echt ENTR-bedrijfssysteem (HubSpot, Notion, Fireflies, Google Drive, Airtable) via de eigen claude.ai-connector van de gebruiker, en bewaar die in data/private/ voor een prototype. Gebruik als iemand /snapshot typt, of vraagt om data uit HubSpot of een ander bedrijfssysteem in hun app te krijgen.
---

# Snapshot van een bedrijfssysteem

Prototypes praten nooit rechtstreeks met bedrijfssystemen. Jij, Claude, leest het systeem via de eigen connector van de gebruiker, bewaart wat het idee nodig heeft in `data/private/`, en het prototype leest dat bestand. Lees eerst `docs/data-rules.md` als je dat nog niet hebt gedaan.

## Controleer vóór je ophaalt

1. **Mag het?** Oranje (mag, alleen-lezen): HubSpot, Notion, Fireflies, Google Drive, Airtable. Rood (weiger, en zeg in één zin waarom): mailboxen van klanten, Gmail, orders, facturen of ERP-exports van klanten, ENTR-productiedatabases, Jortt of andere financiële data.
2. **Is de connector er?** Zoek de tools van het systeem in deze sessie (namen zoals `mcp__claude_ai_HubSpot__...`). Ontbreken ze, leg dan uit: koppel het via claude.ai → Instellingen → Connectors met je eigen account (bij een Team-abonnement voegt een beheerder hem eerst toe), en start de sessie opnieuw. Stop daar. Vraag nooit om een API-sleutel, token of wachtwoord, en schrijf nooit code die de API van het systeem aanroept.
3. **Wat heeft het prototype nodig?** Vraag welke vraag de data moet beantwoorden, en bepaal de kleinste set objecten en velden die dat doet. Maximaal ongeveer 500 records.

## Ophalen, alleen-lezen

- Gebruik alleen tools die lezen of zoeken. Tools die iets aanmaken, wijzigen, versturen, delen, verplaatsen of verwijderen zijn geblokkeerd in `.claude/settings.json`; probeer daar niet omheen te werken.
- Laat persoonsgegevens weg die het idee niet nodig heeft: mailadressen, telefoonnummers, vrije notities, de inhoud van mails en gesprekken. Vervang de naam van een contactpersoon door de functie als de naam niets toevoegt.

## Bewaren

Schrijf `data/private/<bron>/<naam>.json` (kleine letters, bijv. `data/private/hubspot/open-deals.json`):

```json
{
  "_meta": {
    "source": "hubspot",
    "name": "open-deals",
    "taken_at": "<ISO-tijdstempel>",
    "taken_by": "<git config user.name>",
    "query": "<in gewone woorden: wat is opgehaald en gefilterd>",
    "fields_removed": ["mailadres contactpersoon", "notities"],
    "record_count": 0
  },
  "records": []
}
```

## Vertel de gebruiker daarna

- Wat er is bewaard, hoeveel records, en wat er is weggelaten.
- Hoe ze het gebruiken: `readSnapshot("hubspot", "open-deals")` uit `@/lib/sources` (geeft `null` op een laptop zonder het bestand).
- Dat `data/private/` nooit wordt gecommit: op een andere laptop draai je `/snapshot` opnieuw.
- Willen ze later live data of terugschrijven, dan is dat iets voor na de hackathon: noteer het in `teams/<slug>/TEAM.md` als vervolgstap, niet in het prototype.
