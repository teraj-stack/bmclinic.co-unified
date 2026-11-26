export const initialProfile = {
  name: "Marta Kowalska",
  email: "marta.kowalska@firma-omnisuite.pl",
  role: "Dyrektor ds. Marketingu i Dostępności Digital",
  avatarUrl: "/ai-studio-app/photo-1573496359142-b8d87734a5a2",
  isTwoFactorEnabled: true,
  twoFactorSecret: "JBSWY3DPEHPK3PXP",
  backupCodes: ["9821-4410", "3381-0029", "7761-9012", "1102-6638", "5529-8831"],
  lastLogin: "Dzisiaj, 09:14 (IP: 195.150.22.45)"
};
export const initialMails = [
  {
    id: "m1",
    senderName: "Marek Nowak",
    senderEmail: "m.nowak@klient-corp.pl",
    subject: "Zapytanie o optymalizację SEO i dostępność WCAG 2.1 dla nowego serwisu",
    snippet: "Cześć Marta, sprawdziliśmy nasz nowy portal firmowy i chcielibyśmy zlecić audyt SEO oraz dostosowanie pod standardy dostępności cyfrowej...",
    body: "Cześć Marta,\n\nSprawdziliśmy nasz nowy portal firmowy i chcielibyśmy zlecić pełen audyt SEO oraz dostosowanie pod standardy dostępności cyfrowej WCAG 2.1 AAA. Zależy nam szczególnie na poprawie czytelności dla osób słabowidzących oraz wysokim kontraście interfejsu.\n\nCzy mogłabyś przesłać nam wstępną ofertę i automatyczny raport z analizą ruchu za ostatni miesiąc?\n\nPozdrawiam,\nMarek Nowak\nHead of Digital Experience",
    timestamp: "10:42",
    read: false,
    starred: true,
    folder: "inbox",
    category: "main"
  },
  {
    id: "m2",
    senderName: "System Powiadomień SEO",
    senderEmail: "alerts@omnisuite.pl",
    subject: "Miesięczny Skok Pozycji SEO: +32% Widoczności w Wyszukiwarce Google",
    snippet: "Twój serwis firmowy osiągnął historyczny rekord ruchu organicznego. Wskaźnik SEO na poziomie 94/100...",
    body: 'Raport Automatyczny OmniSuite SEO Engine:\n\nTwoja strona firmowa zanotowała wzrost widoczności organicznej o 32% w ciągu ostatnich 30 dni. Kluczowe słowa frazowe "dostępność WCAG 2.1" oraz "optymalizacja stron" plasują się w TOP 3 wyników wyszukiwania.\n\nMożesz wygenerować i wyeksportować pełny raport miesięczny PDF w zakładce Raporty.',
    timestamp: "08:15",
    read: true,
    starred: true,
    folder: "inbox",
    category: "updates"
  },
  {
    id: "m3",
    senderName: "Zespół Bezpieczeństwa 2FA",
    senderEmail: "security@omnisuite.pl",
    subject: "Udane logowanie z nową weryfikacją dwuskładnikową (TOTP)",
    snippet: "Zarejestrowano pomyślne uwierzytelnienie dwuskładnikowe 2FA dla Twojego konta...",
    body: "Cześć Marta,\n\nTwoje konto zostało pomyślnie zweryfikowane przy użyciu 6-cyfrowego kodu z aplikacji Authenticator. Twój poziom ochrony konta wynosi obecnie 100% (Włączone 2FA + Kody Zapasowe).\n\nPamiętaj o przechowywaniu kodów ratunkowych w bezpiecznym miejscu.",
    timestamp: "Wczoraj",
    read: true,
    starred: false,
    folder: "inbox",
    category: "updates"
  },
  {
    id: "m4",
    senderName: "Piotr Wiśniewski",
    senderEmail: "p.wisniewski@design-studio.pl",
    subject: "Nowe palety wysokiego kontrastu dla trybu ciemnego (Accessibility Dark Mode)",
    snippet: "Przesyłam przygotowane pliki stylów CSS dla trybu ciemnego przyjaznego dla słabowidzących...",
    body: "Cześć,\n\nOpracowaliśmy zaktualizowany schemat kolorów WCAG 2.1 dla trybu ciemnego. Wykorzystuje on kontrastowe odcienie bursztynu i cyjanu na głębokim ciemnym tle #0f172a, zapewniając zerowe zmęczenie wzroku oraz łatwą nawigację klawiaturą.\n\nDaj znać jak oceniasz nowe wskaźniki ostrości.",
    timestamp: "04 sie",
    read: true,
    starred: false,
    folder: "inbox",
    category: "main"
  }
];
export const initialTasks = [
  {
    id: "t1",
    title: "Wygeneruj automatyczny raport miesięczny SEO & Ruchu w PDF",
    description: "Przygotuj pełny raport za ubiegły miesiąc dla Zarządu, sprawdź konwersję ruchu organicznego i udostępnij plik PDF e-mailem.",
    dueDate: "2026-08-08",
    priority: "high",
    status: "in_progress",
    tag: "Raporty & SEO",
    syncedDevicesCount: 3,
    lastSyncedAt: "Przed chwilą"
  },
  {
    id: "t2",
    title: "Weryfikacja kodów 2FA i test logowania z klawiatury",
    description: "Przetestuj pełne przechodzenie Tab/Shift+Tab przez formularz dwuskładnikowy z włączonym czytnikiem ekranu.",
    dueDate: "2026-08-07",
    priority: "high",
    status: "todo",
    tag: "Bezpieczeństwo",
    syncedDevicesCount: 3,
    lastSyncedAt: "2 min temu"
  },
  {
    id: "t3",
    title: "Optymalizacja treści pod kątem wyszukiwarek (AI Optimizer)",
    description: "Użyj modułu AI do przeszukania słów kluczowych i poprawy zagęszczenia w artykule ofertowym.",
    dueDate: "2026-08-10",
    priority: "medium",
    status: "todo",
    tag: "Content Marketing",
    syncedDevicesCount: 3,
    lastSyncedAt: "5 min temu"
  },
  {
    id: "t4",
    title: "Synchronizacja wydarzeń w kalendarzu z urządzeniami mobilnymi",
    description: "Sprawdź spójność danych między smartfonem, tabletem i aplikacją desktopową.",
    dueDate: "2026-08-06",
    priority: "low",
    status: "done",
    tag: "Kalendarz",
    syncedDevicesCount: 3,
    lastSyncedAt: "10 min temu"
  }
];
export const initialEvents = [
  {
    id: "e1",
    title: "Przegląd Wyników SEO i Statystyk Ruchu",
    description: "Miesięczne omówienie analityki internetowej, wskaźników odrzuceń i pozycji w wyszukiwarce.",
    date: "2026-08-07",
    time: "11:00",
    category: "seo_review",
    location: "Sala Konferencyjna A / Google Meet",
    syncedDevices: ["iPhone 15 Pro", "MacBook Air", "iPad Pro"],
    reminderMinutes: 15
  },
  {
    id: "e2",
    title: "Audyt Dostępności Cyfrowej WCAG 2.1 AAA",
    description: "Weryfikacja kontrastów, nawigacji klawiaturą oraz etykiet ARIA w trybie ciemnym.",
    date: "2026-08-10",
    time: "14:30",
    category: "meeting",
    location: "Online - Zespół UX/UI Accessibility",
    syncedDevices: ["iPhone 15 Pro", "MacBook Air"],
    reminderMinutes: 30
  },
  {
    id: "e3",
    title: "Generowanie i Wysyłka Raportów Miesięcznych",
    description: "Automatyczny eksport PDF raportów biznesowych i wysyłka e-mail do subskrybentów.",
    date: "2026-08-12",
    time: "09:00",
    category: "report_due",
    location: "System Automatyzacji OmniSuite",
    syncedDevices: ["MacBook Air"],
    reminderMinutes: 60
  }
];
export const initialTrafficData = [
  { date: "01 Lip", visitors: 1240, pageviews: 3890, organic: 820, direct: 310, referral: 110, bounceRate: 34.2 },
  { date: "05 Lip", visitors: 1450, pageviews: 4210, organic: 980, direct: 340, referral: 130, bounceRate: 32.8 },
  { date: "10 Lip", visitors: 1680, pageviews: 5100, organic: 1150, direct: 390, referral: 140, bounceRate: 30.5 },
  { date: "15 Lip", visitors: 1920, pageviews: 6040, organic: 1340, direct: 420, referral: 160, bounceRate: 29.1 },
  { date: "20 Lip", visitors: 2150, pageviews: 6890, organic: 1510, direct: 480, referral: 160, bounceRate: 28.4 },
  { date: "25 Lip", visitors: 2480, pageviews: 7920, organic: 1780, direct: 520, referral: 180, bounceRate: 27.2 },
  { date: "30 Lip", visitors: 2890, pageviews: 9140, organic: 2120, direct: 580, referral: 190, bounceRate: 25.8 },
  { date: "05 Sie", visitors: 3210, pageviews: 10450, organic: 2410, direct: 610, referral: 190, bounceRate: 24.5 }
];
export const initialNotifications = [
  {
    id: "n1",
    title: "Nowa wiadomość e-mail",
    message: "Marek Nowak przesłał zapytanie o audyt WCAG 2.1 i SEO.",
    timestamp: "10:42",
    type: "mail",
    read: false
  },
  {
    id: "n2",
    title: "Powiadomienie Push z Kalendarza",
    message: 'Przypomnienie: "Przegląd Wyników SEO" jutro o godz. 11:00.',
    timestamp: "09:00",
    type: "calendar",
    read: false
  },
  {
    id: "n3",
    title: "Alert Wyników SEO",
    message: "Ocena SEO Twojej strony firmowej wzrosła do 94/100!",
    timestamp: "08:15",
    type: "seo",
    read: true
  },
  {
    id: "n4",
    title: "Bezpieczeństwo Konta 2FA",
    message: "System uwierzytelniania dwuskładnikowego działa prawidłowo na wszystkich 3 zsynchronizowanych urządzeniach.",
    timestamp: "Wczoraj",
    type: "security",
    read: true
  }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRpYWxEYXRhLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1haWxJdGVtLCBUYXNrSXRlbSwgQ2FsZW5kYXJFdmVudCwgVHJhZmZpY01ldHJpYywgTm90aWZpY2F0aW9uSXRlbSwgVXNlclByb2ZpbGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsUHJvZmlsZTogVXNlclByb2ZpbGUgPSB7XG4gIG5hbWU6ICdNYXJ0YSBLb3dhbHNrYScsXG4gIGVtYWlsOiAnbWFydGEua293YWxza2FAZmlybWEtb21uaXN1aXRlLnBsJyxcbiAgcm9sZTogJ0R5cmVrdG9yIGRzLiBNYXJrZXRpbmd1IGkgRG9zdMSZcG5vxZtjaSBEaWdpdGFsJyxcbiAgYXZhdGFyVXJsOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NzM0OTYzNTkxNDItYjhkODc3MzRhNWEyP3c9MTUwJmF1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAnLFxuICBpc1R3b0ZhY3RvckVuYWJsZWQ6IHRydWUsXG4gIHR3b0ZhY3RvclNlY3JldDogJ0pCU1dZM0RQRUhQSzNQWFAnLFxuICBiYWNrdXBDb2RlczogWyc5ODIxLTQ0MTAnLCAnMzM4MS0wMDI5JywgJzc3NjEtOTAxMicsICcxMTAyLTY2MzgnLCAnNTUyOS04ODMxJ10sXG4gIGxhc3RMb2dpbjogJ0R6aXNpYWosIDA5OjE0IChJUDogMTk1LjE1MC4yMi40NSknLFxufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxNYWlsczogTWFpbEl0ZW1bXSA9IFtcbiAge1xuICAgIGlkOiAnbTEnLFxuICAgIHNlbmRlck5hbWU6ICdNYXJlayBOb3dhaycsXG4gICAgc2VuZGVyRW1haWw6ICdtLm5vd2FrQGtsaWVudC1jb3JwLnBsJyxcbiAgICBzdWJqZWN0OiAnWmFweXRhbmllIG8gb3B0eW1hbGl6YWNqxJkgU0VPIGkgZG9zdMSZcG5vxZvEhyBXQ0FHIDIuMSBkbGEgbm93ZWdvIHNlcndpc3UnLFxuICAgIHNuaXBwZXQ6ICdDemXFm8SHIE1hcnRhLCBzcHJhd2R6aWxpxZtteSBuYXN6IG5vd3kgcG9ydGFsIGZpcm1vd3kgaSBjaGNpZWxpYnnFm215IHpsZWNpxIcgYXVkeXQgU0VPIG9yYXogZG9zdG9zb3dhbmllIHBvZCBzdGFuZGFyZHkgZG9zdMSZcG5vxZtjaSBjeWZyb3dlai4uLicsXG4gICAgYm9keTogJ0N6ZcWbxIcgTWFydGEsXFxuXFxuU3ByYXdkemlsacWbbXkgbmFzeiBub3d5IHBvcnRhbCBmaXJtb3d5IGkgY2hjaWVsaWJ5xZtteSB6bGVjacSHIHBlxYJlbiBhdWR5dCBTRU8gb3JheiBkb3N0b3Nvd2FuaWUgcG9kIHN0YW5kYXJkeSBkb3N0xJlwbm/Fm2NpIGN5ZnJvd2VqIFdDQUcgMi4xIEFBQS4gWmFsZcW8eSBuYW0gc3pjemVnw7NsbmllIG5hIHBvcHJhd2llIGN6eXRlbG5vxZtjaSBkbGEgb3PDs2Igc8WCYWJvd2lkesSFY3ljaCBvcmF6IHd5c29raW0ga29udHJhxZtjaWUgaW50ZXJmZWpzdS5cXG5cXG5DenkgbW9nxYJhYnnFmyBwcnplc8WCYcSHIG5hbSB3c3TEmXBuxIUgb2ZlcnTEmSBpIGF1dG9tYXR5Y3pueSByYXBvcnQgeiBhbmFsaXrEhSBydWNodSB6YSBvc3RhdG5pIG1pZXNpxIVjP1xcblxcblBvemRyYXdpYW0sXFxuTWFyZWsgTm93YWtcXG5IZWFkIG9mIERpZ2l0YWwgRXhwZXJpZW5jZScsXG4gICAgdGltZXN0YW1wOiAnMTA6NDInLFxuICAgIHJlYWQ6IGZhbHNlLFxuICAgIHN0YXJyZWQ6IHRydWUsXG4gICAgZm9sZGVyOiAnaW5ib3gnLFxuICAgIGNhdGVnb3J5OiAnbWFpbicsXG4gIH0sXG4gIHtcbiAgICBpZDogJ20yJyxcbiAgICBzZW5kZXJOYW1lOiAnU3lzdGVtIFBvd2lhZG9taWXFhCBTRU8nLFxuICAgIHNlbmRlckVtYWlsOiAnYWxlcnRzQG9tbmlzdWl0ZS5wbCcsXG4gICAgc3ViamVjdDogJ01pZXNpxJljem55IFNrb2sgUG96eWNqaSBTRU86ICszMiUgV2lkb2N6bm/Fm2NpIHcgV3lzenVraXdhcmNlIEdvb2dsZScsXG4gICAgc25pcHBldDogJ1R3w7NqIHNlcndpcyBmaXJtb3d5IG9zacSFZ27EhcWCIGhpc3Rvcnljem55IHJla29yZCBydWNodSBvcmdhbmljem5lZ28uIFdza2HFum5payBTRU8gbmEgcG96aW9taWUgOTQvMTAwLi4uJyxcbiAgICBib2R5OiAnUmFwb3J0IEF1dG9tYXR5Y3pueSBPbW5pU3VpdGUgU0VPIEVuZ2luZTpcXG5cXG5Ud29qYSBzdHJvbmEgZmlybW93YSB6YW5vdG93YcWCYSB3enJvc3Qgd2lkb2N6bm/Fm2NpIG9yZ2FuaWN6bmVqIG8gMzIlIHcgY2nEhWd1IG9zdGF0bmljaCAzMCBkbmkuIEtsdWN6b3dlIHPFgm93YSBmcmF6b3dlIFwiZG9zdMSZcG5vxZvEhyBXQ0FHIDIuMVwiIG9yYXogXCJvcHR5bWFsaXphY2phIHN0cm9uXCIgcGxhc3VqxIUgc2nEmSB3IFRPUCAzIHd5bmlrw7N3IHd5c3p1a2l3YW5pYS5cXG5cXG5Nb8W8ZXN6IHd5Z2VuZXJvd2HEhyBpIHd5ZWtzcG9ydG93YcSHIHBlxYJueSByYXBvcnQgbWllc2nEmWN6bnkgUERGIHcgemFrxYJhZGNlIFJhcG9ydHkuJyxcbiAgICB0aW1lc3RhbXA6ICcwODoxNScsXG4gICAgcmVhZDogdHJ1ZSxcbiAgICBzdGFycmVkOiB0cnVlLFxuICAgIGZvbGRlcjogJ2luYm94JyxcbiAgICBjYXRlZ29yeTogJ3VwZGF0ZXMnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdtMycsXG4gICAgc2VuZGVyTmFtZTogJ1plc3DDs8WCIEJlenBpZWN6ZcWEc3R3YSAyRkEnLFxuICAgIHNlbmRlckVtYWlsOiAnc2VjdXJpdHlAb21uaXN1aXRlLnBsJyxcbiAgICBzdWJqZWN0OiAnVWRhbmUgbG9nb3dhbmllIHogbm93xIUgd2VyeWZpa2FjasSFIGR3dXNrxYJhZG5pa293xIUgKFRPVFApJyxcbiAgICBzbmlwcGV0OiAnWmFyZWplc3Ryb3dhbm8gcG9tecWbbG5lIHV3aWVyenl0ZWxuaWVuaWUgZHd1c2vFgmFkbmlrb3dlIDJGQSBkbGEgVHdvamVnbyBrb250YS4uLicsXG4gICAgYm9keTogJ0N6ZcWbxIcgTWFydGEsXFxuXFxuVHdvamUga29udG8gem9zdGHFgm8gcG9tecWbbG5pZSB6d2VyeWZpa293YW5lIHByenkgdcW8eWNpdSA2LWN5ZnJvd2VnbyBrb2R1IHogYXBsaWthY2ppIEF1dGhlbnRpY2F0b3IuIFR3w7NqIHBvemlvbSBvY2hyb255IGtvbnRhIHd5bm9zaSBvYmVjbmllIDEwMCUgKFfFgsSFY3pvbmUgMkZBICsgS29keSBaYXBhc293ZSkuXFxuXFxuUGFtacSZdGFqIG8gcHJ6ZWNob3d5d2FuaXUga29kw7N3IHJhdHVua293eWNoIHcgYmV6cGllY3pueW0gbWllanNjdS4nLFxuICAgIHRpbWVzdGFtcDogJ1djem9yYWonLFxuICAgIHJlYWQ6IHRydWUsXG4gICAgc3RhcnJlZDogZmFsc2UsXG4gICAgZm9sZGVyOiAnaW5ib3gnLFxuICAgIGNhdGVnb3J5OiAndXBkYXRlcycsXG4gIH0sXG4gIHtcbiAgICBpZDogJ200JyxcbiAgICBzZW5kZXJOYW1lOiAnUGlvdHIgV2nFm25pZXdza2knLFxuICAgIHNlbmRlckVtYWlsOiAncC53aXNuaWV3c2tpQGRlc2lnbi1zdHVkaW8ucGwnLFxuICAgIHN1YmplY3Q6ICdOb3dlIHBhbGV0eSB3eXNva2llZ28ga29udHJhc3R1IGRsYSB0cnlidSBjaWVtbmVnbyAoQWNjZXNzaWJpbGl0eSBEYXJrIE1vZGUpJyxcbiAgICBzbmlwcGV0OiAnUHJ6ZXN5xYJhbSBwcnp5Z290b3dhbmUgcGxpa2kgc3R5bMOzdyBDU1MgZGxhIHRyeWJ1IGNpZW1uZWdvIHByenlqYXpuZWdvIGRsYSBzxYJhYm93aWR6xIVjeWNoLi4uJyxcbiAgICBib2R5OiAnQ3plxZvEhyxcXG5cXG5PcHJhY293YWxpxZtteSB6YWt0dWFsaXpvd2FueSBzY2hlbWF0IGtvbG9yw7N3IFdDQUcgMi4xIGRsYSB0cnlidSBjaWVtbmVnby4gV3lrb3J6eXN0dWplIG9uIGtvbnRyYXN0b3dlIG9kY2llbmllIGJ1cnN6dHludSBpIGN5amFudSBuYSBnxYLEmWJva2ltIGNpZW1ueW0gdGxlICMwZjE3MmEsIHphcGV3bmlhasSFYyB6ZXJvd2Ugem3EmWN6ZW5pZSB3enJva3Ugb3JheiDFgmF0d8SFIG5hd2lnYWNqxJkga2xhd2lhdHVyxIUuXFxuXFxuRGFqIHpuYcSHIGphayBvY2VuaWFzeiBub3dlIHdza2HFum5pa2kgb3N0cm/Fm2NpLicsXG4gICAgdGltZXN0YW1wOiAnMDQgc2llJyxcbiAgICByZWFkOiB0cnVlLFxuICAgIHN0YXJyZWQ6IGZhbHNlLFxuICAgIGZvbGRlcjogJ2luYm94JyxcbiAgICBjYXRlZ29yeTogJ21haW4nLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxUYXNrczogVGFza0l0ZW1bXSA9IFtcbiAge1xuICAgIGlkOiAndDEnLFxuICAgIHRpdGxlOiAnV3lnZW5lcnVqIGF1dG9tYXR5Y3pueSByYXBvcnQgbWllc2nEmWN6bnkgU0VPICYgUnVjaHUgdyBQREYnLFxuICAgIGRlc2NyaXB0aW9uOiAnUHJ6eWdvdHVqIHBlxYJueSByYXBvcnQgemEgdWJpZWfFgnkgbWllc2nEhWMgZGxhIFphcnrEhWR1LCBzcHJhd2TFuiBrb253ZXJzasSZIHJ1Y2h1IG9yZ2FuaWN6bmVnbyBpIHVkb3N0xJlwbmlqIHBsaWsgUERGIGUtbWFpbGVtLicsXG4gICAgZHVlRGF0ZTogJzIwMjYtMDgtMDgnLFxuICAgIHByaW9yaXR5OiAnaGlnaCcsXG4gICAgc3RhdHVzOiAnaW5fcHJvZ3Jlc3MnLFxuICAgIHRhZzogJ1JhcG9ydHkgJiBTRU8nLFxuICAgIHN5bmNlZERldmljZXNDb3VudDogMyxcbiAgICBsYXN0U3luY2VkQXQ6ICdQcnplZCBjaHdpbMSFJyxcbiAgfSxcbiAge1xuICAgIGlkOiAndDInLFxuICAgIHRpdGxlOiAnV2VyeWZpa2FjamEga29kw7N3IDJGQSBpIHRlc3QgbG9nb3dhbmlhIHoga2xhd2lhdHVyeScsXG4gICAgZGVzY3JpcHRpb246ICdQcnpldGVzdHVqIHBlxYJuZSBwcnplY2hvZHplbmllIFRhYi9TaGlmdCtUYWIgcHJ6ZXogZm9ybXVsYXJ6IGR3dXNrxYJhZG5pa293eSB6IHfFgsSFY3pvbnltIGN6eXRuaWtpZW0gZWtyYW51LicsXG4gICAgZHVlRGF0ZTogJzIwMjYtMDgtMDcnLFxuICAgIHByaW9yaXR5OiAnaGlnaCcsXG4gICAgc3RhdHVzOiAndG9kbycsXG4gICAgdGFnOiAnQmV6cGllY3plxYRzdHdvJyxcbiAgICBzeW5jZWREZXZpY2VzQ291bnQ6IDMsXG4gICAgbGFzdFN5bmNlZEF0OiAnMiBtaW4gdGVtdScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3QzJyxcbiAgICB0aXRsZTogJ09wdHltYWxpemFjamEgdHJlxZtjaSBwb2Qga8SFdGVtIHd5c3p1a2l3YXJlayAoQUkgT3B0aW1pemVyKScsXG4gICAgZGVzY3JpcHRpb246ICdVxbx5aiBtb2R1xYJ1IEFJIGRvIHByemVzenVrYW5pYSBzxYLDs3cga2x1Y3pvd3ljaCBpIHBvcHJhd3kgemFnxJlzemN6ZW5pYSB3IGFydHlrdWxlIG9mZXJ0b3d5bS4nLFxuICAgIGR1ZURhdGU6ICcyMDI2LTA4LTEwJyxcbiAgICBwcmlvcml0eTogJ21lZGl1bScsXG4gICAgc3RhdHVzOiAndG9kbycsXG4gICAgdGFnOiAnQ29udGVudCBNYXJrZXRpbmcnLFxuICAgIHN5bmNlZERldmljZXNDb3VudDogMyxcbiAgICBsYXN0U3luY2VkQXQ6ICc1IG1pbiB0ZW11JyxcbiAgfSxcbiAge1xuICAgIGlkOiAndDQnLFxuICAgIHRpdGxlOiAnU3luY2hyb25pemFjamEgd3lkYXJ6ZcWEIHcga2FsZW5kYXJ6dSB6IHVyesSFZHplbmlhbWkgbW9iaWxueW1pJyxcbiAgICBkZXNjcmlwdGlvbjogJ1NwcmF3ZMW6IHNww7Nqbm/Fm8SHIGRhbnljaCBtacSZZHp5IHNtYXJ0Zm9uZW0sIHRhYmxldGVtIGkgYXBsaWthY2rEhSBkZXNrdG9wb3fEhS4nLFxuICAgIGR1ZURhdGU6ICcyMDI2LTA4LTA2JyxcbiAgICBwcmlvcml0eTogJ2xvdycsXG4gICAgc3RhdHVzOiAnZG9uZScsXG4gICAgdGFnOiAnS2FsZW5kYXJ6JyxcbiAgICBzeW5jZWREZXZpY2VzQ291bnQ6IDMsXG4gICAgbGFzdFN5bmNlZEF0OiAnMTAgbWluIHRlbXUnLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxFdmVudHM6IENhbGVuZGFyRXZlbnRbXSA9IFtcbiAge1xuICAgIGlkOiAnZTEnLFxuICAgIHRpdGxlOiAnUHJ6ZWdsxIVkIFd5bmlrw7N3IFNFTyBpIFN0YXR5c3R5ayBSdWNodScsXG4gICAgZGVzY3JpcHRpb246ICdNaWVzacSZY3puZSBvbcOzd2llbmllIGFuYWxpdHlraSBpbnRlcm5ldG93ZWosIHdza2HFum5pa8OzdyBvZHJ6dWNlxYQgaSBwb3p5Y2ppIHcgd3lzenVraXdhcmNlLicsXG4gICAgZGF0ZTogJzIwMjYtMDgtMDcnLFxuICAgIHRpbWU6ICcxMTowMCcsXG4gICAgY2F0ZWdvcnk6ICdzZW9fcmV2aWV3JyxcbiAgICBsb2NhdGlvbjogJ1NhbGEgS29uZmVyZW5jeWpuYSBBIC8gR29vZ2xlIE1lZXQnLFxuICAgIHN5bmNlZERldmljZXM6IFsnaVBob25lIDE1IFBybycsICdNYWNCb29rIEFpcicsICdpUGFkIFBybyddLFxuICAgIHJlbWluZGVyTWludXRlczogMTUsXG4gIH0sXG4gIHtcbiAgICBpZDogJ2UyJyxcbiAgICB0aXRsZTogJ0F1ZHl0IERvc3TEmXBub8WbY2kgQ3lmcm93ZWogV0NBRyAyLjEgQUFBJyxcbiAgICBkZXNjcmlwdGlvbjogJ1dlcnlmaWthY2phIGtvbnRyYXN0w7N3LCBuYXdpZ2Fjamkga2xhd2lhdHVyxIUgb3JheiBldHlraWV0IEFSSUEgdyB0cnliaWUgY2llbW55bS4nLFxuICAgIGRhdGU6ICcyMDI2LTA4LTEwJyxcbiAgICB0aW1lOiAnMTQ6MzAnLFxuICAgIGNhdGVnb3J5OiAnbWVldGluZycsXG4gICAgbG9jYXRpb246ICdPbmxpbmUgLSBaZXNww7PFgiBVWC9VSSBBY2Nlc3NpYmlsaXR5JyxcbiAgICBzeW5jZWREZXZpY2VzOiBbJ2lQaG9uZSAxNSBQcm8nLCAnTWFjQm9vayBBaXInXSxcbiAgICByZW1pbmRlck1pbnV0ZXM6IDMwLFxuICB9LFxuICB7XG4gICAgaWQ6ICdlMycsXG4gICAgdGl0bGU6ICdHZW5lcm93YW5pZSBpIFd5c3nFgmthIFJhcG9ydMOzdyBNaWVzacSZY3pueWNoJyxcbiAgICBkZXNjcmlwdGlvbjogJ0F1dG9tYXR5Y3pueSBla3Nwb3J0IFBERiByYXBvcnTDs3cgYml6bmVzb3d5Y2ggaSB3eXN5xYJrYSBlLW1haWwgZG8gc3Vic2tyeWJlbnTDs3cuJyxcbiAgICBkYXRlOiAnMjAyNi0wOC0xMicsXG4gICAgdGltZTogJzA5OjAwJyxcbiAgICBjYXRlZ29yeTogJ3JlcG9ydF9kdWUnLFxuICAgIGxvY2F0aW9uOiAnU3lzdGVtIEF1dG9tYXR5emFjamkgT21uaVN1aXRlJyxcbiAgICBzeW5jZWREZXZpY2VzOiBbJ01hY0Jvb2sgQWlyJ10sXG4gICAgcmVtaW5kZXJNaW51dGVzOiA2MCxcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsVHJhZmZpY0RhdGE6IFRyYWZmaWNNZXRyaWNbXSA9IFtcbiAgeyBkYXRlOiAnMDEgTGlwJywgdmlzaXRvcnM6IDEyNDAsIHBhZ2V2aWV3czogMzg5MCwgb3JnYW5pYzogODIwLCBkaXJlY3Q6IDMxMCwgcmVmZXJyYWw6IDExMCwgYm91bmNlUmF0ZTogMzQuMiB9LFxuICB7IGRhdGU6ICcwNSBMaXAnLCB2aXNpdG9yczogMTQ1MCwgcGFnZXZpZXdzOiA0MjEwLCBvcmdhbmljOiA5ODAsIGRpcmVjdDogMzQwLCByZWZlcnJhbDogMTMwLCBib3VuY2VSYXRlOiAzMi44IH0sXG4gIHsgZGF0ZTogJzEwIExpcCcsIHZpc2l0b3JzOiAxNjgwLCBwYWdldmlld3M6IDUxMDAsIG9yZ2FuaWM6IDExNTAsIGRpcmVjdDogMzkwLCByZWZlcnJhbDogMTQwLCBib3VuY2VSYXRlOiAzMC41IH0sXG4gIHsgZGF0ZTogJzE1IExpcCcsIHZpc2l0b3JzOiAxOTIwLCBwYWdldmlld3M6IDYwNDAsIG9yZ2FuaWM6IDEzNDAsIGRpcmVjdDogNDIwLCByZWZlcnJhbDogMTYwLCBib3VuY2VSYXRlOiAyOS4xIH0sXG4gIHsgZGF0ZTogJzIwIExpcCcsIHZpc2l0b3JzOiAyMTUwLCBwYWdldmlld3M6IDY4OTAsIG9yZ2FuaWM6IDE1MTAsIGRpcmVjdDogNDgwLCByZWZlcnJhbDogMTYwLCBib3VuY2VSYXRlOiAyOC40IH0sXG4gIHsgZGF0ZTogJzI1IExpcCcsIHZpc2l0b3JzOiAyNDgwLCBwYWdldmlld3M6IDc5MjAsIG9yZ2FuaWM6IDE3ODAsIGRpcmVjdDogNTIwLCByZWZlcnJhbDogMTgwLCBib3VuY2VSYXRlOiAyNy4yIH0sXG4gIHsgZGF0ZTogJzMwIExpcCcsIHZpc2l0b3JzOiAyODkwLCBwYWdldmlld3M6IDkxNDAsIG9yZ2FuaWM6IDIxMjAsIGRpcmVjdDogNTgwLCByZWZlcnJhbDogMTkwLCBib3VuY2VSYXRlOiAyNS44IH0sXG4gIHsgZGF0ZTogJzA1IFNpZScsIHZpc2l0b3JzOiAzMjEwLCBwYWdldmlld3M6IDEwNDUwLCBvcmdhbmljOiAyNDEwLCBkaXJlY3Q6IDYxMCwgcmVmZXJyYWw6IDE5MCwgYm91bmNlUmF0ZTogMjQuNSB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxOb3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25JdGVtW10gPSBbXG4gIHtcbiAgICBpZDogJ24xJyxcbiAgICB0aXRsZTogJ05vd2Egd2lhZG9tb8WbxIcgZS1tYWlsJyxcbiAgICBtZXNzYWdlOiAnTWFyZWsgTm93YWsgcHJ6ZXPFgmHFgiB6YXB5dGFuaWUgbyBhdWR5dCBXQ0FHIDIuMSBpIFNFTy4nLFxuICAgIHRpbWVzdGFtcDogJzEwOjQyJyxcbiAgICB0eXBlOiAnbWFpbCcsXG4gICAgcmVhZDogZmFsc2UsXG4gIH0sXG4gIHtcbiAgICBpZDogJ24yJyxcbiAgICB0aXRsZTogJ1Bvd2lhZG9taWVuaWUgUHVzaCB6IEthbGVuZGFyemEnLFxuICAgIG1lc3NhZ2U6ICdQcnp5cG9tbmllbmllOiBcIlByemVnbMSFZCBXeW5pa8OzdyBTRU9cIiBqdXRybyBvIGdvZHouIDExOjAwLicsXG4gICAgdGltZXN0YW1wOiAnMDk6MDAnLFxuICAgIHR5cGU6ICdjYWxlbmRhcicsXG4gICAgcmVhZDogZmFsc2UsXG4gIH0sXG4gIHtcbiAgICBpZDogJ24zJyxcbiAgICB0aXRsZTogJ0FsZXJ0IFd5bmlrw7N3IFNFTycsXG4gICAgbWVzc2FnZTogJ09jZW5hIFNFTyBUd29qZWogc3Ryb255IGZpcm1vd2VqIHd6cm9zxYJhIGRvIDk0LzEwMCEnLFxuICAgIHRpbWVzdGFtcDogJzA4OjE1JyxcbiAgICB0eXBlOiAnc2VvJyxcbiAgICByZWFkOiB0cnVlLFxuICB9LFxuICB7XG4gICAgaWQ6ICduNCcsXG4gICAgdGl0bGU6ICdCZXpwaWVjemXFhHN0d28gS29udGEgMkZBJyxcbiAgICBtZXNzYWdlOiAnU3lzdGVtIHV3aWVyenl0ZWxuaWFuaWEgZHd1c2vFgmFkbmlrb3dlZ28gZHppYcWCYSBwcmF3aWTFgm93byBuYSB3c3p5c3RraWNoIDMgenN5bmNocm9uaXpvd2FueWNoIHVyesSFZHplbmlhY2guJyxcbiAgICB0aW1lc3RhbXA6ICdXY3pvcmFqJyxcbiAgICB0eXBlOiAnc2VjdXJpdHknLFxuICAgIHJlYWQ6IHRydWUsXG4gIH0sXG5dO1xuIl0sIm1hcHBpbmdzIjoiQUFFTyxhQUFNLGlCQUE4QjtBQUFBLEVBQ3pDLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxFQUNQLE1BQU07QUFBQSxFQUNOLFdBQVc7QUFBQSxFQUNYLG9CQUFvQjtBQUFBLEVBQ3BCLGlCQUFpQjtBQUFBLEVBQ2pCLGFBQWEsQ0FBQyxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVc7QUFBQSxFQUM3RSxXQUFXO0FBQ2I7QUFFTyxhQUFNLGVBQTJCO0FBQUEsRUFDdEM7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLFlBQVk7QUFBQSxJQUNaLGFBQWE7QUFBQSxJQUNiLFNBQVM7QUFB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