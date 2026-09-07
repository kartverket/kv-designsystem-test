# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Visuell testing lokalt

Alle Storybook-stories kan kjøres som visuelle regresjonstester (screenshot-tester) lokalt via Vitest sin browser mode, med Playwright/Chromium.

Kommandoene under kjøres med `pnpm --filter @kv-designsystem/react exec ...`, slik at de fungerer fra roten av monorepoet uten å måtte `cd` inn i `@kv-designsystem/react` først. Står du allerede inne i `@kv-designsystem/react`, kan du droppe `--filter @kv-designsystem/react exec`-delen og bare skrive `pnpm vitest ...` direkte.

**Forutsetning:** Playwright må ha lastet ned en Chromium-instans. Hvis det ikke allerede er gjort:

```bash
pnpm --filter @kv-designsystem/react exec playwright install chromium
```

**Kjøre testene:**

```bash
pnpm --filter @kv-designsystem/react exec vitest run --project storybook
```

Første gang du kjører en story finnes det ingen referanse-screenshot ennå. Vitest oppretter da et nytt bilde under `src/**/__screenshots__/` og lar testen feile, slik at du får sjekket bildet før det brukes som fasit. Se over det genererte bildet, og kjør testen på nytt — da sammenlignes rendringen mot referansen (pikseldiff).

**Med interaktivt UI:** legg til `--ui`-flagget (og drop `run`, siden `--ui` alltid kjører i watch-modus). Åpner en nettleserfane (typisk `http://localhost:51204/__vitest__/`) hvor du ser testresultater fortløpende, og — ved en feilet skjermbilde-test — får en egen "Attachments"-fane med actual- og diff-bildet side om side:

```bash
pnpm --filter @kv-designsystem/react exec vitest --project storybook --ui
```

Skal du bare følge med på én komponent under utvikling, filtrer på filnavn (fungerer med og uten `--ui`):

```bash
pnpm --filter @kv-designsystem/react exec vitest --project storybook --ui Button
```

**Oppdatere en referanse etter en tilsiktet visuell endring:** kjør testen med `-u`-flagget (Vitest sin vanlige snapshot-oppdatering), så overskrives referansebildet automatisk i stedet for å feile:

```bash
pnpm --filter @kv-designsystem/react exec vitest run --project storybook -u
```

**Merk:** Disse referanse-screenshotene er gitignored og skal ikke committes. Ordentlig visuell regresjonstesting på tvers av maskiner/nettlesere håndteres av Chromatic i CI (se `.github/workflows/publish-chromatic.yml`). Bruk de lokale screenshot-testene som en rask sjekk før du pusher.
