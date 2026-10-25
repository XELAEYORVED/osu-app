// Données d'exemple chargées au premier lancement (mêmes données que la maquette).
// Elles peuvent être effacées depuis le Profil.
import type { AppState, Session } from './types';

const s = (
  id: number,
  date: string,
  place: Session['place'],
  minutes: number,
  content: Session['content'],
  intensity: number,
  feeling: Session['feeling'],
  senseiNote?: string,
  pain?: string,
): Session => ({ id: `seed-${id}`, date, place, minutes, content, intensity, feeling, senseiNote, pain });

const sessions: Session[] = [
  s(1, '2026-09-01', 'dojo', 90, ['Kihon'], 6, 'bien'),
  s(2, '2026-09-03', 'dojo', 90, ['Kihon', 'Kata'], 6, 'bien'),
  s(3, '2026-09-08', 'dojo', 90, ['Kihon', 'Kumite'], 7, 'fatigue'),
  s(4, '2026-09-10', 'dojo', 90, ['Kihon'], 6, 'bien'),
  s(5, '2026-09-13', 'outside', 45, ['Condition physique'], 6, 'bien'),
  s(6, '2026-09-15', 'dojo', 90, ['Kihon', 'Kata'], 7, 'bien'),
  s(7, '2026-09-17', 'dojo', 90, ['Kumite'], 8, 'fatigue', 'Garde trop basse en fin de round.'),
  s(8, '2026-09-20', 'outside', 60, ['Kihon', 'Étirements'], 5, 'forme'),
  s(9, '2026-09-22', 'dojo', 90, ['Kihon'], 7, 'bien', 'Hikite trop bas : le poing doit revenir contre la poitrine.'),
  s(10, '2026-09-24', 'dojo', 90, ['Kihon', 'Kumite'], 7, 'bien'),
  s(11, '2026-09-27', 'outside', 45, ['Condition physique', 'Kihon'], 6, 'bien'),
  s(12, '2026-09-29', 'dojo', 90, ['Kihon', 'Kata'], 7, 'bien', 'Genou avant qui rentre en zenkutsu : le garder au-dessus du pied.'),
  s(13, '2026-10-01', 'dojo', 90, ['Kumite'], 8, 'fatigue', 'Garde trop basse en fin de round.'),
  s(14, '2026-10-03', 'dojo', 90, ['Kihon', 'Kata'], 7, 'bien', 'Genou avant qui rentre en zenkutsu : le garder au-dessus du pied.', 'Tibia gauche, douleur légère'),
  s(15, '2026-10-04', 'outside', 45, ['Condition physique', 'Kihon'], 6, 'bien', 'Hikite trop bas : le poing doit revenir contre la poitrine.'),
  s(16, '2026-10-06', 'dojo', 90, ['Kihon', 'Kumite'], 8, 'forme', 'Hikite trop bas : le poing doit revenir contre la poitrine.'),
  s(17, '2026-10-06', 'outside', 30, ['Stamina'], 6, 'forme'),
];

export const seedState: AppState = {
  version: 1,
  mastered: ['fudo-dachi', 'yoi-dachi', 'zenkutsu-dachi', 'seiken-oi-tsuki', 'seiken-morote-tsuki', 'hiza-ganmen-geri'],
  sessions,
  goalGradeId: 'kyu10',
  profile: { firstName: 'Alex', dojo: '[TON DOJO]', since: '2026-09-01' },
};

export const emptyState: AppState = {
  version: 1,
  mastered: [],
  sessions: [],
  goalGradeId: 'kyu10',
  profile: { firstName: 'Alex', dojo: '[TON DOJO]', since: '2026-09-01' },
};
