# RAG CONTEXT - Content Factory Project

> Ce fichier permet de reprendre une conversation avec Claude sans perdre le contexte.
> Dernière mise à jour : 26/12/2025

---

## IDENTITÉ DU PROJET

**Nom** : Content Factory / Business Factory (module de CIAP)
**Porteur** : Cedric
**Objectif** : Agence de création de contenu digital automatisée

---

## CONTEXTE BUSINESS

### Situation actuelle
- Cedric développe CIAP (Conseil d'Intelligence Artificielle Personnel)
- Il a un client test : Paula (L'Artisanat de la Voix)
- CA généré : 11 850€ (100% via réseau)
- Pas de prospection froide efficace (LinkedIn/WhatsApp = flop)

### Business Model
1. **Phase 1** : Templates manuels + automatisation partielle (POC Paula)
2. **Phase 2** : Scale via réseau + dropservicing
3. **Phase 3** : Full automation avec agents IA

### Positionnement
- Pas de prix en public
- Vendre une transformation, pas un produit
- Réseau > Prospection froide
- Clients premium (pas de volume avec clients à problème)

---

## FRAMEWORK DE CRÉATION DE CONTENU

### OSEE
- **O**btenir : Solutions vraies, mots de l'audience sur leurs maux
- **S**auver : Temps, Argent, Énergie
- **É**viter : Douleur, Peur, Blocage, Frustration
- **E**lever : Transformation identitaire, aspiration

### Types de posts
- **Conseil/Avis** : Engagement via questions
- **Valeurs** : Démontrer expertise
- **Devinette** : Curiosité + viralité

### Calendrier type
- Dimanche, Mardi, Jeudi : Posts
- Hebdo : 1 Carrousel + 1 Reel + 1 Emailing

---

## PROJET PAULA - ÉTAT AU 26/12/2025

### Client
- **Nom** : Paula Mesuret
- **Activité** : L'Artisanat de la Voix (Coach vocale)
- **Services** : Chant (15h-16h30) + Prise de parole (16h30-18h)
- **Lieu** : Centre Alésia, Paris
- **Événement** : Reprise des cours SAM 10 JAN 2026

### Livrables faits
- Landing page : paula.console.cercleonline.com
- 5 gabarits posts Instagram/LinkedIn
- Carrousel 5 slides "5 raisons de chanter"
- Emailings (Bienvenue, Atelier, Relance)

### Corrections en attente (mail du 22/12)
- Emailing Bienvenue : enlever "absolue"
- Mettre bons horaires
- Ajouter citations prise de parole au carrousel
- Récupérer photo fille bras ouverts

### Fichiers
```
C:\Users\chad9\Documents\006.PAULA\LIVRAISON_CLIENT\
├── images\            # PNG 1080x1080 générés
├── exports\           # HTML individuels
├── convert.js         # Script HTML→PNG
```

---

## STACK TECHNIQUE

### CIAP
- PocketBase (BDD)
- n8n (workflows)
- MCP (connexion Claude)
- OpenRouter (modèles IA)

### Content Factory
- HTML + Tailwind CSS
- Playwright (conversion HTML→PNG)
- Charte Paula : #C59217 (gold), #0D1B24 (navy), Outfit font

### Commande conversion
```powershell
cd C:\Users\chad9\Documents\006.PAULA\LIVRAISON_CLIENT
node convert.js --all
```

---

## RÉSEAU À ACTIVER

| Contact | Relation | Potentiel |
|---------|----------|-----------|
| Monic | Directrice salle JKD | A introduit Paula |
| Élèves JKD | Cours de Cedric | Ne connaissent pas l'activité web |
| Edric | Cousin | A apporté ORSG (10k€) |
| Yohan | Frère | A apporté formation banque |
| Paula | Cliente | Future recommandation |

---

## ERREURS IDENTIFIÉES

1. **Post LinkedIn flop** : Prix public + lien Stripe + urgence artificielle
2. **WhatsApp brutal** : Lien paiement direct = "c'est toi ?"
3. **Pas d'activation réseau** : Le réseau existe mais n'est pas sollicité

---

## PRIORITÉS IMMÉDIATES

1. ✅ Générer images posts Paula
2. ⏳ Créer posts jusqu'au 10 janvier
3. ⏳ Corriger emailings
4. ⏳ RDV Paula 26/12 à 10h30
5. ⏳ Demander recommandations à Paula si satisfaite

---

## POUR REPRENDRE LA CONVERSATION

Si tu démarres une nouvelle conversation avec Claude, copie ce prompt :

```
Je travaille sur le projet Content Factory avec Cedric. 
Voici le contexte : [coller le contenu de ce fichier]

Où en sommes-nous et quelle est la prochaine action ?
```

---

## DOCUMENTS DE RÉFÉRENCE

- `STRATEGIE_CONTENT_FACTORY.md` : Vision complète
- `Content-Factory-BPM.docx` : Document process business
- `posts_instagram.html` : Templates visuels
- `mail_du_22.txt` : Brief Paula avec corrections

---

*Fichier RAG - À mettre à jour après chaque session de travail*
