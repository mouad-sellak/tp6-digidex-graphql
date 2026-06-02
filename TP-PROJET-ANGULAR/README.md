# 🅰️ TP PROJET — Application Angular complète & volumineuse (GraphQL en bonus)

> **Projet de synthèse — Formation Angular**
> Tout ce que vous avez vu pendant les TP, réuni dans **une seule application riche**.

---

## ⏰ L'essentiel en 30 secondes

| | |
|---|---|
| 👤 **Travail** | **INDIVIDUEL** (aucun binôme) |
| 🕐 **Durée estimée** | ~ 2 à 3 jours de travail |
| 📅 **Date limite de rendu** | **jeudi avant 13h00** |
| 🎤 **Soutenances** | à partir de **jeudi matin** (démo + questions) |
| 📦 **Rendu** | un **dépôt GitHub public** (code + README + dossier `screenshots/`) |
| 📨 **Envoi** | le **lien du dépôt** sur **Teams** *ou* par mail à **contact.infosoftware@gmail.com** |
| ✉️ **Objet du message** | `Nom Prénom — TP Projet Angular` |

> ⚠️ Tout rendu après **jeudi 13h00** est considéré en retard.
> ⚠️ Projet **strictement individuel** : deux rendus identiques = note annulée pour les deux.

---

## 🎯 Objectif

Construire une **Single Page Application Angular** **complète et conséquente** qui consomme
une **API publique riche** (plusieurs ressources liées entre elles), et qui démontre
**toutes les compétences** vues en TP : composants, services & injection de dépendances,
routing, formulaires, RxJS, **signals**, pipes, HttpClient, et les **bonnes pratiques /
design patterns**.

Cette fois on vise le **volume et la structuration** : **plusieurs entités**,
**plusieurs services**, **plusieurs modèles**, plusieurs pages — sans jamais sortir
des notions vues en TP.

Le **GraphQL est un bonus** (voir la section dédiée) — dans l'esprit du TP DigiDex.

---

## 🧩 Le sujet : un « Explorateur » multi-ressources

Vous réalisez une application qui explore **au moins 3 ressources liées** d'une même
API publique (listes + détails + recherche + favoris + tableau de bord), avec une
**navigation entre ressources liées**.

### Choisissez UNE API (ou proposez la vôtre, à valider) :

| Thème | API (gratuite, sans clé) | Ressources liées (≥ 3) | Bonus GraphQL natif ? |
|---|---|---|---|
| Rick & Morty | `https://rickandmortyapi.com` | **Characters · Locations · Episodes** | ✅ oui |
| Pokémon | `https://pokeapi.co` | **Pokémon · Types · Abilities** | — |
| Recettes | `https://www.themealdb.com/api.php` | **Meals · Categories · Areas** | — |
| Livres | `https://openlibrary.org/developers/api` | **Books · Authors · Subjects** | — |

> 💡 **Exemple fil rouge (Rick & Morty)** : un *personnage* appartient à une
> *localisation* et apparaît dans plusieurs *épisodes*. Depuis la fiche d'un
> personnage, on doit pouvoir **naviguer** vers sa localisation et vers ses épisodes.
> C'est cette **mise en relation** qui donne du volume au projet.

---

## ✅ Fonctionnalités OBLIGATOIRES

Le projet doit atteindre les **seuils de volume** indiqués (🔢) tout en respectant
les **indices** 👉 et les **rappels de TP**.

### 🅰️ Bloc A — Données, modèles & services *(le « volume »)*

- 🔢 **Au moins 3 ressources** différentes de l'API (ex : personnages, lieux, épisodes).
- 🔢 **Au moins 5 modèles / interfaces TypeScript** dans `models/` :
  - un modèle par ressource (≥ 3),
  - + les types techniques (réponse paginée de l'API, type d'info de pagination, etc.).
- 🔢 **Au moins 5 services** dans `services/` :
  - **1 service HTTP par ressource** (≥ 3) — ex : `CharacterService`, `LocationService`, `EpisodeService` ;
  - **1 service d'état** pour les **favoris** (singleton + **signals**) ;
  - **1 service utilitaire** réutilisable — ex : `StorageService` (localStorage) **OU** `NotificationService` (petits messages/toasts).
