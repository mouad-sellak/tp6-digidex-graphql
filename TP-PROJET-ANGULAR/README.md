# 🅰️ TP PROJET — Application Angular complète (GraphQL en bonus)

> **Projet de synthèse — Formation Angular**
> Tout ce que vous avez vu pendant les TP, réuni dans **une seule application**.

---

## ⏰ L'essentiel en 30 secondes

| | |
|---|---|
| 👤 **Travail** | **INDIVIDUEL** (aucun binôme) |
| 🕐 **Durée estimée** | ~ 1 jour et demi |
| 📅 **Date limite de rendu** | **jeudi avant 13h00** |
| 🎤 **Soutenances** | à partir de **jeudi matin** (démo + questions) |
| 📦 **Rendu** | un **dépôt GitHub public** (code + README + dossier `screenshots/`) |
| 📨 **Envoi** | le **lien du dépôt** sur **Teams** *ou* par mail à **contact.infosoftware@gmail.com** |
| ✉️ **Objet du message** | `Nom Prénom — TP Projet Angular` |

> ⚠️ Tout rendu après **jeudi 13h00** est considéré en retard.
> ⚠️ Projet **strictement individuel** : deux rendus identiques = note annulée pour les deux.

---

## 🎯 Objectif

Construire une **Single Page Application Angular** complète et propre, qui consomme
une **API publique**, et qui démontre **toutes les compétences** vues en TP :
composants, services & injection de dépendances, routing, formulaires, RxJS,
**signals**, pipes, HttpClient, et **les bonnes pratiques / design patterns**.

Le **GraphQL est un bonus** (voir la section dédiée) — exactement dans l'esprit
du TP DigiDex.

---

## 🧩 Le sujet : « Mon Catalogue »

Vous réalisez une application de **catalogue** (liste + détail + recherche +
favoris) autour d'un thème de votre choix, à partir d'une **API publique gratuite**.

### Choisissez UNE API (ou proposez la vôtre, à valider) :

| Thème | API (gratuite, sans clé) | Bonus GraphQL natif ? |
|---|---|---|
| Personnages Rick & Morty | `https://rickandmortyapi.com` | ✅ oui (endpoint GraphQL intégré) |
| Pokémon | `https://pokeapi.co` | — |
| Recettes | `https://www.themealdb.com/api.php` | — |
| Livres | `https://openlibrary.org/developers/api` | — |
| Films Studio Ghibli | `https://ghibliapi.vercel.app` | — |

> 💡 **Conseil :** choisissez un thème qui vous plaît, et **différent de votre
> voisin**. Si vous visez le bonus GraphQL, **Rick & Morty** est idéal (il expose
> à la fois REST et GraphQL).

---

## ✅ Fonctionnalités OBLIGATOIRES

Chaque point renvoie au TP correspondant. Respectez aussi les **indices** 👉.

### 1. Liste paginée d'éléments *(cartes)*
- Affichage en grille de cartes (image + titre).
- **Pagination** (page précédente / suivante).
- 👉 *Rappel TP — Composants & Control flow* : utilisez `@for (... ; track …)` et `@empty`.
- 👉 Séparez **composant « smart »** (récupère les données) et **composant « dumb »** (affiche une carte) → **pattern Container/Presentational**.

### 2. Recherche / filtre
- Un champ de recherche qui filtre la liste.
- 👉 *Rappel TP — RxJS* : appliquez un **`debounceTime`** (ou un `signal` + `computed`) pour ne pas spammer l'API à chaque touche.

### 3. Page détail *(routing avec paramètre)*
- Cliquer sur une carte ouvre une page **détail** avec plus d'infos.
- 👉 *Rappel TP — Routing* : route `xxx/:id`, `<router-outlet>`, et **`withComponentInputBinding()`** pour récupérer l'`id` directement en `input()`.

### 4. Favoris persistants
- Ajouter / retirer des favoris, **persistés** (rechargez la page → ils sont toujours là, via `localStorage`).
- 👉 *Rappel TP — Services & DI + Signals* : un **service `providedIn: 'root'`** (singleton) qui détient l'état avec un **`signal`** → **pattern Observable/State Service**.

### 5. Formulaire réactif avec validation
- Un **Reactive Form** (ex : ajouter un avis/une note locale, ou un formulaire de contact).
- Au moins **2 validateurs** (`required`, `minLength`, `email`, …) + affichage des erreurs.
- 👉 *Rappel TP — Formulaires* : `FormBuilder`, `FormGroup`, `Validators`.

