---
layout: post
title: Coloration syntaxique dans Redmine
---
De base, Redmine propose déjà une coloration syntaxique pour la navigation
dans les sources du dépôt via un quelconque SCM.

Malheureusement cette coloration se limite à quelques langages les plus
connus, PHP ou C par exemple sont déjà pris en charge.

Viennent ensuite les langages moins courants comme Objective-C qui, avec
lequel le moteur de coloration d’origine va rester noir sur blanc.

![](/img/tumblr_lhnym9f3bs1qgcouj.png)

Il existe donc un plugin qui va nous permettre de résoudre ce problème en
intégrant un moteur de coloration syntaxique nommé Ultraviolet déjà utilisé
dans de nombreux projets dont l’IDE TextMate.

Pour l’installer rien de plus simple. Commencez par installer libonig-dev
(pour la reconnaissance d’expressions régulières) avec aptitude et utilisez
Gem pour installer le moteur de coloration syntaxique:

> # aptitude install libonig-dev # gem install ultraviolet

Rendez-vous ensuite sur
[Github](http://github.com/epitron/redmine_ultraviolet) pour récupérer la
dernière version et placer le plugin dans le dossier vendor/plugins de votre
Redmine.

Placez vous ensuite dans le dossier contenant votre installation de Redmine et
lancez un petit coup de rake sur vos plugins:

# rake db:migrate_plugins RAILS_ENV=production

et enfin relancer votre instance de Redmine ou directement votre serveur Rails
(Mongrel, ou Apache si vous utilisez passenger)

Voilà le résultat sur le même fichier:

![](/img/tumblr_lhnyn34nUK1qgcouj.png)
