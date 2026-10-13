# Kartverkets designsystem

Designtokens, CSS og React-komponenter for Kartverkets produkter, bygget på [Digdirs Designsystemet](https://www.designsystemet.no/).

[![@kv-designsystem/theme](https://img.shields.io/npm/v/@kv-designsystem/theme?label=%40kv-designsystem%2Ftheme&logo=npm)](https://www.npmjs.com/package/@kv-designsystem/theme)
[![@kv-designsystem/css](https://img.shields.io/npm/v/@kv-designsystem/css?label=%40kv-designsystem%2Fcss&logo=npm)](https://www.npmjs.com/package/@kv-designsystem/css)
[![@kv-designsystem/react](https://img.shields.io/npm/v/@kv-designsystem/react?label=%40kv-designsystem%2Freact&logo=npm)](https://www.npmjs.com/package/@kv-designsystem/react)

Dokumentasjon, eksempler og komponentoversikt finner du i Storybook på [design.kartverket.no](https://design.kartverket.no).

## TL;DR aka bare la meg starte

Krever at du har [Node.js 24](https://nodejs.org/)

```sh
git clone https://github.com/kartverket/kv-designsystem-test.git
cd kv-designsystem-test
corepack enable
pnpm install
pnpm nx dev
```

Se lokal instans av Storybook på [http://localhost:6006](http://localhost:6006)

## Nytt designsystem

Dette repoet erstatter Kartverkets gamle designsystem, [Kvib](https://github.com/kartverket/kvib) (`@kvib/react`), som var bygget på Chakra UI. Nye prosjekter bør bruke `@kv-designsystem/*`-pakkene, og eksisterende prosjekter bør migrere.

- [Migreringsguide](https://design.kartverket.no/?path=/docs/migreringsguide--docs): hvordan du går fra Kvib til det nye designsystemet.
- [Dokumentasjon for Kvib](https://design.kartverket.no/?path=/docs/kvib-kartverkets-gamle-designsystem--docs): lenker til den gamle dokumentasjonen, som ikke lenger vedlikeholdes.

## Pakker

| Pakke                                                                            | Lenke                                                | Beskrivelse                                                         |
| -------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------- |
| [`@kv-designsystem/react`](https://www.npmjs.com/package/@kv-designsystem/react) | [`@kv-designsystem/react`](./@kv-designsystem/react) | React-komponenter og Storybook                                      |
| [`@kv-designsystem/css`](https://www.npmjs.com/package/@kv-designsystem/css)     | [`@kv-designsystem/css`](./@kv-designsystem/css)     | Rent CSS-bygg (PostCSS) med stilsett per tema og et Tailwind-preset |
| [`@kv-designsystem/theme`](https://www.npmjs.com/package/@kv-designsystem/theme) | [`@kv-designsystem/theme`](./@kv-designsystem/theme) | Designtokens som CSS per tema, pluss TypeScript-typer               |

> [!NOTE]
> Pakkene er publisert på npm under `alpha`-taggen. `latest` kan ligge en versjon bak, så installer med `@alpha` for å få nyeste versjon.

## Bruk

Om du lurer på hvordan du tar i bruk designsystemet anbefaler vi guiden du finner under [Kom i gang som utvikler](https://design.kartverket.no/?path=/docs/kom-i-gang-som-utvikler--docs) i Storybook.

## Utvikling

Dette er et pnpm-workspace som styres med [Nx](https://nx.dev/). Alle kommandoer kjøres fra roten av repoet.

### Forutsetninger

- **Git**
- **Node.js** `>=24.6.0 <25`
- **pnpm** via [Corepack](https://nodejs.org/api/corepack.html). Kjør kommandoen under én gang, så bruker `pnpm` automatisk versjonen repoet er låst til.

  ```sh
  corepack enable
  ```

### Vanlige kommandoer

| Oppgave                                            | Kommando                  |
| -------------------------------------------------- | ------------------------- |
| Installere avhengigheter                           | `pnpm install`            |
| Samme sjekk som CI (format, lint, typesjekk, bygg) | `pnpm build`              |
| Kjøre Storybook (port 6006)                        | `pnpm nx dev`             |
| Linte ett prosjekt                                 | `pnpm nx lint <prosjekt>` |
| Sjekke formatering                                 | `pnpm nx format:check`    |
| Fikse formatering                                  | `pnpm nx format:write`    |

> [!NOTE]
> `pnpm build` kjører linting, formattering og deretter `pnpm nx build`. Den er altså mer omfattende uten å kjøre nx varianten, vi anbefaler den.

Prosjektene er `@kv-designsystem/react`, `@kv-designsystem/css`, `@kv-designsystem/theme` og `design-tokens`. Nx bygger avhengigheter i riktig rekkefølge og cacher resultatet, så `pnpm nx <target> <prosjekt>` fungerer for alle targets. `pnpm nx show project <prosjekt> --web` viser hvilke targets et prosjekt har, og `pnpm nx reset` tømmer cachen hvis noe virker utdatert.

## Testing

> [!NOTE]
> Om du vil lese mer utfyllende om testing kan du det i [readme.md til react-pakken](./@kv-designsystem/react)

Storybook-stories kjøres som tester, inkludert screenshot-sammenligning, med Vitest i browser mode og Playwright/Chromium. Kommandoene kjøres fra roten av repoet. Står du i `@kv-designsystem/react`, kan du droppe `--filter @kv-designsystem/react exec`.

Førstegangsoppsett (gjøres kun første gangen):

```sh
pnpm --filter @kv-designsystem/react exec playwright install chromium
```

```sh
# Kjør alle tester
pnpm --filter @kv-designsystem/react exec vitest run --project storybook

# Interaktivt UI med diff av feilede screenshots (watch-modus)
pnpm --filter @kv-designsystem/react exec vitest --project storybook --ui

# Kun én komponent (filtrerer på filnavn)
pnpm --filter @kv-designsystem/react exec vitest --project storybook Button

# Oppdater referansebilder etter en tilsiktet visuell endring
pnpm --filter @kv-designsystem/react exec vitest run --project storybook -u
```

Første gang en story kjøres finnes det ikke noe referansebilde. Vitest lager det da under `__screenshots__/` og lar testen feile, slik at du kan se over bildet før det brukes som fasit.

Referansebildene er maskinavhengige og gitignored, så de skal ikke committes. Visuell regresjonstesting i CI gjøres med Chromatic ([`publish-chromatic.yml`](./.github/workflows/publish-chromatic.yml)). Bruk de lokale testene som en rask sjekk før du pusher.

## Testapp

[`test-apps`](./test-apps) er en frittstående Vite-app som installerer den publiserte `@kv-designsystem/react`-pakken fra npm, slik en ekstern bruker ville gjort. Den er med vilje ikke en del av pnpm-workspacet, og bruker npm:

```sh
cd test-apps
npm install
npm run dev
```

Se [`test-apps/README.md`](./test-apps/README.md) for flere kommandoer.

## Designtokens

Kilden til designtokens ligger i [`design-tokens`](./design-tokens) som DTCG-JSON, og bygges med Designsystemet-CLI-et til CSS, et Tailwind-preset og TypeScript-typer. Det finnes to temaer: `green` og `blue`.

```
design-tokens (kilde, privat)
  └─▶ @kv-designsystem/theme (CSS per tema)
        └─▶ @kv-designsystem/css (stilsett per tema + Tailwind-preset)
              └─▶ @kv-designsystem/react (komponenter + stilsett)
```

## Bidra

- Skriv commit-meldinger etter [Conventional Commits](https://www.conventionalcommits.org/), siden de styrer versjoneringen.
- Fyll ut sjekklisten i PR-malen.
- Kjør `pnpm build` før du åpner en PR. Det er det samme som CI kjører.
