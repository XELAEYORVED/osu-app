/// <reference types="node" />
// Tests de la logique métier. Lancer avec : npm test
import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { Session } from '../../data/types';
import { cellLevel, isIntersaison, seasonStartYear, seasonTotals, seasonWeeks, streakWeeks } from '../stats';
import { startOfWeek } from '../dates';

const s = (date: string, place: Session['place'] = 'dojo', minutes = 90): Session => ({
  id: date + place, date, place, minutes, content: ['Kihon'], intensity: 6, feeling: 'bien',
});

test('la saison commence en septembre', () => {
  assert.equal(seasonStartYear('2026-10-06'), 2026);
  assert.equal(seasonStartYear('2027-03-01'), 2026);
});

test('juillet et août sont en intersaison', () => {
  assert.equal(isIntersaison('2027-07-14'), true);
  assert.equal(isIntersaison('2027-06-30'), false);
});

test('la semaine commence le lundi', () => {
  assert.equal(startOfWeek('2026-10-07'), '2026-10-05'); // mercredi → lundi
});

test('la grille couvre toute la saison', () => {
  const w = seasonWeeks(2026);
  assert.equal(w[0], '2026-08-31');
  assert.ok(w.length >= 43 && w.length <= 45);
});

test('totaux de saison séparés dojo / hors dojo', () => {
  const t = seasonTotals([s('2026-09-01'), s('2026-09-02', 'outside', 45), s('2026-08-20')], 2026);
  assert.equal(t.count, 2);
  assert.equal(t.dojoCount, 1);
  assert.equal(t.outsideMinutes, 45);
});

test('série : 2 séances par semaine, la semaine en cours ne casse pas la série', () => {
  const list = [s('2026-09-21'), s('2026-09-23'), s('2026-09-28'), s('2026-09-30'), s('2026-10-05')];
  assert.equal(streakWeeks(list, '2026-10-06'), 2);
});

test("l'intersaison ne casse pas la série", () => {
  const list = [s('2027-06-21'), s('2027-06-23'), s('2027-09-06'), s('2027-09-08')];
  // Semaines de juillet-août vides : ignorées. Les semaines vides de fin juin / début septembre cassent la série.
  assert.equal(streakWeeks(list, '2027-09-09'), 1);
});

test('intensité des cases selon la durée', () => {
  assert.equal(cellLevel(0), 0);
  assert.equal(cellLevel(30), 1);
  assert.equal(cellLevel(60), 2);
  assert.equal(cellLevel(120), 3);
});
