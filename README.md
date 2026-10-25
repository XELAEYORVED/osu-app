# Osu 押忍

App iPhone et Android pour apprendre son karaté Kyokushin : le syllabus grade par grade, chaque technique en 4 images, un journal d'entraînement, un minuteur de kumite et le suivi de sa saison.

Projet personnel d'Alex, étudiant en informatique à la HEH et pratiquant de Shinkyokushin.

## Lancer l'app

Prérequis : [Node.js](https://nodejs.org) 20 ou plus, et l'app **Expo Go** sur ton téléphone (App Store / Play Store).

```bash
npm install
npm start
```

Scanne le QR code affiché avec l'appareil photo de l'iPhone (ou avec Expo Go sur Android). Le téléphone et l'ordinateur doivent être sur le même réseau Wi-Fi.

Autres commandes :

| Commande | Rôle |
|---|---|
| `npm run web` | Ouvre l'app dans le navigateur |
| `npm run typecheck` | Vérifie les types TypeScript |
| `npm test` | Lance les tests de la logique (saison, série…) |
| `npm run lint` | Vérifie le style du code |

Au premier lancement, l'app charge des données d'exemple. Tu peux les effacer dans Profil › Données.

## Stack

- Expo SDK 58, React Native, TypeScript strict
- Expo Router (navigation par fichiers dans `src/app/`)
- AsyncStorage (données sur le téléphone, aucun serveur pour l'instant)
- react-native-svg (anneaux, grille d'activité, icônes)

## Organisation

| Dossier | Contenu |
|---|---|
| `src/app/` | Écrans (une route par fichier) |
| `src/components/` | Composants réutilisables |
| `src/content/` | Syllabus et fiches techniques |
| `src/data/` | Modèle de données, stockage, données d'exemple |
| `src/lib/` | Logique métier pure + tests |
| `src/theme/` | Couleurs, espacements, typographie |
| `design/` | Maquette de référence (images et sources) |
| `docs/` | Syllabus et décisions de design |
| `PLAN.md` | Feuille de route par phases |
| `CLAUDE.md`, `.claude/agents/` | Contexte et équipe d'agents pour Claude Code |
