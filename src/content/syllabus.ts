import type { ImageSourcePropType } from 'react-native';
import otherGrades from './grades-other.json';
import { belt } from '@/theme/tokens';

export type Category = 'positions' | 'bras' | 'blocages' | 'jambes' | 'kata' | 'autres';
export type BeltColor = keyof typeof belt;

export const categoryLabels: Record<Category, string> = {
  positions: 'Positions',
  bras: 'Bras et mains',
  blocages: 'Blocages',
  jambes: 'Jambes et pieds',
  kata: 'Kata',
  autres: 'Kumite et autres',
};

export type TechniqueStep = { label: string; text: string; image?: ImageSourcePropType };

export type Technique = {
  id: string;
  name: string;
  detail: string;
  /** Explication courte (aide-mémoire, à faire valider par le sensei). */
  description?: string;
  category: Category;
  /** Fiche détaillée (4 images clés). Absente tant que la technique n'est pas illustrée. */
  steps?: TechniqueStep[];
  facts?: { position: string; level: string; hikite: string };
  keyPoints?: string[];
  mistakes?: string[];
};

export type Grade = {
  id: string;
  label: string;
  kind: 'kyu' | 'dan';
  belt: BeltColor;
  stripe: boolean;
  beltName: string;
  techniques: Technique[];
  stamina?: { squats: number; situps: number; pushups: number };
  knowledge?: string[];
  exam?: { duration: string; fee: string; place: string };
};

// --- 10e kyu : premier grade, entièrement détaillé (référence : design/screens/Grade.png) ---
const kyu10: Grade = {
  id: 'kyu10',
  label: '10e kyu',
  kind: 'kyu',
  belt: 'orange',
  stripe: false,
  beltName: 'Ceinture orange',
  stamina: { squats: 20, situps: 20, pushups: 10 },
  knowledge: [
    'Plier et porter correctement le gi',
    'Histoire et valeurs du Kyokushin',
    'Étiquette du dojo et salut',
    'Compter jusqu’à 10',
  ],
  exam: { duration: '20 min.', fee: '20 €', place: 'Au club' },
  techniques: [
    {
      id: 'fudo-dachi',
      name: 'Fudo dachi',
      detail: 'Position inébranlable',
      description:
        'Pieds écartés largeur d’épaules, pointes légèrement ouvertes, genoux souples, poings fermés devant la ceinture.',
      category: 'positions',
    },
    {
      id: 'yoi-dachi',
      name: 'Yoi dachi',
      detail: 'Position de préparation',
      description:
        'Position de départ avant un exercice : même placement des pieds, les bras se croisent puis descendent, poings devant la ceinture.',
      category: 'positions',
    },
    {
      id: 'zenkutsu-dachi',
      name: 'Zenkutsu dachi',
      detail: 'Avancer, demi-tour, revenir',
      description:
        'Position avant : genou avant fléchi au-dessus des orteils, jambe arrière tendue, environ 70 % du poids devant. À faire en avançant (ido-geiko), en demi-tour (mawate) et en revenant (naore).',
      category: 'positions',
    },
    {
      id: 'seiken-oi-tsuki',
      name: 'Seiken oi tsuki',
      detail: 'Jodan, chudan, gedan',
      description:
        'Coup de poing direct du côté de la jambe avant, en avançant. Le poing qui ne frappe pas revient à la poitrine (hikite).',
      category: 'bras',
    },
    {
      id: 'seiken-morote-tsuki',
      name: 'Seiken morote tsuki',
      detail: 'Jodan, chudan, gedan',
      description: 'Les deux poings partent ensemble, en parallèle.',
      category: 'bras',
    },
    {
      id: 'seiken-jodan-uke',
      name: 'Seiken jodan uke',
      detail: 'Blocage niveau haut',
      description:
        'L’avant-bras monte en biais au-dessus du front, à un poing de distance, pour dévier une attaque au visage.',
      category: 'blocages',
    },
    {
      id: 'seiken-mae-gedan-barai',
      name: 'Seiken mae gedan barai',
      detail: 'Balayage niveau bas',
      description:
        'Le poing part de l’oreille opposée et balaie vers le bas, pour finir à l’extérieur de la cuisse avant, au-dessus du genou.',
      category: 'blocages',
      facts: { position: 'Zenkutsu', level: 'Gedan', hikite: 'Poitrine' },
      steps: [
        {
          label: 'Garde',
          text: 'Zenkutsu dachi gauche. Poing gauche au-dessus du genou avant, poing droit en hikite contre la poitrine.',
          image: require('../../assets/techniques/mae-gedan-barai-0.png'),
        },
        {
          label: 'Armer',
          text: 'Le poing gauche monte à l’oreille droite, paume vers soi. Le bras droit s’allonge vers le bas, devant le corps.',
          image: require('../../assets/techniques/mae-gedan-barai-1.png'),
        },
        {
          label: 'Balayer',
          text: 'Le bras gauche balaie vers le bas devant le corps, le bras droit revient en hikite. Les hanches tournent.',
          image: require('../../assets/techniques/mae-gedan-barai-2.png'),
        },
        {
          label: 'Kime',
          text: 'Arrêt net : bras presque tendu, paume vers le bas, poing au-dessus du genou avant. Expiration.',
          image: require('../../assets/techniques/mae-gedan-barai-3.png'),
        },
      ],
      keyPoints: [
        'Le poing qui bloque part de l’oreille opposée, paume tournée vers soi.',
        'Les bras se croisent devant le corps, le bras qui bloque passe par-dessus.',
        'Fin du blocage à l’extérieur de la cuisse avant, poing à environ 20 cm au-dessus du genou.',
        'Le hikite revient contre la poitrine, paume vers le haut, en même temps que le blocage.',
      ],
      mistakes: [
        'Bloquer devant l’aine au lieu de finir à l’extérieur de la cuisse.',
        'Hausser les épaules pendant la préparation.',
        'Tirer le hikite après le blocage au lieu de le faire en même temps.',
      ],
    },
    {
      id: 'hiza-ganmen-geri',
      name: 'Hiza ganmen geri',
      detail: 'Genou au visage',
      description: 'On saisit la tête à deux mains et on la tire vers le genou qui monte.',
      category: 'jambes',
    },
    {
      id: 'kin-geri',
      name: 'Kin geri',
      detail: 'Cou-de-pied vers le haut',
      description: 'Coup de pied montant à l’entrejambe avec le cou-de-pied.',
      category: 'jambes',
    },
  ],
};

export const grades: Grade[] = [kyu10, ...(otherGrades as Grade[])];

export const getGrade = (id: string) => grades.find((g) => g.id === id);

export function getTechnique(id: string): { technique: Technique; grade: Grade } | undefined {
  for (const grade of grades) {
    const technique = grade.techniques.find((t) => t.id === id);
    if (technique) return { technique, grade };
  }
  return undefined;
}

/** Grade visé par défaut (MVP : un seul utilisateur qui prépare le 10e kyu). */
export const DEFAULT_GOAL_GRADE = 'kyu10';
