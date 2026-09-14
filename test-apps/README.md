# kv-designsystem/react test app

Frittstående React + TypeScript + Vite-app for å teste import og bruk av
komponenter fra det publiserte npm-pakken
[`@kv-designsystem/react`](https://www.npmjs.com/package/@kv-designsystem/react).

Appen har **ingen** lokale avhengigheter til resten av monorepoet — den
installerer designsystemet slik en ekstern forbruker ville gjort, via npm.

## Kjøre lokalt

```bash
cd test-apps
npm install
npm run dev
```

Åpne deretter URL-en som skrives ut i terminalen (som regel
http://localhost:5173).

## Andre kommandoer

```bash
npm run build    # typecheck + produksjonsbygg
npm run preview  # forhåndsvis produksjonsbygget
npm run lint     # oxlint
```
