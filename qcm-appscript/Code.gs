/**
 * DigiDex — QCM (Google Apps Script Web App)
 *
 * Déploiement :
 *   1. https://script.google.com  → Nouveau projet
 *   2. Colle ce fichier dans "Code.gs"
 *   3. Fichier → + → HTML → nomme-le "Index" → colle le contenu de Index.html
 *   4. Déployer → Nouveau déploiement → type "Application Web"
 *      - Exécuter en tant que : moi
 *      - Accès : tout le monde (ou ton domaine)
 *   5. Ouvre l'URL générée → les 2 QCM s'affichent, note /20 immédiate.
 */

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('DigiDex — QCM GraphQL & Angular')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