### 6. Appels HTTP propres
- Toutes les requêtes passent par un **service dédié** (jamais directement dans le composant).
- **Typage fort** des réponses (interfaces / modèles), gestion des états **loading** et **erreur**.
- 👉 *Rappel TP — HttpClient* : `HttpClient` renvoie des **Observables**.

### 7. Au moins un *pipe* personnalisé
- Ex : formater une date, tronquer un texte, mettre en majuscule un statut…
- 👉 *Rappel TP — Pipes* : un pipe **pur** par défaut (perf).

### 8. Lazy loading
- Au moins **une route chargée en lazy** (`loadComponent`).
- 👉 *Rappel TP — Routing/Perf* : réduit le bundle initial.

### 9. Bonnes pratiques transverses
- **`ChangeDetectionStrategy.OnPush`** sur vos composants de présentation.
- **Désabonnement propre** : privilégiez le **`pipe async`** (ou `takeUntilDestroyed()`), pas de `subscribe()` oublié.
- Architecture en dossiers : `pages/`, `components/`, `services/`, `models/`.
- **TypeScript strict**, **aucun `any`**.

---

## 🌟 BONUS — GraphQL (+ points)

Dans l'esprit du **TP DigiDex** :

- **Option A** *(recommandée si Rick & Morty)* : consommez l'**endpoint GraphQL existant** avec **`apollo-angular`** (`provideApollo`, `gql`, `watchQuery`).
- **Option B** : créez votre **propre passerelle GraphQL** (Apollo Server, `@apollo/server`) qui interroge l'API REST, la **remodèle**, puis exposez un schéma typé que le front consomme.

Exigences du bonus :
- au moins **une query avec variables** (pagination ou recherche) ;
- les données s'affichent réellement dans l'app ;
- dans le README : **expliquez l'avantage de GraphQL** par rapport au REST que vous avez utilisé (over-fetching / under-fetching, un seul endpoint, schéma typé…).

> 💡 *Indices issus du TP DigiDex* :
> - vérifiez l'**URL du endpoint** dans `app.config.ts` (pas de placeholder oublié) ;
> - `valueChanges` d'Apollo émet d'abord un état *loading* où `data` est `undefined` → **filtrez** avant le `map` ;
> - importez `InMemoryCache` depuis `@apollo/client/core`.

---

## ❓ Questions à répondre *(dans le README, section « Réponses »)*

Répondez en **2–4 phrases** chacune. Elles seront reprises en soutenance.

1. Quelle est la différence entre un composant **« smart »** et **« dumb »** ? Donnez un exemple **dans votre projet**.
2. Pourquoi utiliser **`OnPush`** ? Quel lien avec l'**immutabilité** des données ?
3. Pourquoi préférer le **`pipe async`** à un `subscribe()` manuel ? Quel **risque** évite-t-on ?
4. `providedIn: 'root'` : quel **design pattern** cela implémente-t-il ? Combien d'instances du service existe-t-il ?
5. Quelle différence entre un **`signal`** et un **`BehaviorSubject`** ? Quand utiliser l'un ou l'autre ?
6. Pour une **recherche** au clavier, quel opérateur RxJS entre **`switchMap`** et **`mergeMap`**, et pourquoi ?
7. **Reactive Forms** vs **Template-driven** : lequel avez-vous choisi et **pourquoi** ?
8. Qu'apporte concrètement le **lazy loading** dans votre application ?
9. *(Bonus)* GraphQL vs REST : expliquez **over-fetching** et **under-fetching** avec un exemple de votre projet.
10. Citez **un design pattern** que vous avez utilisé (Container/Presentational, Singleton, Facade, Observer…) et **où** dans le code.

---

## 📸 Captures d'écran OBLIGATOIRES *(dossier `screenshots/` du dépôt)*

Nommez-les clairement. On doit y voir :

- [ ] `01-liste.png` — la liste paginée
- [ ] `02-recherche.png` — la recherche en action
- [ ] `03-detail.png` — la page détail
- [ ] `04-favoris.png` — un favori ajouté **+ encore présent après rechargement**
- [ ] `05-formulaire-erreurs.png` — le formulaire avec messages de validation
- [ ] `06-loading-erreur.png` — l'état *chargement* et/ou l'état *erreur*
- [ ] `07-arborescence.png` — la structure des dossiers du projet
- [ ] *(bonus)* `08-graphql.png` — une requête GraphQL (onglet **Network** ou **Apollo Sandbox**)

