# News source policy

Manual curation date: 2026-02-07

Only explicitly approved sources are allowed for the news pipeline.  
Source configuration lives in `public/news-sources.json` and is enforced by an allowlist in `lib/news/fetch-news.ts`.

## Tier 1 - Governing bodies (primary)

- Scottish Surfing (`html`): https://scottishsurfing.scot/news/
- Snowsport Scotland (`html`): https://www.snowsportscotland.org/news
- Paddle Scotland (`html`): https://www.paddlescotland.org.uk/news
- Mountaineering Scotland (`rss`): https://www.mountaineering.scot/feed
- Developing Mountain Biking in Scotland (`html`): https://dmbins.com/news/

## Tier 2 - Specialist outdoor publishers (secondary)

- Outdoor Swimming Society (`rss`): https://www.outdoorswimmingsociety.com/feed/
- Singletrack Magazine (`rss`): https://singletrackworld.com/feed/
- Carve Magazine (`rss`): https://www.carvemag.com/feed/
- Surfers Against Sewage (`rss`): https://www.sas.org.uk/feed/

## Guardrails

- Generic mainstream sport feeds are excluded by policy.
- Score/live blog patterns are filtered out.
- Articles must pass deterministic Scotland + sport relevance checks before display.
- All cards link directly to original publishers; no full-content republishing.