- 👉 *Rappel TP — Services & DI* : tous les services sont `@Injectable({ providedIn: 'root' })` (singletons), **aucun appel HTTP directement dans un composant**.
- 👉 *Rappel TP — HttpClient* : `HttpClient` renvoie des **Observables**, réponses **fortement typées** (génériques), gestion **loading** + **erreur**.
- 💡 **Bonne pratique (Facade)** : vous pouvez créer un service « façade » qui orchestre plusieurs services pour une page (ex : un `DashboardFacade`).

### 🅱️ Bloc B — Navigation & pages

- 🔢 **Au moins 3 pages « liste »** (une par ressource) avec **pagination**.
- 🔢 **Au moins 3 pages « détail »** (une par ressource) via une route `xxx/:id`.
- 🔗 **Navigation entre ressources liées** : depuis un détail, des liens vers les
  ressources associées (ex : personnage → localisation → autres personnages du lieu).
- 🏠 **Une page d'accueil / tableau de bord** (voir Bloc C).
- ⭐ **Une page « Favoris »**.
- 📝 **Une page « Formulaire »** (voir Bloc C).
- 🚫 **Une page 404** (route `**`).
- 🔢 **Au moins une route en lazy loading** (`loadComponent`) — typiquement la page Favoris ou le Tableau de bord.
- 👉 *Rappel TP — Routing* : `<router-outlet>`, routes avec paramètre, **`withComponentInputBinding()`** pour recevoir l'`id` en `input()`, redirection `**`.

### 🅲️ Bloc C — Interactions

- 🔎 **Recherche / filtre** sur les listes.
  👉 *Rappel TP — RxJS* : **`debounceTime`** (+ `distinctUntilChanged`, `switchMap`) **ou** `signal` + `computed`.
- ⭐ **Favoris persistants** : ajout/retrait, **persistés** (rechargement → toujours là, via `localStorage`).
  👉 *Rappel TP — Signals* : l'état des favoris est un **`signal`** ; un **`computed`** expose le nombre de favoris.
- 📊 **Tableau de bord (dashboard)** : quelques **statistiques** calculées avec des
  **`computed`** signals (ex : nombre total d'éléments vus, nombre de favoris par
  ressource, répartition par statut/catégorie…).
- 📝 **Formulaire réactif** avec **≥ 3 validateurs** (`required`, `minLength`, `email`, `pattern`…),
  affichage clair des erreurs, bouton désactivé tant que le formulaire est invalide.
  Exemples : formulaire d'**avis/note locale** sur un élément, ou **filtre avancé**, ou **contact**.
  👉 *Rappel TP — Formulaires* : `FormBuilder`, `FormGroup`, `Validators`.

### 🅳️ Bloc D — Qualité, composants & pipes

- 🔢 **Au moins 4 composants réutilisables (« dumb »)** dans `components/`, réutilisés
  par plusieurs pages — ex : `CardComponent`, `SearchBarComponent`, `PaginatorComponent`,
  `LoaderComponent`, `ErrorMessageComponent`.
  👉 **Pattern Container/Presentational** : pages = *smart*, composants partagés = *dumb*.
- 🔢 **Au moins 2 pipes personnalisés** dans `pipes/` (ex : `truncate`, `capitalize`, un format de date…).
  👉 *Rappel TP — Pipes* : pipes **purs** par défaut.
- 🟢 **`ChangeDetectionStrategy.OnPush`** sur les composants de présentation.
- 🧹 **Désabonnement propre** : **`pipe async`** (ou `takeUntilDestroyed()`), pas de `subscribe()` oublié.
- 🧱 **Architecture claire** : `pages/`, `components/`, `services/`, `models/`, `pipes/`.
- 🧪 **TypeScript strict**, **aucun `any`**.

---

## 🌟 BONUS — GraphQL (+ points)

Dans l'esprit du **TP DigiDex** :

- **Option A** *(recommandée si Rick & Morty)* : consommez l'**endpoint GraphQL existant** avec **`apollo-angular`** (`provideApollo`, `gql`, `watchQuery`).
- **Option B** : créez votre **propre passerelle GraphQL** (Apollo Server, `@apollo/server`) qui interroge l'API REST, la **remodèle**, puis exposez un schéma typé que le front consomme.

