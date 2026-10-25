// Lexique : les mots qui reviennent dans les noms de techniques.
// Un nom se lit presque toujours comme : arme + niveau + direction + action.

export type LexiconEntry = { term: string; meaning: string };
export type LexiconGroup = { id: string; title: string; entries: LexiconEntry[] };

export const lexicon: LexiconGroup[] = [
  {
    id: 'niveaux',
    title: 'Niveaux',
    entries: [
      { term: 'Jodan', meaning: 'Haut : visage, tête' },
      { term: 'Chudan', meaning: 'Milieu : plexus, côtes' },
      { term: 'Gedan', meaning: 'Bas : bas-ventre, cuisses' },
      { term: 'Ganmen', meaning: 'Le visage' },
      { term: 'Hizo', meaning: 'Le flanc (rate, foie)' },
      { term: 'Ago', meaning: 'Le menton' },
    ],
  },
  {
    id: 'actions',
    title: 'Actions',
    entries: [
      { term: 'Dachi', meaning: 'Position' },
      { term: 'Tsuki', meaning: 'Coup direct, en ligne' },
      { term: 'Uchi', meaning: 'Frappe en arc (ou « intérieur »)' },
      { term: 'Uke', meaning: 'Blocage' },
      { term: 'Barai', meaning: 'Balayage' },
      { term: 'Geri', meaning: 'Coup de pied' },
      { term: 'Keage', meaning: 'Coup de pied montant, jambe tendue' },
    ],
  },
  {
    id: 'directions',
    title: 'Directions',
    entries: [
      { term: 'Mae', meaning: 'Vers l’avant' },
      { term: 'Yoko', meaning: 'Sur le côté' },
      { term: 'Ushiro', meaning: 'Vers l’arrière' },
      { term: 'Mawashi', meaning: 'Circulaire' },
      { term: 'Oroshi', meaning: 'De haut en bas' },
      { term: 'Age', meaning: 'Vers le haut' },
      { term: 'Uchi / Soto', meaning: 'De l’intérieur / de l’extérieur' },
      { term: 'Gyaku', meaning: 'Bras opposé à la jambe avant' },
      { term: 'Morote', meaning: 'Les deux bras' },
      { term: 'Tobi', meaning: 'Sauté' },
    ],
  },
  {
    id: 'mains',
    title: 'Armes de la main',
    entries: [
      { term: 'Seiken', meaning: 'Poing : les 2 premières phalanges' },
      { term: 'Uraken', meaning: 'Revers du poing' },
      { term: 'Tetsui', meaning: 'Poing marteau (côté auriculaire)' },
      { term: 'Shuto', meaning: 'Tranchant de la main' },
      { term: 'Haito', meaning: 'Tranchant côté pouce' },
      { term: 'Shotei', meaning: 'Base de la paume' },
      { term: 'Nukite', meaning: 'Pique des doigts' },
      { term: 'Hiraken', meaning: 'Poing à demi fermé' },
      { term: 'Koken', meaning: 'Poignet plié' },
      { term: 'Hiji', meaning: 'Coude' },
    ],
  },
  {
    id: 'pieds',
    title: 'Armes du pied',
    entries: [
      { term: 'Chusoku', meaning: 'Bol du pied (sous les orteils)' },
      { term: 'Haisoku', meaning: 'Cou-de-pied' },
      { term: 'Teisoku', meaning: 'Plante du pied' },
      { term: 'Sokuto', meaning: 'Tranchant du pied' },
      { term: 'Kakato', meaning: 'Talon' },
      { term: 'Hiza', meaning: 'Genou' },
    ],
  },
  {
    id: 'regles',
    title: 'Règles et mots du dojo',
    entries: [
      { term: 'Hikite', meaning: 'Le poing qui ne travaille pas revient à la poitrine, paume vers le haut, en même temps que la technique' },
      { term: 'Kime', meaning: 'Arrêt net et expiration à la fin de la technique' },
      { term: 'Ido-geiko', meaning: 'En déplacement' },
      { term: 'Mawate', meaning: 'Demi-tour' },
      { term: 'Naore', meaning: 'Revenir en position' },
      { term: 'Kumite', meaning: 'Combat' },
      { term: 'Kata', meaning: 'Enchaînement codifié de techniques' },
    ],
  },
];
