---
layout: post
title: Disque de sauvegarde en réseau et compatibilité Mac
---
Voilà quelques mois que je cherchais un petit nas réseau qui prendrai en
charge l'AFP et me permettrai de faire mes sauvegardes via le réseau pour ne
pas avoir à brancher de disque USB tous les 4 matins.

J'avais bien un petit [Linksys
NSLU2](http://www.linksysbycisco.com/EU/fr/products/NSLU2) flashé sous Debian
en rab mais cela m'obligeais à ajouter des disques USB 2.0, donc double
d'alimentation, place, qui plus ai la bête à tendance à siffler, et le tout
avec des performances (la machine n'a qu'un ARM bridé à 133mhz avec 32mo de
mémoire), j'ai vite laissé tombé l'idée.

En surveillant un peux les modèles disponibles je suis alors tombé sur le
[Netgear Stora
MS2110](http://www.netgear.com/Products/Storage/Stora/MS2110.aspx), petit
frère du Readynas avec une orientation plus "grand public", le tout pour moins
de 200€ disque compris, accès en AFP, certifié TimeMachine, et finalement très
décevant…

Malgré sa certification TimeMachine, le Netgear offre un utilisation
"multiple" et permet de stocker de la musique, des photos, des vidéos, des
documents… De ce fait l'espace de sauvegarde, non actif de base et accessible
seulement en SMB, est bridé par un quota de 200go, et cette limite est sans
appel… Impossible donc de l'utiliser pour sauvegarder toutes mes machines sur
200go! mon macbook à lui seul avec son disque de 250go dépassait déjà lors de
la sauvegarde initiale…

Me voilà donc avec un disque à 200€ acheté pour un besoin auquel il ne répond
pas… et heureusement, je l'avais prix chez [materiel.net](http://materiel.net)
qui encore une fois m'a prouvé son sérieux et sa qualité! Contact direct avec
Netgear de leur part, réponse sous 48h, les techniciens de Netgear n'ont pour
l'instant pas prévu la modification, et pour gagner du temps Materiel.net à
choisit de me reprendre le produit en question afin de ne pas bloquer mon
problème de sauvegarde. J'ai donc retourné le Netgear à son envoyeur qui m'a
alors fait un avoir (pas fou!), frais de retour compris. Comme d'habitude,
[Materiel.net](http://materiel.net), j'en suis content et je le recommande!

Bref revenons a nous moutons, après avoir hésité sur quelques modèles de chez
Synology, je me suis dis que cela m'aurai fait une sauvegarde finalement assez
éloignée de ma machine à sauvegarder: macbook -> neufbox (54mbits) -> switch
(100mb) -> nas (1gbits) et enfin les accès disques.

J'ai donc craquer et encore une fois j'ai acheté chez Apple. Une petite
TimeCapsule viens de rejoindre mon réseau, remplaçant ainsi le switch gigabyte
et le wifi fourni par la neufbox, je sais que mon espace de sauvegarde se
trouve juste derrière la borne et que le produit est prévu pour, bref aucun
problème tout fonctionne!

Note à mois même, ne plus essayer de bidouiller un système alternatif pour
économiser 60€, ça marchera toujours moins bien…
