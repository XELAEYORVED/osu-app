# Osu — app d'apprentissage du karaté Kyokushin

Projet perso d'Alex (étudiant bachelier informatique, HEH, pratiquant de Shinkyokushin depuis 15 ans).
Objectif : remplacer le syllabus papier par une app claire et motivante pour apprendre son karaté, puis la proposer à terme à la fédération belge de karaté Kyokushin.

## Façon de travailler
- Réponds en français.
- **Propose toujours avant de coder** (plan court, fichiers touchés), attends le feu vert d'Alex pour les gros changements.
- Avance par petites étapes qui tournent, une fonctionnalité à la fois, avec un commit par étape.
- Explique les choix techniques simplement : Alex doit pouvoir les défendre devant un prof.

## Stack (en place)
- **Expo SDK 58 (React Native 0.88) + TypeScript strict**, navigation **Expo Router** : les routes sont dans `src/app/`.
- Données : **AsyncStorage** via un seul store React (`src/data/store.tsx`), données d'exemple au premier lancement (`src/data/seed.ts`). Passage à expo-sqlite prévu en phase 4 (voir `PLAN.md`).
- Logique métier pure et testée dans `src/lib/` (`npm test`, runner de Node + tsx).
- Icônes dessinées en SVG (`src/components/Icon.tsx`), pas de librairie d'icônes.
- Plus tard : Supabase (comptes, sync) et un endpoint serveur pour l'IA (jamais de clé API dans l'app).
- Expo évolue vite : lire `AGENTS.md` et la doc versionnée (https://docs.expo.dev/versions/v58.0.0/) avant d'utiliser une API Expo. Installer les paquets avec `npx expo install`.

## Structure
```
src/app/            routes Expo Router : (tabs)/ index, learn, kumite, agenda, journal ; grade/[id] ; technique/[id] ; session/new (modale) ; profile
src/components/     Icon, ui (Screen, Card, ListRow, Segmented, Chip…), Rings, Belt, ActivityGrid
src/content/        syllabus.ts (10e kyu détaillé) + grades-other.json (autres grades, issus de docs/syllabus.md)
src/data/           types, store (AsyncStorage), seed
src/lib/            dates, stats (saison, série, intersaison, totaux) + __tests__
src/theme/tokens.ts couleurs, rayons, espacements, typo
assets/techniques/  images des techniques
```

## Commandes
`npm start` (Expo Go / simulateur) · `npm run web` · `npm run typecheck` · `npm test` · `npm run lint`

## Plan de travail
Voir **`PLAN.md`** : phases, tâches cochables et agent à utiliser pour chacune. Mettre à jour les cases après chaque tâche terminée.

## Design (voir `design/`)
- `design/screens/*.png` : rendus des écrans de la maquette (390 × 844 pt, @3x). C'est la référence visuelle.
- `design/source/*.dc.html` : sources HTML de la maquette (structure, textes, données d'exemple, logique d'état). À lire pour reprendre les textes et les données, pas à exécuter.
- `design/icon-1024-source.png` : icône (押 à l'encre, blanc sur graphite).
- `assets/techniques/mae-gedan-barai-0..3.png` : les 4 images clés de la fiche technique (garde, armer, balayer, kime), fond transparent.
- Détails de la direction visuelle : `docs/design.md`.

### Tokens
| Rôle | Valeur |
|---|---|
| Fond | `#000000` |
| Carte | `#1C1C1E` |
| Séparateur | `#38383A` |
| Texte secondaire | `rgba(235,235,245,0.6)` |
| Accent | `#FF3B47` (`#D7263D` derrière du texte blanc) |
| Ceintures | orange `#F28C28`, bleu `#2F6FDE`, jaune `#F2C230`, vert `#2E9E5B`, marron `#7A4A2A` |
| Activité dojo | `#0E4429` / `#26A641` / `#39D353` |
| Activité hors dojo | `#0C2D6B` / `#1F6FEB` / `#58A6FF` |

Style sombre inspiré d'Apple Fitness, anneaux de progression, pas de kanji décoratifs dans l'interface (noms des techniques en romaji). Le logo officiel Kyokushin n'est jamais redessiné : emplacement « Logo » où l'utilisateur met son image.

## Navigation
5 onglets : Aujourd'hui · Apprendre · Kumite · Agenda · Journal. Le Profil s'ouvre depuis l'avatar. « Nouvelle séance » est une feuille modale.

## État actuel
Phases 0 et 1 faites (voir `PLAN.md`) : onglets, thème, Apprendre (grades → fiche grade → fiche technique en 4 images), Journal + Nouvelle séance, Aujourd'hui (anneaux réels), minuteur de kumite, Profil (stats de saison, série, grille d'activité). Agenda, lexique et examen blanc sont des écrans provisoires.

## Règles de contenu
- Ne pas mentionner le nom de l'organisation qui publie le syllabus dans l'interface ou les visuels publics (dire « syllabus »).
- Pas de reproduction de logos, emblèmes ou illustrations protégées ; les illustrations des techniques sont les nôtres (`assets/techniques`).
- Hikite toujours à la poitrine.
- Données d'exemple : Alex, inscrit le 1er septembre 2026, objectif 10e kyu (passage le 12 décembre 2026). Champs à remplir : [TON DOJO], [NOM DU SENSEI], [LIEU], [NOM DE LA COMPÉTITION].

## Équipe d'agents (`.claude/agents/`)

| Agent | Modèle | Quand l'utiliser |
|---|---|---|
| `lecteur` | haiku, lecture seule | Comprendre un fichier, un dossier ou une maquette `design/source/*.dc.html` ; trouver où se trouve quelque chose |
| `architecte` | opus, lecture seule | Début d'une grosse étape, modèle de données, choix technique structurant, découpage en étapes |
| `frontend` | sonnet | Écrans, composants, thème, navigation, animations |
| `backend` | sonnet | Base SQLite, couche d'accès, contenu du syllabus en JSON, calculs (stats, saison, série), plus tard Supabase et IA |
| `testeur` | sonnet | Après une modification : tests, `tsc`, lint ; ajout de tests sur la logique métier |
| `securite` | opus, lecture seule | Après chaque fonctionnalité terminée : audit sécurité et confidentialité |

### Règles
1. **Lire avant de modifier** : avant de toucher du code ou une maquette que tu n'as pas encore vus dans cette session, passe par `lecteur` et travaille à partir de son résumé au lieu de relire les fichiers.
2. **Sécurité systématique** : quand une fonctionnalité est terminée (et que `testeur` est vert), lance `securite`. Corrige les failles Critique et Haute avant de passer à la suite.
3. **Pas d'agent pour une tâche simple** : une petite correction, un renommage, un texte à changer, une question rapide se font directement, sans sous-agent.
4. **Comptes rendus courts** : chaque agent renvoie un résumé structuré (fichiers touchés, ce qui a été fait, points d'attention), jamais le contenu complet des fichiers ni les sorties complètes des commandes.
5. **Enchaînement type** pour une fonctionnalité : `architecte` (si nécessaire) → `lecteur` → `backend` → `frontend` → `testeur` → `securite` → résumé à Alex.
6. Toujours **proposer le plan à Alex avant** de lancer une série d'agents sur une grosse fonctionnalité.
