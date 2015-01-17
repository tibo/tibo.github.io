---
layout: post
title: Wordpress et PHP 5.3
---
Après plusieurs tentatives d’installation (ou de migration) de Wordpress sous
un serveur PHP 5.3, je viens enfin de trouver la solution à ce qui semble être
une incompatibilité due à une configuration non explicite de php.

L’erreur est simple, vous affichez votre site/blog sous wordpress et celui ci
vous hurle dessus que les fonction strtotime() et date() ne peut répondre à au
système car le timezone n’a pas été défini dans php.

![](/img/tumblr_lhnywbXBeb1qgcouj.png)

Reste donc a aller faire un tour dans votre php.ini, a rechercher
“date.timezone = ” et à plus préciser “Europe/Paris” (oui ici on est en France
monsieur!) en prenant soin de décommenter la ligne (retirez le “;”)

Bon maintenant que j’ai downgrader mes serveurs en 5.2.10 je vais pouvoir
remonter sur une 5.3!
