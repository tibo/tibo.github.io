---
layout: post
title: 'Redmine: Quelques plugins'
---
Comme dit lors de l'un de mes derniers articles, Redmine est un outil de
gestion de projet puissant, libre et de par son écriture en Ruby, massivement
extensible par divers plugins!

Voici donc ici les quelques plugins que j'ai pu repérer et tester, liste
biensur non exhaustive!

Tout d'abord commençons par fédérer un peu la communauté qui contribue à votre
projet par des fonctions un peu plus sociales afin que ces derniers soient le
plus au courant possible de l'état du projet.

Commençons donc par un petit plugin de blog qui permettra à vos utilisateurs
de poster des annonces, des informations ou encore des réflexions de manière
centrale et interne. Ce plugin reste cependant limité quand a une éventuelle
utilisation pour une façade d'annonce  publique.

![Blog](/img/redmine_blogs_main.png)

([http://www.redmine.org/boards/3/topics/5782](http://www.redmine.org/boards/
3/topics/5782))

Viens ensuite une copie du réseau social le plus en vogue en ce moment, j'ai
nommé Twitter! Grâce au plugin "status update" vous pourrez mettre en place un
moyen rapide de communiquer entre vos collaborateurs afin qu'il puissent dire
simplement ce qu'ils sont en train de faire. Ce plugin aurait cependant peut-
être besoin d'une fonction de "reply" et/ou "repost" pour pouvoir réellement
s'apparenter à Twitter.

![Status update](/img/Screenshot-
eCookbook_-_Redmine_-
_Mozilla_Firefox.png)

([http://www.redmine.org/boards/1/topics/1483](http://www.redmine.org/boards/
1/topics/1483))

Passons maintenant à un plugin plus élémentaire voir quasiment indispensable:
la gestion des fameuses "todo list". Grâce à ce plugin vous pourrez
centraliser la gestion de ces dernières directement dans un nouvel onglet du
projet et ainsi éviter à vos contributeurs de passer par un quelconque service
web complémentaire ou encore par l'éternel post-it. Cette fois rien à redire,
les idées sont centralisées sur notre plateforme interne ce qui est en plus un
gage de sécurité!  ([http://www.redmine.org/boards/3/topics/4070](http://www.
redmine.org/boards/3/topics/4070))

Et si beaucoup de personnes interviennent sur votre projet? Comment gérer les
interrogations des nouveaux venu? Par défaut, beaucoup serait tenté de tout
centraliser sur une doc disponible sur le wiki du projet. C'est une bonne
pratique mais mal géré, cela peut vite tourner au bazar le plus complet.
L'idée du plugin "question" est de pouvoir gérer vos demandes et votre support
en interne (par exemple les demandes formulées par de nouveaux développeurs ou
par un utilisateur final). De plus, ce plugin permet d'effectuer des
recherches multi-critères sur les questions qui ont déjà été pausés, pourquoi
pas réorienter la documentation en fonction des questions les plus récurantes?

![Question](/img/question_on_issue.png)

([http://www.redmine.org/wiki/redmine/PluginQuestion](http://www.redmine.org/
wiki/redmine/PluginQuestion))

Besoin de mieux évaluer les coûts de votre projet? Attention, le plugin
"budget" dépend d'un projet bien rodé afin d'être réellement efficace. Vous
pourrez ainsi prévoir le coût du projet en fonction du temps passé. Cela
implique également l'utilisation de la "badgeuse" intégrée au Redmine par vos
développeurs et autres contributeurs afin qu'il puisse faire état du temps
passé sur les différentes taches du projet.

![Budget](/img/budget_plugin-
budget_screen.png)

([http://www.redmine.org/wiki/redmine/PluginBudget](http://www.redmine.org/wi
ki/redmine/PluginBudget))

Enfin, je terminerai avec un plugin relativement évolué. Avis aux amateurs de
gestions de projets Agile, ce plugin vous permettra d'intégrer les méthodes de
gestion [Scrum](http://fr.wikipedia.org/wiki/Scrum) à votre projet sous la
forme d'un dashboard complet:

![Scrum Dashboard](/img/scrumdashboard_1.p
ng)

([http://www.redmine.org/boards/3/topics/5808](http://www.redmine.org/boards/
3/topics/5808))

Je ne détaillerai pas ici l'installation de ces plugins et vous invite pour
cela à vous rendre sur la page officiel du wiki de Redmine: [http://www.redmi
ne.org/wiki/redmine/Plugins](http://www.redmine.org/wiki/redmine/Plugins)
