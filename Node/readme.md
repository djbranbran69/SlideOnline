SlideOnline
==========================

AngularJS.

Requirements
------------
* npm

Installation
------------
Install node.js:
[Download Node.js](http://nodejs.org/download/)

Install project dependencies:
	npm install
	
Questions Réponses
-------------
- 3.1.2.A quoi sert l’organisation en paquet d’un projet ?
    - `Pour mieux organiser son code et séparer le traitement la vue du controleur.`
- 3.1.3.Quelles sont les rôles respectifs des modules applications et contrôler ?
    - Application : `projet global.`
    - Contrôleur : `contient les différents contrôleurs.`
- 3.2.1. A quoi sert les directives suivantes:
    - ng-app? `Directive qui permettant d'utiliser un module application et l'associer à un élément racine de la page.` 
    - ng-controller? `Directive permettant d'attacher un contrôleur à une partie de la vue.` 
    - ng-model? `Directive qui associe un élement de la page à un objet métier du contrôleur.`
- 3.3.1.A quoi sert la commande loginCrtFnt.$inject=['$scope','$log']; ?
    - `Cela permet de définir 2 services pour le contrôleur loginCtrlFnt.`
- 3.3.2. Qu’est ce que $scope ?
    - `$scope est un espace mémoire pouvant être utilisé par la vue et le contrôleur.`
- 3.3.3. Comment peut-on tester cette application ?
    - `Soit en utilisant un outil de tests comme grunt. Soit lancer l'application et réaliser des tests fonctionnels dessus.`