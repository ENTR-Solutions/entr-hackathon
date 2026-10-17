# Dataregels

Verzonnen data mag altijd. Echte bedrijfssystemen mogen alleen-lezen, via je eigen login, en die data blijft op je laptop. Klantdata mag nooit.

| Niveau | Wat | Hoe je het mag gebruiken |
| --- | --- | --- |
| **Groen** | Data die je zelf verzint, of door Claude laat verzinnen | Alles mag. Gebruik verzonnen namen, bedrijven en mailadressen |
| **Oranje** | ENTR's eigen systemen: HubSpot, Notion, Fireflies-gespreksnotities, Google Drive, Airtable | Alleen-lezen, via **je eigen** claude.ai-connector, opgehaald in `data/private/` met `/snapshot`. Alleen de velden die je idee nodig heeft; haal persoonsgegevens weg die je niet nodig hebt. Nooit in Lovable of andere externe tools. Nooit committen |
| **Rood** | Klantdata (van tenants): hun mailboxen, orders, facturen, ERP-exports, ENTR-productiedatabases. Ook financiën (Jortt) en je eigen mailbox | Nooit. Ook niet "even proberen" |

## Waarom connectors, en waarom snapshots

- **Je eigen login, je eigen toegang.** Een connector gebruikt jouw HubSpot-account (of Notion, ...), dus je ziet alleen wat je nu ook al kunt zien. Niemand deelt een API-sleutel en op de dag zelf hoeft niemand iets in te richten.
- **Claude leest, de app niet.** Claude haalt een snapshot op in `data/private/<bron>/<naam>.json` en je prototype leest dat bestand met `readSnapshot()`. De app bevat nooit inloggegevens, en de demo werkt zonder internet.
- **Ook de database blijft op je laptop.** Wat de app opslaat staat in `data/app.db`, en dat bestand wordt nooit gecommit. Zet je snapshotdata in de database, dan gelden dezelfde regels: alleen wat je idee nodig heeft.
- **Schrijven is geblokkeerd.** `.claude/settings.json` weigert elke tool die in een gekoppeld systeem iets aanmaakt, wijzigt, verstuurt of verwijdert. Een prototype dat naar HubSpot zou moeten schrijven, laat zien wat het *zou* schrijven; het echte schrijven wordt een story voor na de hackathon.

## Een systeem koppelen (vóór de reis)

1. Ga naar claude.ai → Instellingen → Connectors (claude.ai/customize/connectors).
2. Koppel de systemen die je misschien nodig hebt (HubSpot, Notion, Fireflies, Google Drive) en log in met je eigen account. Bij een Team-abonnement voegt de beheerder de connector eerst voor iedereen toe; jij klikt daarna alleen nog op Koppelen.
3. Open deze repo in de Claude-desktopapp en vraag "welke connectors heb ik?" om te controleren dat ze verschijnen.
