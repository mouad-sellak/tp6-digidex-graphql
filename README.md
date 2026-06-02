# 🟣 DigiDex — GraphQL + Angular

Un **Digidex** (annuaire de Digimon) en deux parties :

| Dossier | Rôle | Stack |
| --- | --- | --- |
| [`digidex-api/`](./digidex-api) | Serveur **GraphQL** qui sert de passerelle vers l'API publique [digi-api.com](https://digi-api.com) | Node.js · Apollo Server 4 |
| [`digidex-app/`](./digidex-app) | Front **SPA** : liste paginée, recherche, page détail, favoris | Angular 19 · Apollo Angular · Signals |

L'API REST de digi-api.com renvoie des données très verbeuses. Notre serveur
GraphQL fait office de **Backend-For-Frontend** : il interroge cette API REST,
**nettoie** et **remodèle** les données, puis expose un schéma simple et typé que
le front consomme exactement comme il en a besoin.

```
┌──────────────┐   GraphQL    ┌──────────────┐   REST    ┌──────────────┐
│  Angular     │ ───────────► │  Apollo      │ ────────► │  digi-api.com│
│ (digidex-app)│ ◄─────────── │ (digidex-api)│ ◄──────── │  (API REST)  │
└──────────────┘  :4000       └──────────────┘           └──────────────┘
```

---

## 🚀 Lancer le projet

> Deux terminaux. L'API **doit** tourner avant le front.

### 1. L'API GraphQL

```bash
cd digidex-api
npm install
npm start          # → 🚀 Serveur GraphQL prêt sur http://localhost:4000/
```

Tu peux ouvrir `http://localhost:4000/` dans le navigateur : c'est
**Apollo Sandbox**, un explorateur interactif du schéma.

### 2. Le front Angular

```bash
cd digidex-app
npm install
npm start          # → http://localhost:4200/
```

---

## 📡 L'API GraphQL en bref

### Le schéma (queries disponibles)

```graphql
type Query {
  digimons(page: Int = 0, pageSize: Int = 20, name: String): DigimonPage!
  digimon(id: Int!): Digimon
  digimonByName(name: String!): Digimon
}
```

### Exemple de requête

```graphql
query {
  digimons(page: 0, pageSize: 5, name: "agu") {
    totalPages
    items {
      id
      name
      image
    }
  }
}
```

Le client demande **uniquement** `id`, `name`, `image` → c'est exactement ce
qu'il reçoit. Pas un champ de plus.

---

## ✨ Pourquoi GraphQL ? (les avantages)

C'est tout l'intérêt du TP. Comparé à une API REST classique :

### 1. On demande **précisément** ce dont on a besoin
Avec REST, `GET /digimon/1` renvoie **tout** l'objet (dates, évolutions,
attributs, descriptions multilingues…), même pour afficher juste un nom et une
image. Avec GraphQL, le client liste les champs voulus → la réponse ne contient
que ça. Charge utile plus légère, surtout sur mobile.

### 2. Fini l'**over-fetching** et l'**under-fetching**
- **Over-fetching** (REST) : recevoir trop de données inutiles.
- **Under-fetching** (REST) : devoir enchaîner plusieurs appels pour tout
  reconstituer.

En GraphQL, **une seule requête** récupère exactement le bon graphe de données.
Dans ce projet, la page détail récupère le Digimon **et** ses évolutions
(`priorEvolutions`, `nextEvolutions`) en un seul aller-retour.

### 3. Un **schéma fortement typé** = un contrat
Le schéma (`schema.js`) décrit la forme exacte des données (`Int!`, `[String!]`,
`Digimon`, `DigimonPage`…). Ce contrat est partagé entre back et front :
- auto-complétion et validation des requêtes,
- erreurs détectées tôt,
- documentation **vivante** générée automatiquement (Apollo Sandbox).

### 4. **Un seul endpoint**
Tout passe par `POST http://localhost:4000/`. Plus besoin de multiplier les
routes (`/digimon`, `/digimon/:id`, `/digimon/:id/evolutions`…). C'est la
**requête** qui décrit ce qu'on veut, pas l'URL.

### 5. Agrège et **remodèle** des sources hétérogènes
Le resolver (`resolvers.js`) transforme la réponse REST « brute » de digi-api.com
en un type propre : il aplatit `levels[].level` → `["Child"]`, filtre les
descriptions pour ne garder que l'anglais, etc. Le front reçoit des données
déjà prêtes à l'emploi. GraphQL peut ainsi **unifier plusieurs APIs** derrière
un seul schéma.

### 6. Le **cache** Apollo, gratuit
Côté Angular, `apollo-angular` met en cache les résultats par requête
(`InMemoryCache`) : revenir sur une page déjà vue n'entraîne pas de nouvel appel
réseau.

---

## 🧱 Stack technique

**API (`digidex-api`)**
- `@apollo/server` v4 (`startStandaloneServer`)
- `graphql`
- ES Modules (`"type": "module"`)

**Front (`digidex-app`)**
- Angular 19 (standalone components, control flow `@if` / `@for`)
- `apollo-angular` + `@apollo/client`
- **Signals** pour l'état (`signal`, mise à jour réactive de l'UI)
- `withComponentInputBinding()` (l'`id` de route arrive en `input()`)

---

## 📂 Structure

```
tp6-digidex-graphql/
├── digidex-api/
│   └── src/
│       ├── index.js        # démarre Apollo Server (port 4000)
│       ├── schema.js       # le schéma GraphQL (SDL)
│       ├── resolvers.js    # logique des queries + remodelage des données
│       └── datasource.js   # appels à l'API REST digi-api.com
└── digidex-app/
    └── src/app/
        ├── app.config.ts                 # config Apollo (uri du serveur GraphQL)
        ├── services/digimon-graphql.service.ts  # requêtes gql + Apollo
        ├── models/digimon.model.ts       # interfaces TypeScript
        └── pages/
            ├── digimon-list/             # liste paginée + recherche
            └── digimon-detail/           # fiche détaillée + évolutions
```
