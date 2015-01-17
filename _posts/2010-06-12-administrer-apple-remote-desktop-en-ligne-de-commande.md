---
layout: post
title: Administrer Apple Remote Desktop en ligne de commande
---
Apple Remote Desktop (ou encore ARD) et l’outil de prédilection d’un
administrateur Mac.

![](/img/tumblr_lhnycrj2Bd1qgcouj.png)

Cet outil permet non seulement d’observer et de prendre la main aussi bien sur
des postes clients que sur les xserve de l’entreprise (même durant
l’installation), mais aussi de déployer de manière centralisée des packets,
des scripts, de lancer des commandes à distance, ou encore de générer des
rapports sur l’état des machines. Sur un Mac OS X Server, l’installateur vous
propose lui même d’activer ARD à la fin de l’installation.

Sur un poste client, ARD se basant sur le partage decran, celui ci n’est pas
forcement actif lorsque l’on peut en avoir besoin… Voici donc quelques
commandes qui vont nous permettre de l’activer grâce à un accès SSH:

> $ sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/R
esources/kickstart -activate -configure -access -on -restart -agent -privs
-all

Cette ligne activera donc l’accès ARD pour n’importe quel compte autorisé à se
loguer sur cette machine (les utilisateurs locaux et réseau).

Vous pouvez également restreindre cette accès afin de n’autoriser que les
utilisateurs possédant des droits d’administration sur la machine en question
en lançant plutôt cette commande:

> $ sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/R
esources/kickstart -activate -configure -access -on -users admin -privs -all
-restart -agent -menu

Toujours via le terminal, vous pouvez également désactiver ARD et son
démarrage automatique:

> $ sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/R
esources/kickstart -deactivate -stop

Les utilisateurs déjà habitués à ARD auront certainement déjà remarqué qu’il
arrive que le service se retrouve indisponible selon la version d’ARD et de
Mac OS, vous pouvez très facilement redémarrer ARD, toujours en ligne de
commande:

> $ sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/R
esources/kickstart -restart -agent
