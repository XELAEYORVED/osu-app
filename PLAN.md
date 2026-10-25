# Plan de développement d'Osu

Chaque phase se termine par une version qui tourne sur le téléphone. Coche les cases au fur et à mesure.
Agents : voir `CLAUDE.md` › « Équipe d'agents ». Après chaque phase : `testeur` puis `securite`.

---

## Phase 0 · Fondations ✅
- [x] Projet Expo SDK 58 + TypeScript strict + Expo Router (`src/app/`)
- [x] Thème (tokens de la maquette), icônes SVG, composants de base
- [x] 5 onglets + Profil + modale « Nouvelle séance »
- [x] Store local (AsyncStorage) + données d'exemple au premier lancement
- [x] Tests de la logique (saison, série, intersaison, totaux) : `npm test`

## Phase 1 · MVP « apprendre et s'entraîner » ✅ (à tester sur ton iPhone)
- [x] Apprendre : grades kyu/dan → fiche du grade (checklist cochable) → fiche technique
- [x] Fiche technique en 4 images avec lecture auto (seiken mae gedan barai)
- [x] Journal : stats 7 jours, corrections qui reviennent, filtre dojo / hors dojo
- [x] Nouvelle séance : lieu, durée, contenu, intensité, ressenti, correction du sensei, douleur
- [x] Aujourd'hui : anneaux techniques / entraînements calculés sur les vraies données
- [x] Kumite : minuteur de rounds (2:00 / 0:30 × 5) avec vibration
- [x] Profil : heures, jours, série, grille d'activité de la saison
- [ ] **Toi** : lancer l'app sur ton iPhone avec Expo Go et noter ce qui ne va pas
- [ ] Supprimer / modifier une séance (appui long sur une carte du journal) · `frontend` + `backend`
- [ ] Choisir le grade visé dans le Profil (aujourd'hui fixé au 10e kyu) · `frontend` + `backend`

## Phase 2 · Contenu et révision
- [ ] Illustrer les 9 techniques du 10e kyu (4 images chacune, hikite à la poitrine) · toi + `frontend`
- [ ] Textes des fiches (étapes, points clés, erreurs) pour le 10e kyu · toi (le karatéka, c'est toi)
- [ ] Lexique : liste par catégorie + mode cartes « À revoir / Je sais » (répétition espacée simple) · `backend` + `frontend`
- [ ] Examen blanc : QCM généré depuis le syllabus et le lexique, score, explications · `backend` + `frontend`
- [ ] Compteur japonais à voix haute (ichi, ni, san…) avec expo-speech · `frontend`
- [ ] Détailler le 9e kyu, puis grade par grade
- **Livrable** : un élève peut préparer tout son 10e kyu avec l'app.

## Phase 3 · Kumite et agenda
- [ ] Réglages du minuteur (rounds, durées, signal) sauvegardés · `frontend`
- [ ] Carnet de combats : adversaire, résultat, ce qui marque / ce qui touche · `backend` + `frontend`
- [ ] Bilan de saison (victoires, défaites, nuls, barres « ce qui marque ») · `frontend`
- [ ] Agenda : mois avec pastilles, événements (cours, stage, compétition, passage de grade) · `architecte` puis `backend` + `frontend`
- [ ] Compte à rebours de la prochaine compétition sur l'écran Aujourd'hui
- [ ] « J'y étais » sur un cours → crée la séance dans le journal
- [ ] Notifications locales (rappel d'entraînement, veille de compétition) avec expo-notifications

## Phase 4 · Données solides et finitions
- [ ] Migrer le stockage vers expo-sqlite, sans perte (migration depuis AsyncStorage) · `architecte` puis `backend`
- [ ] Export / import des données (fichier JSON) pour ne rien perdre en changeant de téléphone
- [ ] Bloc « Intersaison » (juillet-août) dans le Profil, parcours de ceinture
- [ ] Emplacement « Logo du dojo » : l'utilisateur choisit une image (expo-image-picker)
- [ ] Accessibilité (VoiceOver, tailles de texte) et animations (react-native-reanimated)
- [ ] Traduction anglaise (textes centralisés)
- [ ] Tests des écrans (Jest + React Native Testing Library) · `testeur`

## Phase 5 · Comptes et IA
- [ ] Supabase : comptes, synchronisation, règles RLS strictes · `architecte` (opus) puis `backend`
- [ ] Résumé IA du journal via une Edge Function (clé API côté serveur uniquement, données minimales, pas de données de santé) · `backend` + `securite`
- [ ] Consentement RGPD, suppression du compte et des données

## Phase 6 · Publication
- [ ] Icône finale, écran de lancement, captures App Store (la vidéo prototype aide)
- [ ] Build et TestFlight avec EAS (`npx eas-cli@latest build`) pour faire tester ton club
- [ ] Retours des élèves et des instructeurs → corrections
- [ ] Autorisation écrite pour le contenu du syllabus et le nom avant publication publique
- [ ] Présentation à la fédération

---

### Méthode pour chaque tâche (avec Claude Code)
1. « Propose-moi le plan pour : *tâche* » → valider.
2. L'agent indiqué code, `testeur` vérifie (`npm run typecheck` + `npm test`).
3. Tu testes sur ton iPhone.
4. Commit : `git commit -m "phase X : tâche"`, puis tu coches la case ici.
