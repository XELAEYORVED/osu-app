# Osu : décisions de design (maquette au 9 octobre 2026)

Maquette cliquable de 12 écrans iPhone (390 × 844), rendus dans `design/screens/`.

## Direction visuelle
- Style sombre inspiré d'Apple Fitness : fond noir, cartes #1C1C1E, accent rouge #FF3B47 (#D7263D derrière du texte blanc), chiffres en police arrondie, anneaux de progression.
- Pas de kanji décoratifs dans l'interface. Noms des techniques en romaji.
- Logo Kyokushin officiel : emplacement réservé, l'utilisateur dépose son image lui-même.
- Illustrations des techniques : dessin au trait sur panneau clair, hikite à la poitrine.
- Icône : 押 à l'encre (police Yuji Syuku), blanc sur graphite, texture papier légère.

## Navigation (5 onglets)
Aujourd'hui · Apprendre (syllabus, examen blanc, lexique) · Kumite · Agenda · Journal. Le profil s'ouvre depuis l'avatar.

## Écrans
- **Aujourd'hui** (`Main`) : anneaux techniques et entraînements vers le 10e kyu, séance du jour, techniques à revoir.
- **Apprendre** (`Syllabus`) : grades kyu et dan, accès examen blanc et lexique.
- **Fiche du grade** (`Grade`) : anneau 6/9, checklist par catégorie (positions, bras et mains, blocages, jambes, stamina, connaissances).
- **Fiche technique** (`Technique`) : 4 images clés avec lecture auto, texte par étape, points clés, erreurs fréquentes, « Marquer comme maîtrisée ».
- **Examen blanc** (`Exam`) : QCM 6 questions, explication après réponse, score final.
- **Lexique** (`Lexique`) : liste par catégorie + mode révision en cartes (« À revoir » / « Je sais »).
- **Séance / minuteur** (`Training`) : minuteur de rounds kumite (combat 2:00, repos 0:30), kihon, stamina.
- **Kumite** (`Kumite`) : minuteur, bilan de la saison (victoires, défaites, nuls), ce qui marque / ce qui touche, carnet de combats, combinaisons.
- **Agenda** (`Agenda`) : mois avec pastilles (dojo vert, hors dojo bleu, stage violet, compétition jaune, passage de grade rouge), compte à rebours de la prochaine compétition, « J'y étais », synchro calendrier iPhone.
- **Journal** (`Journal`) : stats 7 jours, résumé IA (corrections qui reviennent + conseil), séances filtrables dojo / hors dojo.
- **Nouvelle séance** (`Seance`, feuille modale) : lieu, date, durée, contenu, intensité 1–10, ressenti, correction du sensei, douleurs, photo.
- **Profil** (`Profil`) : grille d'activité façon GitHub par saison (septembre à juin), vert = dojo, bleu = hors dojo, diagonale = les deux ; heures, jours, série en semaines, compétitions ; bloc « Intersaison » (juillet-août) en bonus sans casser la série ; parcours de ceinture ; réglages.

## Données d'exemple
Alex, inscrit le 1er septembre 2026 : 12 entraînements au dojo, 5 hors dojo, 22 h ; 6/9 techniques du 10e kyu maîtrisées (pas encore : jodan uke, gedan barai, kin geri) ; passage du 10e kyu le 12 décembre 2026 ; compétition le 25 octobre (placeholder) ; stage le 17 octobre.
