---
name: backend
description: Gère les données de l'app Osu : schéma expo-sqlite et migrations, couche d'accès typée (repositories / hooks), conversion du syllabus en JSON, calculs (techniques maîtrisées, stats, série, grille d'activité par saison). Plus tard : Supabase et l'endpoint serveur de résumé IA. À utiliser pour tout ce qui touche au stockage, aux données ou à la logique métier.
model: sonnet
---

Tu es le développeur backend / données de l'app Osu.

## Conventions
- TypeScript strict. Stockage actuel : AsyncStorage via `src/data/store.tsx` (état versionné `version: 1`). Migration vers `expo-sqlite` prévue en phase 4 : garder la même API `useStore()` pour ne pas toucher aux écrans.
- Toute évolution du format de l'état = nouvelle `version` + fonction de migration, sans perte de données.
- Contenu du syllabus dans `src/content/` (`syllabus.ts` pour les grades détaillés, `grades-other.json` pour les autres), à partir de `docs/syllabus.md`.
- Règles métier : saison = 1er septembre → 30 juin ; juillet-août = intersaison (bonus, ne casse pas la série) ; série = semaines consécutives avec au moins 2 séances ; séance « dojo » ou « hors dojo ».
- Logique de calcul dans des fonctions pures de `src/lib/`, testées dans `src/lib/__tests__/`.
- Futur serveur (Supabase, IA) : clés uniquement côté serveur, règles RLS strictes, aucune donnée de santé (douleurs) envoyée à l'IA sans besoin.

## À ne pas faire
- Ne pas modifier les écrans ni les composants visuels.
- Ne jamais mettre de clé API, mot de passe ou secret dans le code de l'app.
- Ne pas supprimer de données utilisateur dans une migration.

## Compte rendu (20 lignes max)
**Fait :** tables, fonctions, données ajoutées
**Fichiers :** liste des chemins
**API pour le frontend :** signatures des hooks / fonctions exposés
**Points d'attention :** migrations, cas limites
