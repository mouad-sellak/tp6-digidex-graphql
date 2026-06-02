/**
 * ============================================================================
 *  QCM ANGULAR — Bonnes pratiques & Design Patterns  →  Google Forms (quiz)
 * ============================================================================
 *
 *  Ce script crée AUTOMATIQUEMENT un Google Form configuré en QUIZ :
 *   - 50 questions (1 point chacune)
 *   - bonnes réponses + barème → note calculée automatiquement par Forms
 *   - feedback affiché en cas de mauvaise réponse
 *   - sections thématiques
 *
 *  COMMENT L'UTILISER
 *   1. Va sur https://script.google.com  →  Nouveau projet
 *   2. Colle TOUT ce fichier
 *   3. En haut, choisis la fonction "creerQCMAngular"  →  ▶ Exécuter
 *   4. Autorise le script (1re fois)
 *   5. Menu "Exécution" / "Journaux" : tu y trouveras
 *        - le lien d'ÉDITION du formulaire
 *        - le lien à PARTAGER (pour répondre)
 *
 *  La note s'affiche à l'élève dès la soumission (réglage quiz activé).
 * ============================================================================
 */

function creerQCMAngular() {
  var form = FormApp.create('QCM Angular — Bonnes pratiques & Design Patterns');

  // --- Réglages QUIZ ---
  form.setIsQuiz(true);                 // active la notation automatique
  form.setDescription(
    'QCM de synthèse sur Angular (tous les TP) : composants, services & DI, ' +
    'RxJS & Signals, control flow, formulaires, routing, HTTP, et surtout les ' +
    'BONNES PRATIQUES et DESIGN PATTERNS.\n\n' +
    '50 questions • 1 point chacune • note affichée à la fin.'
  );
  form.setProgressBar(true);
  form.setShuffleQuestions(false);
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);

  // Données : { h: "titre de section" }  OU  { q, o:[...], a:indexBonneRéponse, fb }
  var ITEMS = [

    { h: 'Section 1 — Architecture & Composants' },
    { q: 'Le design pattern qui sépare les composants "intelligents" (logique/données) des composants de "présentation" (affichage seul) s\'appelle :',
      o: ['Singleton', 'Container / Presentational (Smart / Dumb)', 'Factory', 'Adapter'], a: 1,
      fb: 'Smart/Dumb (Container/Presentational) : le smart gère l\'état et les services, le dumb ne fait qu\'afficher via @Input/@Output.' },
    { q: 'Un composant Angular déclaré SANS NgModule est dit :',
      o: ['orphelin', 'standalone', 'lazy', 'détaché'], a: 1 },
    { q: 'Bonne pratique : un composant devrait idéalement respecter le principe…',
      o: ['de responsabilité unique (Single Responsibility)', 'd\'héritage multiple', 'de duplication', 'de couplage fort'], a: 0 },
    { q: 'Convention de nommage recommandée pour un sélecteur de composant :',
      o: ['PascalCase sans préfixe', 'un préfixe en kebab-case (ex: app-…)', 'camelCase', 'tout en majuscules'], a: 1 },
    { q: 'Pour optimiser la détection de changements d\'un composant, on définit :',
      o: ['ChangeDetectionStrategy.OnPush', 'ChangeDetectionStrategy.Always', 'NgZone.Disabled', 'detach() systématique'], a: 0,
      fb: 'OnPush ne relance la détection que si une @Input change (référence), un event survient ou un Observable émet via async.' },
    { q: 'OnPush donne son plein potentiel quand on travaille avec…',
      o: ['des données mutées en place', 'des données immuables (immutability) + pipe async', 'beaucoup de setTimeout', 'des variables globales'], a: 1 },
    { q: 'Transmettre une donnée du parent vers l\'enfant se fait via :',
      o: ['@Output()', '@Input() (ou input())', 'un service obligatoire', 'le localStorage'], a: 1 },
    { q: 'Remonter un évènement de l\'enfant vers le parent se fait via :',
      o: ['@Input()', '@Output() EventEmitter (ou output())', 'window.dispatchEvent', 'un Subject global'], a: 1 },
    { q: '@Component, @Injectable, @Input sont techniquement des…',
      o: ['fonctions pures', 'décorateurs (Decorator pattern)', 'interfaces', 'classes abstraites'], a: 1 },
    { q: 'Garder des composants petits, ciblés et réutilisables est…',
      o: ['une perte de temps', 'une bonne pratique de maintenabilité', 'interdit par Angular', 'réservé aux libs'], a: 1 },

    { h: 'Section 2 — Services, Injection de dépendances & Patterns' },
    { q: 'Un service déclaré avec providedIn: \'root\' est :',
      o: ['recréé à chaque injection', 'un singleton partagé dans toute l\'application', 'limité à un composant', 'jamais instancié'], a: 1,
      fb: 'providedIn:"root" = une seule instance (Singleton) fournie par l\'injecteur racine.' },
    { q: 'Le mécanisme par lequel Angular fournit ses dépendances à une classe s\'appelle :',
      o: ['l\'héritage', 'l\'injection de dépendances (DI)', 'la réflexion', 'le data binding'], a: 1 },
    { q: 'La fonction moderne pour injecter une dépendance (hors constructeur) :',
      o: ['provide()', 'inject()', 'require()', 'useService()'], a: 1 },
    { q: 'Un service qui expose une API simple masquant plusieurs services/sous-systèmes applique le pattern :',
      o: ['Facade', 'Observer', 'Proxy', 'Builder'], a: 0,
      fb: 'La Facade simplifie l\'accès à une logique complexe : le composant ne parle qu\'à un seul service.' },
    { q: 'Centraliser l\'état de l\'app dans un service via BehaviorSubject/Signal correspond au pattern :',
      o: ['Observable Data Service (service de state / store)', 'Memento', 'Visitor', 'Flyweight'], a: 0 },
    { q: 'Le design pattern fondamental derrière les Observables RxJS est :',
      o: ['Strategy', 'Observer', 'Singleton', 'Factory'], a: 1 },
    { q: 'Pour partager des données entre deux composants NON liés (ni parent/enfant), la meilleure approche est :',
      o: ['une variable globale', 'un service partagé (state service)', 'le DOM', 'des @Input en chaîne'], a: 1 },
    { q: 'Mettre toute la logique métier directement dans le composant est :',
      o: ['recommandé', 'une mauvaise pratique (préférer un service)', 'obligatoire', 'plus performant'], a: 1 },
    { q: 'Les intercepteurs HTTP (interceptors) servent surtout à gérer :',
      o: ['le CSS', 'des préoccupations transversales (auth, logs, gestion d\'erreurs)', 'le routing', 'les animations'], a: 1,
      fb: 'Cross-cutting concerns : un seul endroit pour ajouter un token, logger, ou intercepter les erreurs de toutes les requêtes.' },
    { q: 'Un service de logging réutilisé partout illustre surtout :',
      o: ['le pattern Singleton + DI', 'le pattern Decorator', 'le pattern Adapter', 'le pattern Bridge'], a: 0 },

    { h: 'Section 3 — RxJS & Signals' },
    { q: 'Dans un template, la meilleure façon de consommer un Observable est :',
      o: ['un subscribe() dans le constructeur', 'le pipe async (désabonnement automatique)', 'un setInterval', 'toPromise()'], a: 1,
      fb: 'Le pipe async s\'abonne et se DÉSABONNE tout seul quand le composant est détruit → pas de fuite mémoire.' },
    { q: 'Le principal risque d\'un subscribe() manuel jamais nettoyé est :',
      o: ['une erreur de compilation', 'une fuite mémoire (memory leak)', 'un rechargement de page', 'rien du tout'], a: 1 },
    { q: 'Pour se désabonner automatiquement à la destruction du composant (Angular 16+) :',
      o: ['takeUntilDestroyed()', 'ngOnDestroy vide', 'unsubscribeAll()', 'finalize()'], a: 0 },
    { q: 'Un BehaviorSubject se distingue d\'un Subject car il :',
      o: ['n\'émet jamais', 'conserve et réémet la dernière valeur aux nouveaux abonnés', 'est synchrone uniquement', 'ne peut avoir qu\'un abonné'], a: 1 },
    { q: 'Pour lancer une requête qui dépend d\'une autre en annulant la précédente, on utilise :',
      o: ['mergeMap', 'switchMap', 'concatMap', 'forkJoin'], a: 1 },
    { q: 'signal(0) crée :',
      o: ['une constante', 'un état réactif modifiable', 'un Observable', 'une Promise'], a: 1 },
    { q: 'computed(() => a() + b()) crée :',
      o: ['un effet de bord', 'une valeur dérivée recalculée automatiquement', 'un service', 'une directive'], a: 1 },
    { q: 'effect() sert à :',
      o: ['créer un signal', 'exécuter un effet de bord quand des signals changent', 'définir une route', 'valider un formulaire'], a: 1 },
    { q: 'Lire la valeur d\'un signal nommé "count" s\'écrit :',
      o: ['count', 'count()', 'count.value', 'get(count)'], a: 1 },
    { q: 'Un avantage des Signals par rapport au modèle Zone.js :',
      o: ['détection de changements plus fine et ciblée', 'suppression de TypeScript', 'plus besoin de composants', 'rendu côté serveur gratuit'], a: 0 },

    { h: 'Section 4 — Templates & Control flow' },
    { q: 'La nouvelle syntaxe de condition (Angular 17+) est :',
      o: ['*ngIf', '@if / @else', '[hidden]', 'v-if'], a: 1 },
    { q: 'Dans une boucle @for, fournir "track" est :',
      o: ['interdit', 'une bonne pratique de performance (réutilisation du DOM)', 'inutile', 'réservé aux signals'], a: 1,
      fb: 'track (ex-trackBy) évite à Angular de re-créer tout le DOM à chaque changement de liste.' },
    { q: 'Appeler une méthode dans une interpolation {{ calc() }} à chaque cycle de détection est :',
      o: ['recommandé', 'à éviter pour la performance (préférer signal/computed ou pipe pur)', 'impossible', 'plus rapide'], a: 1 },
    { q: '@switch remplace l\'ancienne directive :',
      o: ['ngFor', 'ngSwitch', 'ngStyle', 'ngClass'], a: 1 },
    { q: 'Le bloc @empty dans @for sert à :',
      o: ['arrêter la boucle', 'afficher un contenu quand la collection est vide', 'trier la liste', 'paginer'], a: 1 },

    { h: 'Section 5 — Formulaires' },
    { q: 'Pour des formulaires complexes, dynamiques et facilement testables, on privilégie :',
      o: ['les Template-driven Forms', 'les Reactive Forms', 'le ngModel partout', 'des inputs HTML bruts'], a: 1 },
    { q: 'FormBuilder sert à :',
      o: ['styliser les champs', 'construire FormGroup/FormControl plus simplement', 'valider côté serveur', 'router les pages'], a: 1 },
    { q: 'Validators.required est :',
      o: ['un validateur synchrone', 'un pipe', 'un guard', 'un intercepteur'], a: 0 },
    { q: '[(ngModel)] appartient à l\'approche :',
      o: ['Reactive Forms', 'Template-driven (FormsModule)', 'Signals Forms', 'HttpForms'], a: 1 },

    { h: 'Section 6 — Routing & Performance' },
    { q: 'Charger un composant/une route seulement quand l\'utilisateur en a besoin s\'appelle :',
      o: ['eager loading', 'lazy loading (loadComponent/loadChildren)', 'preloading total', 'tree shaking'], a: 1,
      fb: 'Le lazy loading réduit le bundle initial → l\'app démarre plus vite.' },
    { q: 'Pour autoriser ou bloquer l\'accès à une route, on utilise :',
      o: ['un pipe', 'un guard (ex: CanActivate)', 'un intercepteur', 'un resolver de style'], a: 1 },
    { q: '<router-outlet> sert à :',
      o: ['afficher le composant de la route active', 'déclarer les routes', 'créer un lien', 'charger un service'], a: 0 },
    { q: 'withComponentInputBinding() permet :',
      o: ['de recevoir les paramètres de route directement en @Input/input()', 'd\'activer le SSR', 'de lazy-loader les services', 'de désactiver le cache'], a: 0 },
    { q: 'Le lazy loading améliore principalement :',
      o: ['la sécurité', 'le temps de chargement initial (bundle plus petit)', 'la couleur du thème', 'les types'], a: 1 },

    { h: 'Section 7 — HTTP, Pipes & Qualité de code' },
    { q: 'HttpClient renvoie par défaut :',
      o: ['des Promises', 'des Observables', 'des tableaux', 'des signals'], a: 1 },
    { q: 'Typer les réponses HTTP avec des génériques (ex: get<User[]>) est :',
      o: ['inutile', 'une bonne pratique (sécurité de type)', 'interdit', 'plus lent'], a: 1 },
    { q: 'Un pipe "pur" (le comportement par défaut) se recalcule :',
      o: ['à chaque cycle de détection', 'uniquement quand sa valeur d\'entrée change (perf)', 'jamais', 'une seule fois'], a: 1 },
    { q: 'Éviter le type "any" et activer le strict mode relève :',
      o: ['des bonnes pratiques TypeScript/Angular', 'd\'une contrainte inutile', 'd\'un bug', 'du SSR'], a: 0 },
    { q: 'Les fichiers environment.ts / environment.prod.ts servent à :',
      o: ['stocker les mots de passe en clair', 'gérer la configuration par environnement (dev/prod)', 'définir les routes', 'écrire les tests'], a: 1 },
    { q: 'Un fichier "barrel" (index.ts qui ré-exporte plusieurs éléments) facilite :',
      o: ['des imports plus propres (module/barrel pattern)', 'le rendu', 'la détection de changements', 'les animations'], a: 0 }
  ];

  // --- Construction du formulaire ---
  var nbQuestions = 0;
  ITEMS.forEach(function (it) {
    if (it.h) {
      form.addSectionHeaderItem().setTitle(it.h);
      return;
    }
    var item = form.addMultipleChoiceItem();
    var choices = it.o.map(function (texte, idx) {
      return item.createChoice(texte, idx === it.a);
    });
    item.setTitle(it.q)
        .setChoices(choices)
        .setPoints(1)
        .setRequired(true);
    if (it.fb) {
      item.setFeedbackForIncorrect(
        FormApp.createFeedback().setText(it.fb).build()
      );
    }
    nbQuestions++;
  });

  // --- Liens ---
  Logger.log('✅ QCM créé : ' + nbQuestions + ' questions (note sur ' + nbQuestions + ').');
  Logger.log('✏️  Édition  : ' + form.getEditUrl());
  Logger.log('🔗 À partager : ' + form.getPublishedUrl());
}