---

## 📦 Structure attendue du dépôt

```
mon-catalogue/
├── README.md            ← présentation, install/run, patterns, RÉPONSES aux questions
├── .gitignore           ← node_modules/ exclu !
├── screenshots/         ← toutes les captures demandées
├── src/                 ← le front Angular
│   └── app/
│       ├── pages/
│       ├── components/
│       ├── services/
│       └── models/
└── (bonus) api-graphql/ ← votre passerelle Apollo Server, si Option B
```

Votre **README** doit contenir au minimum :
1. Le **nom du projet** et l'API utilisée.
2. **Comment lancer** (`npm install`, `npm start`, port).
3. La **liste des fonctionnalités** réalisées (cochez ce qui est fait).
4. Les **design patterns** utilisés (où et pourquoi).
5. Les **réponses aux questions** ci-dessus.
6. Les **captures** (ou un lien vers le dossier `screenshots/`).

---

## 📊 Barème indicatif (/20)

| Critère | Points |
|---|---|
| Fonctionnalités obligatoires (1 → 8) | **10** |
| Bonnes pratiques & design patterns (OnPush, désabonnement, archi, typage) | **4** |
| Qualité du code + commits Git réguliers et lisibles | **2** |
| README complet + réponses aux questions | **2** |
| Soutenance / démo orale | **2** |
| 🌟 **Bonus GraphQL** | **+2 à +3** |

> La note peut **dépasser 20** grâce au bonus. Une appli qui **ne compile pas** ou
> **ne se lance pas** est lourdement pénalisée → testez `npm install` sur un dossier propre avant de rendre.

---

## 🧠 Conseils & pièges à éviter *(retours d'expérience des TP)*

- ✅ **Vérifiez `package.json`** : de vraies versions de dépendances (pas de `"..."` resté en place) → sinon `ERR_MODULE_NOT_FOUND`.
- ✅ **Control flow** : l'alias `as` n'est autorisé que sur le **`@if` principal**, **jamais sur `@else if`** (erreur `NG5002`). Imbriquez dans un `@else { @if (x; as y) {…} }`.
- ✅ **Après modif de `app.config.ts`** (providers, Apollo…), **redémarrez `ng serve`** : ce n'est **pas** rechargé à chaud. Pensez au **hard refresh** (`Ctrl+Shift+R`).
- ✅ **Gérez le `loading`** : avec Apollo, `valueChanges` émet d'abord `data: undefined` → **filtrez**. Avec HttpClient, affichez un spinner puis gérez l'erreur.
- ✅ **CORS** si vous créez votre propre API.
- ✅ **N'envoyez pas `node_modules`** dans Git (d'où le `.gitignore`).
- ✅ **Committez régulièrement** : un seul commit « final » est mal vu.

---

## 🗂️ Récapitulatif compétences ↔ TP

| Fonctionnalité | TP de référence |
|---|---|
| Composants standalone, control flow `@if`/`@for` | TP Composants & templates |
| Services, injection de dépendances, singleton | TP Services & DI |
| Routing, paramètres, lazy loading | TP Routing |
| Formulaires réactifs & validation | TP Formulaires |
| HttpClient & Observables | TP HttpClient / RxJS |
| Signals (état réactif) | TP Signals |
| Pipes | TP Pipes |
| Bonnes pratiques & design patterns | transversal (tous les TP) |
| **GraphQL / Apollo (bonus)** | **TP DigiDex** |

---

## ✔️ Checklist avant de rendre

- [ ] L'appli **se lance** sans erreur (`npm install` puis `npm start`).
- [ ] Les **8 fonctionnalités obligatoires** sont présentes.
- [ ] `OnPush`, désabonnement propre, **aucun `any`**.
- [ ] **README** complet + **réponses aux 10 questions**.
- [ ] Dossier **`screenshots/`** rempli.
- [ ] **`node_modules/` exclu** du dépôt.
- [ ] Commits réguliers, dépôt **public**.
- [ ] Lien envoyé sur **Teams** ou à **contact.infosoftware@gmail.com** avant **jeudi 13h00**, objet `Nom Prénom — TP Projet Angular`.

---

**Bon courage, et amusez-vous bien ! 🚀**
