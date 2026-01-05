# CONTENT FACTORY - Stratégie Business Complète

> Document généré le 26/12/2025 - Conversation Claude x Cedric

---

## 🎯 VISION GLOBALE

### Objectif
Créer une **Content Factory automatisée** capable de :
1. Récupérer de la data multi-sources
2. Transformer cette data en contenus multi-formats
3. Publier automatiquement
4. Collecter les retours pour amélioration continue
5. Scaler à plusieurs clients avec dropservicing puis full automation

### Business Model en 3 phases

**Phase 1 - Validation (maintenant)**
- Templates manuels + automatisation partielle
- Paula comme POC (Proof of Concept)
- Objectif : valider le process, générer du CA

**Phase 2 - Scale avec marge**
- Acquisition clients via réseau/bouche-à-oreille
- Dropservicing des tâches non-automatisables (créatif, relationnel)
- Prendre une belle marge

**Phase 3 - Full Automation**
- Agents IA remplacent progressivement le dropservicing
- Automatisation end-to-end jusqu'à la livraison + SAV

---

## 📊 FRAMEWORK OSEE

**O - Obtenir** : Solutions vraies qui créent de vrais succès. Mettre les MOTS (de l'audience) sur les MAUX.

**S - Sauver** : Temps, Argent, Énergie. Promesse de gain concret et mesurable.

**É - Éviter** : Douleur, Fuite, Blocage, Paralysie, Frustration, PEUR.

**E - Élever** : Transformer l'identité. Créer l'aspiration. Inspirer l'action.

### Objectif des contenus
Sortir l'audience de l'état bêta (scroll passif) → ACTION :
1. Acheter
2. Prendre contact
3. Prendre RDV
4. Se rendre en présentiel

---

## 📝 TYPES DE POSTS

| Type | Objectif | Mécanisme |
|------|----------|-----------|
| **Conseil/Avis** | Engagement (réaction) | Demander avis/conseil → commentaires, partages, likes |
| **Valeurs** | Expertise + Transformation | Solutions actionnables KISS → démontrer expertise |
| **Devinette** | Curiosité + Viralité | Question ouverte → suspense → réponse en commentaire |

### Principe KISS
Keep It Simple and Stupid - Un pas simple vers la transformation.

---

## 🎯 STRATÉGIES ACQUISITION AUDIENCE

### Stratégie 1 : Parasitage (ex: Yomi Denzel)
Parler d'un influenceur (bien ou mal) pour récupérer son audience via l'algorithme. Ensuite : apporter plus de valeur que l'original.

### Stratégie 2 : Partenariat/Sponsoring
- Présenter le SERVICE en public
- Vendre le PRODUIT en privé
- Jamais de prix en public
- Le produit est au service du service

### Stratégie 3 : Interview
Interviewer un influenceur du même domaine ou domaine proche pour récupérer son audience.

---

## 🔄 PIPELINE DATA → CONTENU

### Phase 1 : Sources de Data
- **Scraping** : Firecrawl, Apify (commentaires, avis Amazon, posts viraux)
- **Réseaux sociaux** : Reddit, X, LinkedIn (meilleurs posts de la semaine)
- **Vidéos** : YouTube transcriptions → ebooks, résumés
- **Documents** : PDF, OCR, JSON, études de marché
- **IA/Analyse** : NotebookLM pour synthèse et insights

### Phase 2 : Transformation
Agent IA analyse les patterns de succès → génère contenu optimisé
- Texte → Images → Vidéo → Son → Code → Avatar IA

### Phase 3 : Templates par Support

| Support | Outil | Variables |
|---------|-------|-----------|
| Post image | Canvas / HTML | titre, accroche, CTA, visuel |
| Carrousel | Canvas / HTML | slides[], hook, conclusion |
| Reel/Vidéo | Sora2 / NEO3.1 | script, durée, musique |
| Emailing | HTML template | objet, corps, CTA, lien |
| Landing page | HTML/React | hero, bénéfices, témoignages, CTA |

---

## 📅 CALENDRIER TYPE HEBDOMADAIRE

| Jour | Format | Type de contenu |
|------|--------|-----------------|
| Dimanche | Post image | Conseil/Avis → Engagement |
| Mardi | Post image | Valeurs → Expertise |
| Jeudi | Post image | Devinette/Valeurs → Curiosité |
| Hebdo | Carrousel | Tutorial/Liste → Sauvegarde |
| Hebdo | Reel | Hook viral → Reach |
| Hebdo | Emailing | Nurturing → Conversion |

---

## 💰 POSITIONNEMENT COMMERCIAL

### Ce qu'on NE fait PAS
- Prospection froide (LinkedIn, WhatsApp avec lien Stripe)
- Afficher les prix en public
- Travailler avec des clients sans budget
- Vendre un "produit" (landing page = pas cher dans l'esprit)

### Ce qu'on fait
- Réseau + recommandation (100% du CA actuel vient de là)
- Vendre une **transformation pédagogique**
- Vendre une **identité évolutive**
- Catalyseur de croissance, pas une landing page

### Wording à utiliser
❌ "Landing page" → ✅ "Système d'acquisition client"
❌ "Posts réseaux sociaux" → ✅ "Moteur de visibilité"
❌ Prix en public → ✅ Discussion privée

---

## 👥 RÉSEAU ACTUEL (à activer)

### Clients satisfaits
- **Paula** (800€) - via Monic (réseau JKD)
- **ORSG** (10 000€) - via Edric (famille)
- **Formation banque** (1 050€) - via Yohan (famille)

**Total : 11 850€ CA, 100% réseau/recommandation**

### Réseau dormant à activer
- Monic (directrice salle JKD)
- Élèves JKD (très satisfaits, ne connaissent pas l'activité web/IA)
- Edric, Yohan (apporteurs d'affaires)
- Paula (future recommandation si satisfaite)

### Action prioritaire
Demander systématiquement : "Tu connais quelqu'un qui aurait besoin de ça ?"

---

## 🛠️ STACK TECHNIQUE

### Infrastructure CIAP
- **PocketBase** : Base de données clients, contenus, analytics
- **n8n** : Orchestration workflows
- **MCP** : Connexion Claude ↔ base de données
- **OpenRouter** : Modèles IA (Grok, etc.)

### Outils Content Factory
- **HTML + Tailwind** : Templates posts
- **Playwright** : Conversion HTML → PNG
- **Canvas** : Design si besoin
- **Sora2 / NEO3.1** : Génération vidéo

### Script de conversion
```bash
cd C:\Users\chad9\Documents\006.PAULA\LIVRAISON_CLIENT
node convert.js --all
```

---

## 📋 PROJET PAULA - ÉTAT ACTUEL

### Infos client
- **Activité** : L'Artisanat de la Voix - Coach vocale & Présence
- **Cible** : Chant + Prise de parole
- **Lieu** : Centre Alésia, Paris
- **Site** : paula.console.cercleonline.com

### Livrables
- Landing page ✅
- Templates posts (5 gabarits) ✅
- Carrousel (5 slides) ✅
- Emailings (Bienvenue, Atelier, Relance) - corrections en cours

### Corrections demandées (mail du 22/12)
- [ ] Emailing Bienvenue : enlever "absolue"
- [ ] Horaires : Chant 15h-16h30, Prise de parole 16h30-18h
- [x] Post Mieux Respirer : "costo-abdominale" ✅
- [ ] Carrousel : ajouter citations prise de parole
- [ ] Récupérer photo fille bras ouverts

### Calendrier Paula
- **Objectif** : 10 janvier 2026
- **Fréquence** : 3 posts/sem + 1 carrousel + 1 reel + 1 emailing
- **Événement** : SAM 10 JAN - Reprise des cours (15h00)

---

## ⚠️ ERREURS À NE PAS RÉPÉTER

### Post LinkedIn qui a floppé
```
[URGENCE FIN D'ANNÉE – OFFRE FLASH 24H 1 013 € HT...
```
**Pourquoi ça n'a pas marché :**
- Prix affiché publiquement
- Lien Stripe direct (trop brutal)
- Urgence artificielle
- Pas de contexte/valeur/confiance
- Ne respecte pas le framework OSEE

### Messages WhatsApp
- Lien Stripe = "c'est toi ?" (ressemble à un hack)
- Sauter les étapes de la vente = rejet

---

## 🚀 PROCHAINES ÉTAPES

### Immédiat (26/12 - RDV 10h30)
1. Générer les posts jusqu'au 10 janvier
2. Corriger les emailings
3. Préparer les livrables pour Paula

### Court terme
- Livrer Paula, la satisfaire
- Lui demander des recommandations
- Activer le réseau JKD

### Moyen terme
- Automatiser le pipeline dans n8n
- Créer collection PocketBase pour clients Content Factory
- Intégrer dans CIAP

### Long terme
- Dropservicing du créatif
- Remplacer par agents IA progressivement
- Scale à plusieurs clients

---

## 📁 FICHIERS GÉNÉRÉS

```
C:\Users\chad9\Documents\006.PAULA\LIVRAISON_CLIENT\
├── exports\           # HTML individuels
├── images\            # PNG 1080x1080
├── img\               # Assets (logo, photos)
├── convert.js         # Script conversion
├── posts_instagram.html
├── landing_page_code.html
└── template_*.html    # Emailings
```

---

*Document de référence - À mettre à jour après chaque avancée*