Exigences du bonus :
- au moins **une query avec variables** (pagination ou recherche) ;
- idéalement, une query qui récupère **une ressource ET ses relations en un seul appel** (l'argument massue de GraphQL) ;
- dans le README : **expliquez l'avantage de GraphQL** par rapport au REST (over-fetching / under-fetching, un seul endpoint, schéma typé…).

> 💡 *Indices issus du TP DigiDex* :
> - vérifiez l'**URL du endpoint** dans `app.config.ts` (pas de placeholder oublié) ;
> - `valueChanges` d'Apollo émet d'abord un état *loading* où `data` est `undefined` → **filtrez** avant le `map` ;
> - importez `InMemoryCache` depuis `@apollo/client/core`.

---

## ❓ Questions à répondre *(dans le README, section « Réponses »)*

Répondez en **2–4 phrases** chacune. Elles seront reprises en soutenance.

1. Différence entre un composant **« smart »** et **« dumb »** ? Donnez un exemple **dans votre projet**.
2. Pourquoi **`OnPush`** ? Quel lien avec l'**immutabilité** des données ?
3. Pourquoi préférer le **`pipe async`** à un `subscribe()` manuel ? Quel **risque** évite-t-on ?
4. `providedIn: 'root'` : quel **design pattern** ? Combien d'instances du service existe-t-il ?
5. Différence entre un **`signal`** et un **`BehaviorSubject`** ? Quand utiliser l'un ou l'autre ?
6. Pour une **recherche** au clavier : **`switchMap`** ou **`mergeMap`**, et pourquoi ?
7. **Reactive Forms** vs **Template-driven** : votre choix et **pourquoi** ?
8. Comment avez-vous **organisé vos services** (un par ressource, façade, état) et pourquoi ?
9. Qu'apporte concrètement le **lazy loading** dans votre application ?
10. *(Bonus)* GraphQL vs REST : expliquez **over-fetching** / **under-fetching** avec un exemple de votre projet.

---

## 📸 Captures d'écran OBLIGATOIRES *(dossier `screenshots/` du dépôt)*

Nommez-les clairement. On doit y voir :

- [ ] `01-liste-ressource1.png` — une liste paginée (ressource 1)
- [ ] `02-liste-ressource2.png` — une liste paginée (ressource 2)
- [ ] `03-recherche.png` — la recherche en action
- [ ] `04-detail.png` — une page détail
- [ ] `05-relations.png` — la **navigation entre ressources liées** (depuis un détail)
- [ ] `06-favoris.png` — un favori ajouté **+ encore présent après rechargement**
- [ ] `07-dashboard.png` — le tableau de bord avec ses statistiques
- [ ] `08-formulaire-erreurs.png` — le formulaire avec messages de validation
- [ ] `09-loading-erreur.png` — l'état *chargement* et/ou l'état *erreur*
- [ ] `10-arborescence.png` — la structure des dossiers (`services/`, `models/`, etc.)
- [ ] *(bonus)* `11-graphql.png` — une requête GraphQL (onglet **Network** ou **Apollo Sandbox**)

---

## 📦 Structure attendue du dépôt

```
mon-explorateur/
├── README.md            ← présentation, install/run, patterns, RÉPONSES aux questions
├── .gitignore           ← node_modules/ exclu !
├── screenshots/         ← toutes les captures demandées
├── src/
│   └── app/
│       ├── pages/        ← composants "smart" (listes, détails, favoris, dashboard, form, 404)
│       │   ├── ressource1-list/   ressource1-detail/
│       │   ├── ressource2-list/   ressource2-detail/
│       │   ├── ressource3-list/   ressource3-detail/
│       │   ├── dashboard/
│       │   ├── favoris/
│       │   └── not-found/
│       ├── components/   ← composants "dumb" réutilisables (card, search-bar, paginator, loader, error)
│       ├── services/     ← ≥ 5 services (1 HTTP par ressource + favoris + util/facade)
│       ├── models/       ← ≥ 5 interfaces (1 par ressource + types techniques)
│       ├── pipes/        ← ≥ 2 pipes personnalisés
│       ├── app.routes.ts
│       └── app.config.ts
└── (bonus) api-graphql/  ← votre passerelle Apollo Server, si Option B
```

Votre **README** doit contenir au minimum :
1. Le **nom du projet** et l'API utilisée + les **3 ressources** choisies.
2. **Comment lancer** (`npm install`, `npm start`, port).
3. La **liste des fonctionnalités** réalisées (cochez ce qui est fait).
4. Les **design patterns** utilisés (où et pourquoi).
5. L'**organisation des services et des modèles**.
6. Les **réponses aux questions** ci-dessus.
7. Les **captures** (ou un lien vers le dossier `screenshots/`).

---

## 📊 Barème indicatif (/20)

| Critère | Points |
|---|---|
| Bloc A — Volume : ≥ 3 ressources, ≥ 5 modèles, ≥ 5 services, HTTP propre | **5** |
| Bloc B — Navigation : ≥ 3 listes + ≥ 3 détails, relations, lazy loading, 404 | **4** |
| Bloc C — Interactions : recherche, favoris persistants, dashboard, formulaire validé | **4** |
| Bloc D — Qualité : OnPush, désabonnement, composants dumb, pipes, typage, archi | **2** |
| Git (commits réguliers) + README complet + réponses aux questions | **3** |
| Soutenance / démo orale | **2** |
| 🌟 **Bonus GraphQL** | **+2 à +3** |

> La note peut **dépasser 20** grâce au bonus. Une appli qui **ne compile pas** ou
> **ne se lance pas** est lourdement pénalisée → testez `npm install` sur un dossier propre avant de rendre.

---

## 🧠 Conseils & pièges à éviter *(retours d'expérience des TP)*

- ✅ **Commencez par les modèles et les services** (Bloc A) : c'est la fondation. Une ressource qui marche bien → dupliquez le schéma pour les 2 autres.
- ✅ **Factorisez vos composants dumb** (card, loader, paginator…) : ils servent pour les 3 ressources → moins de code, plus de points.
- ✅ **Vérifiez `package.json`** : de vraies versions (pas de `"..."`) → sinon `ERR_MODULE_NOT_FOUND`.
- ✅ **Control flow** : l'alias `as` est autorisé **uniquement sur le `@if` principal**, **jamais sur `@else if`** (erreur `NG5002`). Imbriquez dans `@else { @if (x; as y) {…} }`.
- ✅ **Après modif de `app.config.ts`** (providers, Apollo…), **redémarrez `ng serve`** (pas géré par le HMR) + **hard refresh** (`Ctrl+Shift+R`).
- ✅ **Gérez le `loading`** : Apollo émet d'abord `data: undefined` → **filtrez**. HttpClient → spinner + gestion d'erreur.
- ✅ **CORS** si vous créez votre propre API.
- ✅ **N'envoyez pas `node_modules`** dans Git (d'où le `.gitignore`).
- ✅ **Committez régulièrement** : un seul commit « final » est mal vu.

