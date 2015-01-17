---
layout: post
title: Configuration d'Exim pour l'envoi externe
---
La plupart des applications web que nous pouvons être amené à déployer sur un
serveur web utilise des fonctions d'envoi de mails.

Afin de gérer soit même les files d'attentes, il peut alors être utile
d'héberger soit même un serveur SMTP directement sur la machine qui héberge
l'application. Nous allons donc voir comment configurer simplement Exim pour
l'envoi de mails vers les domaines externes. Nous utiliserons une distribution
Debian stable.

Commençons par installer Exim:

~~~
# aptitude install exim4
~~~

Exim va alors s'installer avec une configuration de base que nous allons
modifier avec l'assistant fourni par exim4-config:

~~~
# dpkg-reconfigure exim4-config
~~~

Le premier écran vous expliquera le rôle de cet utilitaire, validez avec "Ok"
pour passer à l'écran suivant.

Sur celui si, choisissez "Distribution direct par SMTP (site internet)".

Ensuite sur l'écran suivant entrez le nom tel que vous l'avez défini dans
votre configuration ou tel qu'il a été défini par votre hébergeur.

Deux écran plus loin, l'assistant va vous demander sur quelle adresse il va
devoir accepter le courrier. Puisque nous sommes parti sur une configuration
simple où le serveur d'applications (php par exemple) se trouve sur la même
machine, nous utiliseront donc l'adresse 127.0.0.1 pour limiter les
connections au serveur avec lui-même.

L'écran suivant nous demande alors de préciser sur quel autre nom le serveur
doit accepter les mails. Nous pouvons ici lui repriser le nom DNS de notre
machine.

Vient ensuite, la question des domaines à relayer. Nous l'avons déjà vu, nous
n'acceptons les mails entrant que sur l'adresse de localhost: 127.0.0.1. Nous
pouvons donc autoriser le transfert vers tous les domaines afin que les mails
puissent sortir. Remplissez donc ce champ avec une étoile "*".

Laissez la liste des machines à relayer vide car nous souhaitons que le
serveur transmette lui même les mails sortants.

Deux écran plus loin, répondez "Non" à la proposition de minimiser les
requêtes DNS, laissez la distribution du courrier au "format mbox dans
/var/mail" et ne séparez pas la configuration dans plusieurs fichiers.

L'assistant va se fermer et va redémarrer Exim et vous pourrez tester sans
problème le bon fonctionnement de votre MTA par exemple avec la fonction
mail() de PHP.
