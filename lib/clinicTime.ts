const clinicDate = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Europe/Warsaw', year: 'numeric', month: '2-digit', day: '2-digit',
});
const clinicOffset = new Intl.DateTimeFormat('en', {
  timeZone: 'Europe/Warsaw', timeZoneName: 'longOffset',
});

export function getClinicDate(value: Date) {
  return clinicDate.format(value);
}

export function getClinicHour(date: string, hour: number) {
  const utc = Date.parse(`${date}T00:00:00Z`) + hour * 3_600_000;
  let timestamp = utc;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const offset = clinicOffset.formatToParts(timestamp).find((part) => part.type === 'timeZoneName')?.value;
    const match = /^GMT([+-])(\d{2}):(\d{2})$/.exec(offset ?? '');
    if (!match) return new Date(timestamp);
    const direction = match[1] === '+' ? 1 : -1;
    const next = utc - direction * (Number(match[2]) * 60 + Number(match[3])) * 60_000;
    if (next === timestamp) break;
    timestamp = next;
  }
  return new Date(timestamp);
}
