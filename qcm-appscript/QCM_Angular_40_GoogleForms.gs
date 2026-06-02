/**
 * ============================================================================
 *  QCM ANGULAR — Synthèse de tous les TP  →  Google Forms (quiz auto-noté)
 *  40 questions • noté sur 20 (0,5 point par question)
 * ============================================================================
 *
 *  COMMENT L'UTILISER
 *   1. https://script.google.com  →  Nouveau projet
 *   2. Colle TOUT ce fichier
 *   3. Fonction "creerQCMAngular40"  →  ▶ Exécuter  (autorise au 1er lancement)
 *   4. Menu "Exécution / Journaux" : tu y trouveras
 *        - le lien d'ÉDITION du formulaire
 *        - le lien à PARTAGER (pour répondre)
 *
 *  La note s'affiche à l'élève dès la soumission (mode quiz activé).
 *
 *  ⚙️ NOTE SUR LE BARÈME
 *   40 questions × 0,5 pt = 20  →  note finale sur 20.
 *   Si ta version d'Apps Script refuse les demi-points, mets POINTS_PAR_QUESTION = 1
 *   (la note sera alors sur 40).
 * ============================================================================
 */

var POINTS_PAR_QUESTION = 0.5;   // 0.5 → /20  |  1 → /40

function creerQCMAngular40() {
  var form = FormApp.create('QCM Angular — Synthèse de tous les TP (40 questions, /20)');

  form.setIsQuiz(true);
  form.setDescription(
    'QCM de synthèse sur Angular (tous les TP) : composants & templates, services & DI, ' +
    'HttpClient & RxJS, Signals, Pipes, Routing, Formulaires, et GraphQL.\n\n' +
    '40 questions • 0,5 point chacune • note sur 20 affichée à la fin.'
  );
  form.setProgressBar(true);
  form.setShuffleQuestions(false);

  // { h: "section" }  OU  { q, o:[...], a:indexBonneRéponse, fb? }
  var ITEMS = [

    { h: 'Section 1 — Composants & Templates' },
    { q: 'Angular est un framework développé et maintenu par :', o: ['Facebook', 'Google', 'Microsoft', 'Amazon'], a: 1 },
    { q: 'Un composant "standalone" se passe de :', o: ['template', 'NgModule', 'sélecteur', 'décorateur'], a: 1,
      fb: 'Les composants standalone déclarent leurs dépendances dans "imports", sans NgModule.' },
    { q: 'Quel décorateur définit un composant ?', o: ['@Injectable', '@Component', '@Directive', '@NgModule'], a: 1 },
    { q: 'L\'interpolation pour afficher une variable s\'écrit :', o: ['[valeur]', '{{ valeur }}', '(valeur)', '#valeur'], a: 1 },
    { q: 'Le property binding (lier une propriété d\'élément) s\'écrit :', o: ['(prop)="x"', '[prop]="x"', '{{prop}}', '#prop'], a: 1 },
    { q: 'L\'event binding (écouter un clic) s\'écrit :', o: ['[click]="f()"', '(click)="f()"', '{{click}}', 'on-click'], a: 1 },
    { q: 'Le binding bidirectionnel utilise la syntaxe :', o: ['[x]', '(x)', '[(ngModel)]', '{{x}}'], a: 2 },
    { q: 'La nouvelle syntaxe de condition (Angular 17+) est :', o: ['*ngIf', '@if / @else', '[hidden]', 'v-if'], a: 1 },
    { q: 'La nouvelle boucle de template est :', o: ['*ngFor', '@for (... ; track ...)', '@loop', 'for()'], a: 1 },
    { q: 'Dans @for, "track" sert à :', o: ['trier', 'identifier chaque élément (performance)', 'filtrer', 'limiter'], a: 1,
      fb: 'track (ex-trackBy) évite de recréer tout le DOM à chaque changement de liste.' },
    { q: '@switch remplace l\'ancienne directive :', o: ['ngFor', 'ngSwitch', 'ngStyle', 'ngClass'], a: 1 },
    { q: 'Transmettre une donnée du parent vers l\'enfant se fait via :', o: ['@Output()', '@Input() (ou input())', 'un service obligatoire', 'localStorage'], a: 1 },
    { q: 'Remonter un évènement de l\'enfant vers le parent se fait via :', o: ['@Input()', '@Output() (ou output())', 'window.event', 'une Promise'], a: 1 },

    { h: 'Section 2 — Services & Injection de dépendances' },
    { q: 'Un service se déclare avec le décorateur :', o: ['@Service', '@Injectable', '@Component', '@Provider'], a: 1 },
    { q: 'providedIn: \'root\' crée un service :', o: ['par composant', 'singleton, partagé dans toute l\'app', 'jamais instancié', 'recréé à chaque appel'], a: 1,
      fb: 'providedIn:"root" = une seule instance (Singleton) dans tout l\'application.' },
    { q: 'La fonction moderne pour injecter une dépendance est :', o: ['provide()', 'inject()', 'require()', 'useDI()'], a: 1 },
    { q: 'Le mécanisme qui fournit les dépendances aux classes est :', o: ['l\'héritage', 'l\'injection de dépendances (DI)', 'la réflexion', 'le data binding'], a: 1 },

    { h: 'Section 3 — HttpClient & RxJS' },
    { q: 'HttpClient renvoie par défaut :', o: ['des Promises', 'des Observables', 'des tableaux', 'des signals'], a: 1 },
    { q: 'Pour rendre HttpClient disponible (standalone), on ajoute :', o: ['importProvidersFrom(HttpModule)', 'provideHttpClient()', 'HttpClientModule dans bootstrap', 'rien'], a: 1 },
    { q: 'Dans un template, la meilleure façon de consommer un Observable est :', o: ['subscribe() dans le constructeur', 'le pipe async', 'setInterval', 'toPromise()'], a: 1,
      fb: 'Le pipe async s\'abonne ET se désabonne automatiquement → pas de fuite mémoire.' },
    { q: 'Le principal risque d\'un subscribe() jamais nettoyé est :', o: ['une erreur de build', 'une fuite mémoire', 'un rechargement', 'aucun'], a: 1 },
    { q: 'L\'opérateur RxJS qui transforme la valeur émise est :', o: ['filter', 'map', 'tap', 'take'], a: 1 },
    { q: 'L\'opérateur RxJS qui ne laisse passer que certaines valeurs est :', o: ['map', 'filter', 'merge', 'scan'], a: 1 },
    { q: 'Pour une recherche au clavier (annuler la requête précédente), on utilise :', o: ['mergeMap', 'switchMap', 'concatMap', 'forkJoin'], a: 1 },
    { q: 'Pour ne pas lancer une requête à chaque touche tapée, on utilise :', o: ['delay', 'debounceTime', 'timeout', 'interval'], a: 1 },
    { q: 'Un BehaviorSubject se distingue d\'un Subject car il :', o: ['n\'émet jamais', 'réémet la dernière valeur aux nouveaux abonnés', 'est synchrone seulement', 'n\'a qu\'un abonné'], a: 1 },

    { h: 'Section 4 — Signals' },
    { q: 'On crée un état réactif (signal) avec :', o: ['new Signal()', 'signal(valeur)', 'createSignal()', 'useState()'], a: 1 },
    { q: 'Pour LIRE un signal nommé count, on écrit :', o: ['count', 'count()', 'count.value', 'get(count)'], a: 1 },
    { q: 'Une valeur DÉRIVÉE d\'autres signals se crée avec :', o: ['effect()', 'computed()', 'derive()', 'memo()'], a: 1 },
    { q: 'Pour exécuter un effet de bord quand un signal change, on utilise :', o: ['computed()', 'effect()', 'watch()', 'subscribe()'], a: 1 },

    { h: 'Section 5 — Pipes' },
    { q: 'Un pipe "pur" (par défaut) se recalcule :', o: ['à chaque cycle de détection', 'seulement quand son entrée change', 'jamais', 'une seule fois'], a: 1 },
    { q: 'Pour formater une date dans le template, on utilise le pipe :', o: ['| number', '| date', '| currency', '| json'], a: 1 },

    { h: 'Section 6 — Routing' },
    { q: 'Les routes d\'une app standalone se fournissent via :', o: ['RouterModule.forRoot', 'provideRouter(routes)', 'app.routes()', 'new Router()'], a: 1 },
    { q: 'Le composant de la route active s\'affiche dans :', o: ['<router-view>', '<router-outlet>', '<ng-outlet>', '<route>'], a: 1 },
    { q: 'Un paramètre dynamique de route s\'écrit :', o: ['/page/{id}', '/page/:id', '/page/?id', '/page/[id]'], a: 1 },
    { q: 'Charger une route uniquement quand nécessaire s\'appelle :', o: ['eager loading', 'lazy loading (loadComponent)', 'preloading', 'tree shaking'], a: 1,
      fb: 'Le lazy loading réduit le bundle initial → l\'app démarre plus vite.' },
    { q: 'Pour autoriser/bloquer l\'accès à une route, on utilise :', o: ['un pipe', 'un guard (CanActivate)', 'un intercepteur', 'un resolver de style'], a: 1 },

    { h: 'Section 7 — Formulaires & GraphQL' },
    { q: 'En Reactive Forms, on construit le formulaire avec :', o: ['ngModel', 'FormBuilder / FormGroup', 'template ref', 'Validators seul'], a: 1 },
    { q: 'Pour rendre un champ obligatoire, on utilise :', o: ['Validators.required', 'required()', 'mandatory:true', 'FormControl.req'], a: 0 },
    { q: 'Un avantage clé de GraphQL par rapport à REST est :', o: ['plusieurs endpoints', 'demander précisément les champs via un seul endpoint', 'pas de JSON', 'réponses chiffrées'], a: 1,
      fb: 'GraphQL évite l\'over-fetching/under-fetching : on récupère exactement les champs voulus en une requête.' }
  ];

  // --- Construction ---
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
        .setPoints(POINTS_PAR_QUESTION)
        .setRequired(true);
    if (it.fb) {
      item.setFeedbackForIncorrect(FormApp.createFeedback().setText(it.fb).build());
    }
    nbQuestions++;
  });

  Logger.log('✅ QCM créé : ' + nbQuestions + ' questions, note sur ' + (nbQuestions * POINTS_PAR_QUESTION) + '.');
  Logger.log('✏️  Édition  : ' + form.getEditUrl());
  Logger.log('🔗 À partager : ' + form.getPublishedUrl());
}
