// Logique métier pure (sans React) : facile à tester.
import type { Session } from '@/data/types';
import { addDays, fromISODate, startOfWeek } from './dates';

/** Une saison va du 1er septembre au 30 juin. Juillet-août = intersaison. */
export function seasonStartYear(date: string): number {
  const d = fromISODate(date);
  return d.getMonth() >= 6 ? d.getFullYear() : d.getFullYear() - 1; // juillet et après → saison qui commence cette année
}

export function isIntersaison(date: string): boolean {
  const m = fromISODate(date).getMonth();
  return m === 6 || m === 7; // juillet, août
}

export function seasonBounds(startYear: number) {
  return { start: `${startYear}-09-01`, end: `${startYear + 1}-06-30` };
}

export const seasonLabel = (startYear: number) => `${startYear}–${startYear + 1}`;

export function inSeason(date: string, startYear: number): boolean {
  const { start, end } = seasonBounds(startYear);
  return date >= start && date <= end;
}

export type DayActivity = { dojo: number; outside: number; minutes: number };

export function activityByDay(sessions: Session[]): Map<string, DayActivity> {
  const map = new Map<string, DayActivity>();
  for (const s of sessions) {
    const a = map.get(s.date) ?? { dojo: 0, outside: 0, minutes: 0 };
    if (s.place === 'dojo') a.dojo += 1;
    else a.outside += 1;
    a.minutes += s.minutes;
    map.set(s.date, a);
  }
  return map;
}

/** Niveau d'intensité de la case (1 à 3) selon la durée totale du jour */
export function cellLevel(minutes: number): 0 | 1 | 2 | 3 {
  if (minutes <= 0) return 0;
  if (minutes < 45) return 1;
  if (minutes < 90) return 2;
  return 3;
}

/** Semaines (lundi) couvrant la saison, pour la grille d'activité */
export function seasonWeeks(startYear: number): string[] {
  const { start, end } = seasonBounds(startYear);
  const weeks: string[] = [];
  for (let w = startOfWeek(start); w <= end; w = addDays(w, 7)) weeks.push(w);
  return weeks;
}

export function seasonTotals(sessions: Session[], startYear: number) {
  const list = sessions.filter((s) => inSeason(s.date, startYear));
  const dojo = list.filter((s) => s.place === 'dojo');
  const outside = list.filter((s) => s.place === 'outside');
  const sum = (l: Session[]) => l.reduce((t, s) => t + s.minutes, 0);
  return {
    count: list.length,
    days: new Set(list.map((s) => s.date)).size,
    dojoCount: dojo.length,
    outsideCount: outside.length,
    minutes: sum(list),
    dojoMinutes: sum(dojo),
    outsideMinutes: sum(outside),
  };
}

/**
 * Série = nombre de semaines consécutives avec au moins `perWeek` séances,
 * en comptant la semaine en cours si elle est déjà validée.
 * Les semaines entièrement en intersaison sont ignorées (elles ne cassent pas la série).
 */
export function streakWeeks(sessions: Session[], today: string, perWeek = 2): number {
  const counts = new Map<string, number>();
  for (const s of sessions) {
    const w = startOfWeek(s.date);
    counts.set(w, (counts.get(w) ?? 0) + 1);
  }
  let week = startOfWeek(today);
  // La semaine en cours ne casse pas la série tant qu'elle n'est pas finie.
  if ((counts.get(week) ?? 0) < perWeek) week = addDays(week, -7);
  let streak = 0;
  for (let i = 0; i < 60; i++) {
    const allSummer = isIntersaison(week) && isIntersaison(addDays(week, 6));
    if (allSummer) {
      week = addDays(week, -7);
      continue;
    }
    if ((counts.get(week) ?? 0) >= perWeek) streak += 1;
    else break;
    week = addDays(week, -7);
  }
  return streak;
}

export function lastDays(sessions: Session[], today: string, days = 7) {
  const from = addDays(today, -(days - 1));
  const list = sessions.filter((s) => s.date >= from && s.date <= today);
  const minutes = list.reduce((t, s) => t + s.minutes, 0);
  const intensity = list.length ? list.reduce((t, s) => t + s.intensity, 0) / list.length : 0;
  return { count: list.length, minutes, intensity };
}

/** Corrections du sensei qui reviennent (base du futur résumé IA) */
export function recurringNotes(sessions: Session[]): { text: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const s of sessions) {
    const note = s.senseiNote?.split(':')[0].trim();
    if (note) counts.set(note, (counts.get(note) ?? 0) + 1);
  }
  return [...counts.entries()].map(([text, count]) => ({ text, count })).sort((a, b) => b.count - a.count);
}
