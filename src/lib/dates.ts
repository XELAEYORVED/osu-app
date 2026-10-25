// Petites fonctions de date sans dépendance. Les dates sont des chaînes locales « AAAA-MM-JJ ».

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const MONTHS_SHORT = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const DAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

const pad = (n: number) => String(n).padStart(2, '0');

/** Date → « AAAA-MM-JJ » (heure locale) */
export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** « AAAA-MM-JJ » → Date à midi (évite les décalages de fuseau) */
export function fromISODate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d, 12);
}

export function addDays(s: string, n: number): string {
  const d = fromISODate(s);
  d.setDate(d.getDate() + n);
  return toISODate(d);
}

/** Lundi de la semaine qui contient la date */
export function startOfWeek(s: string): string {
  const d = fromISODate(s);
  const shift = (d.getDay() + 6) % 7; // lundi = 0
  return addDays(s, -shift);
}

export function today(): string {
  return toISODate(new Date());
}

/** « mardi 6 octobre » */
export function formatLong(s: string): string {
  const d = fromISODate(s);
  return `${DAYS[d.getDay()]} ${d.getDate() === 1 ? '1er' : d.getDate()} ${MONTHS[d.getMonth()]}`;
}

/** « Mardi 6 octobre » */
export function formatLongCap(s: string): string {
  const t = formatLong(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export const monthShort = (monthIndex: number) => MONTHS_SHORT[monthIndex];
export const monthLong = (monthIndex: number) => MONTHS[monthIndex];

export function formatMinutes(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} h ${pad(m)}` : `${h} h`;
}
