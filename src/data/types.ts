export type Place = 'dojo' | 'outside';
export type Feeling = 'epuise' | 'fatigue' | 'bien' | 'forme';

export const feelingLabels: Record<Feeling, string> = {
  epuise: 'Épuisé',
  fatigue: 'Fatigué',
  bien: 'Bien',
  forme: 'En forme',
};

export const contentOptions = ['Kihon', 'Kata', 'Kumite', 'Condition physique', 'Stamina', 'Étirements'] as const;
export type ContentKind = (typeof contentOptions)[number];

export type Session = {
  id: string;
  /** Date locale au format AAAA-MM-JJ */
  date: string;
  place: Place;
  minutes: number;
  content: ContentKind[];
  /** 1 à 10 */
  intensity: number;
  feeling: Feeling;
  senseiNote?: string;
  pain?: string;
};

export type AppState = {
  version: 1;
  /** Identifiants des techniques marquées comme maîtrisées */
  mastered: string[];
  sessions: Session[];
  goalGradeId: string;
  profile: { firstName: string; dojo: string; since: string };
};
