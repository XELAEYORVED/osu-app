/// <reference types="node" />
// Vérifie le contenu du syllabus et du lexique. Lancer avec : npm test
// (syllabus.ts charge des images, on teste donc directement le JSON des autres grades.)
import assert from 'node:assert/strict';
import { test } from 'node:test';
import otherGrades from '../grades-other.json';
import { lexicon } from '../lexicon';

const KYU = ['kyu9', 'kyu8', 'kyu7', 'kyu6', 'kyu5', 'kyu4', 'kyu3', 'kyu2', 'kyu1'];

test('chaque technique du 9e au 1er kyu a une explication', () => {
  for (const id of KYU) {
    const grade = otherGrades.find((g) => g.id === id);
    assert.ok(grade, `grade ${id} manquant`);
    for (const t of grade.techniques as { id: string; description?: string }[]) {
      assert.ok(t.description && t.description.trim().length > 0, `${t.id} sans description`);
    }
  }
});

test('les identifiants de techniques sont uniques', () => {
  const ids = otherGrades.flatMap((g) => g.techniques.map((t) => t.id));
  assert.equal(new Set(ids).size, ids.length);
});

test('le lexique n’a ni entrée vide ni doublon', () => {
  const terms = lexicon.flatMap((g) => g.entries.map((e) => e.term));
  assert.equal(new Set(terms).size, terms.length);
  for (const g of lexicon) {
    assert.ok(g.entries.length > 0, `groupe ${g.id} vide`);
    for (const e of g.entries) assert.ok(e.term && e.meaning, `entrée vide dans ${g.id}`);
  }
});