---

## 🗂️ Récapitulatif compétences ↔ TP

| Fonctionnalité du projet | TP de référence |
|---|---|
| Composants standalone, control flow `@if`/`@for`, composants dumb | TP Composants & templates |
| ≥ 5 services, injection de dépendances, singleton, façade | TP Services & DI |
| Routing multi-pages, paramètres, relations, lazy loading, 404 | TP Routing |
| Formulaire réactif & validation | TP Formulaires |
| HttpClient, ≥ 3 services HTTP, Observables, recherche RxJS | TP HttpClient / RxJS |
| Favoris + dashboard via signals / computed | TP Signals |
| ≥ 2 pipes | TP Pipes |
| Bonnes pratiques & design patterns | transversal (tous les TP) |
| **GraphQL / Apollo (bonus)** | **TP DigiDex** |

---

## ✔️ Checklist avant de rendre

- [ ] L'appli **se lance** sans erreur (`npm install` puis `npm start`).
- [ ] **≥ 3 ressources**, **≥ 5 modèles**, **≥ 5 services**.
- [ ] **≥ 3 listes** + **≥ 3 détails** + favoris + dashboard + formulaire + 404.
- [ ] **Navigation entre ressources liées** fonctionnelle.
- [ ] **≥ 1 route lazy**, **≥ 4 composants dumb**, **≥ 2 pipes**.
- [ ] Favoris **persistants** après rechargement.
- [ ] `OnPush`, désabonnement propre, **aucun `any`**.
- [ ] **README** complet + **réponses aux 10 questions**.
- [ ] Dossier **`screenshots/`** rempli.
- [ ] **`node_modules/` exclu** du dépôt, dépôt **public**, commits réguliers.
- [ ] Lien envoyé sur **Teams** ou à **contact.infosoftware@gmail.com** avant **jeudi 13h00**, objet `Nom Prénom — TP Projet Angular`.

---

**Bon courage, et amusez-vous bien ! 🚀**
