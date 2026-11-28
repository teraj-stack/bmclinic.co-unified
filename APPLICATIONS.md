# Spis aplikacji BM Clinic Unified

Strona startowa to istniejący portal Sky Lobby. Repozytorium zawiera aplikację Next.js,
osobny projekt Chronos, TaskKill Studio, pakiety Superagent i gotowe eksporty HTML.
Poniższy spis jest punktem wyjścia do testów poszczególnych aplikacji przed publikacją.

## Aplikacje ze źródłami w repozytorium

- **BM Clinic Next.js** — portal startowy, serwis zabiegowy, cennik, rezerwacje, sklep,
  blog, kontakt, panele administratora, lekarza i pacjenta oraz CMS. Główna ścieżka budowania
  to `npm ci` i `npm run build`. Logowanie, płatności, rezerwacje z kalendarzem,
  wiadomości z formularzy i trwały zapis wymagają konfiguracji i osobnych testów.
- **Chronos Vault** — osobna aplikacja React i Vite w `chronos-vault-module`. Pełny widok
  jest dostępny pod `/vault`, a uproszczone widoki w panelach administratora i lekarza.
  Synchronizacja między kontami wymaga sprawdzenia Firebase, uprawnień i usług Chronos.
- **TaskKill Studio** — aplikacja JavaScript i Python w `taskkill-assets`. Podgląd
  Vercel wyświetla dwie istniejące mapy zawierające odpowiednio 57 i 38 zadań,
  ich układ i dostępną notatkę. W chronionym podglądzie zadania i układ edytuje
  się w tablicy TaskKill. Zapis zespołowy korzysta z odrębnej bazy ustawionej
  przez `TASKKILL_DATABASE_URL` lub `TASKKILL_POSTGRES_PRISMA_URL`.
  Pierwsza edycja tworzy wpis na podstawie wersji z repozytorium, a konflikt
  zachowuje lokalny szkic do pobrania. Wspólna notatka jest dostępna do odczytu.
- **Design Studio, Voice Builder i Agent LLM** — widoki Next.js z własnymi trasami
  serwerowymi. Funkcje AI i głosowe trzeba sprawdzić z usługami działającymi pod
  adresami osiągalnymi z miejsca wdrożenia.
- **Superagent SDK i MCP** — dwa osobne pakiety TypeScript. Kompilują się niezależnie
  od strony. Do integracji z dostawcami modeli potrzebna jest konfiguracja usług.
- **Demonstracje Next.js** — Kabina rezerwacyjna i Raycast pod `/demo`. Są częścią
  kompilacji głównego serwisu.

## Eksporty przeglądarkowe

- **AI Studio App, CML Wilanów i MySkinCode AI** — snapshots katalogów `src`
  zawierają oryginalne moduły w mapach źródłowych. Projekt `embedded-apps`
  buduje samodzielne pakiety przeglądarkowe z tych zapisów. Raporty, poczta,
  analizy SEO, asystent CML i kamera wymagają osobnych testów funkcjonalnych.
- **BMClinics.ai** — zintegrowany portal estetyczny pod `/bmclinics-ai` oraz gotowy
  plik `public/bmclinics-ai/index.html`. Podstrony kliniczne otwierają jego widoki.
- **MCML i BMCML** — portal pacjenta, pakiet offline, poradniki, filmy, ilustracje,
  e-booki i materiały do pobrania w `public/mcml` oraz `public/cml`.
- **BM Holding** — osobny eksport pod `/holding` oraz trasy serwerowe Next.js.
  Funkcje wymagające usług serwerowych należy sprawdzać z właściwą konfiguracją.
- **Aether Tactile Studio, Spatial 3D, Parallax 3D i Chomik** — gotowe eksporty
  w odpowiadających katalogach `public`, razem z wariantami offline i zasobami.
- **Sentinel Shield, Sentinel Toolkit i Sentinel Pack** — osobne widoki i materiały
  zapisane w `public` i w plikach Chronos. Nie są zależnościami wymaganymi do
  uruchomienia strony lub rezerwacji.
- **Ruta, Twój Problem, Promedion, BMSolutions i Laurka** — samodzielne widoki
  lub eksporty w `public/ruta`, `public/aplikacja` i `public/landing`.
- **Warianty kliniczne offline** — medycyna estetyczna, zimna plazma i aplikacja
  bioelektryczna w `public/estetyka`, oraz osobne kopie strony w `docs`.
  Skrypt `npm run build:offline` odtwarza wariant BM Clinic.
- **Flutter** — w repozytorium znajduje się `main.dart`. Do samodzielnego zbudowania
  projektu potrzebny jest komplet plików projektu, w tym `pubspec.yaml`.

## Ponowna kompilacja odzyskanych aplikacji

```sh
npm --prefix embedded-apps ci
npm --prefix embedded-apps run build
```

Można też zbudować jedną aplikację, np. `npm --prefix embedded-apps run build -- cml-wilanow`.
Wyniki trafiają do odpowiednich katalogów `public` i są włączane do głównego wdrożenia.

## Dane i zasoby

Na początku przeglądu Git obejmował 1892 pliki o łącznym rozmiarze około 243 MB.
W katalogu lokalnym było dodatkowo około 1,1 GB zainstalowanych zależności,
190 MB wyniku kompilacji i 161 MB historii Git. Zasoby w Git obejmują oryginalne
obrazy, filmy, e-booki, pliki źródłowe i gotowe eksporty. Kilka projektów jest
dostępnych jako eksporty przeglądarkowe. Ich pełne drzewo źródłowe i konfigurację
trzeba pozyskać, jeśli okażą się potrzebne do dalszej rozbudowy.
