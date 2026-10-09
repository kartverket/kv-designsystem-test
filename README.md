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
pnpm nx dev @kv-designsystem/react
```

Se lokal instans av Storybook på [http://localhost:6006](http://localhost:6006)

## Nytt designsystem

Dette repoet erstatter Kartverkets gamle designsystem, [Kvib](https://github.com/kartverket/kvib) (`@kvib/react`), som var bygget på Chakra UI. Nye prosjekter bør bruke `@kv-designsystem/*`-pakkene, og eksisterende prosjekter bør migrere.

- [Migreringsguide](https://design.kartverket.no/?path=/docs/migreringsguide--docs): hvordan du går fra Kvib til det nye designsystemet.
- [Dokumentasjon for Kvib](https://design.kartverket.no/?path=/docs/kvib-kartverkets-gamle-designsystem--docs): lenker til den gamle dokumentasjonen, som ikke lenger vedlikeholdes.

## Pakker

| Pakke                                                                            | Lenke                                                | Beskrivelse                                                         |
| -------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------- | --------------- |
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

Nesten alt kjøres gjennom Nx: `pnpm nx <target> <prosjekt>` for ett prosjekt, eller `pnpm nx affected -t <target>` for alt som er endret sammenlignet med `main`. Nx bygger avhengigheter i riktig rekkefølge og cacher resultatet.

Prosjektene er `@kv-designsystem/react`, `@kv-designsystem/css`, `@kv-designsystem/theme` og `design-tokens`.

**Utvikling**

| Oppgave                       | Kommando                                         |
| ----------------------------- | ------------------------------------------------ |
| Installere avhengigheter       | `pnpm install`                                   |
| Kjøre Storybook (port 6006)    | `pnpm nx dev @kv-designsystem/react`             |
| Bygge CSS-pakken ved endringer | `pnpm nx watch @kv-designsystem/css`             |
| Bygge statisk Storybook        | `pnpm nx build-storybook @kv-designsystem/react` |

**Bygg og kvalitetssjekk**

| Oppgave                            | Kommando                                                    |
| ---------------------------------- | ----------------------------------------------------------- |
| Samme sjekk som CI                 | `pnpm build`                                                |
| Bygg alle pakker                   | `pnpm nx run-many -t build`                                 |
| Bygg én pakke (med avhengigheter)  | `pnpm nx build <prosjekt>`                                  |
| Typesjekk, lint og bygg alt endret | `pnpm nx affected -t typecheck lint build`                  |
| Lint ett prosjekt                  | `pnpm nx lint <prosjekt>`                                   |
| Typesjekk ett prosjekt             | `pnpm nx typecheck <prosjekt>`                              |
| Sjekk for sirkulære avhengigheter  | `pnpm nx lint-circular-dependencies @kv-designsystem/react` |
| Sjekk formatering                  | `pnpm nx format:check`                                      |
| Fiks formatering                   | `pnpm nx format:write`                                      |

**Nx-verktøy**

| Oppgave                                  | Kommando                                |
| ---------------------------------------- | --------------------------------------- |
| Se alle prosjekter                     | `pnpm nx show projects`                 |
| Se targets og avhengigheter for prosjekt | `pnpm nx show project <prosjekt> --web` |
| Avhengighetsgraf i nettleseren           | `pnpm nx graph`                         |
| Tøm Nx-cachen (hvis noe virker utdatert) | `pnpm nx reset`                         |


## Testing

Komponenttester og visuelle regresjonstester kjøres med Vitest i browser mode, direkte fra Storybook-stories, med Playwright/Chromium som nettleser.

Engangsoppsett:

```sh
pnpm --filter @kv-designsystem/react exec playwright install chromium
```

Kjør testene:

```sh
pnpm --filter @kv-designsystem/react exec vitest run --project storybook
```

| Oppgave                  | Kommando                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------- |
| Kjør alle tester         | `pnpm --filter @kv-designsystem/react exec vitest run --project storybook`         |
| Interaktivt UI           | `pnpm --filter @kv-designsystem/react exec vitest --project storybook --ui`        |
| Filtrer på én komponent  | `pnpm --filter @kv-designsystem/react exec vitest --project storybook --ui Button` |
| Oppdater referansebilder | `pnpm --filter @kv-designsystem/react exec vitest run --project storybook -u`      |


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
  
