---
layout: post
title: 'NSlookup et Dig: surveillez vous mises à jours DNS'
---
Lors de l'achat d'un nom de domaine chez un registar, celui ci fourni
généralement des services d'hébergement, de mails, mais aussi les services DNS
liés à la gestion de ce domaine. On peux alors modifier directement sa
configuration DNS dans l'interface mis à disposition par l'hébergeur et cette
configuration sera alors répliquée sur les différents serveurs DNS desservant
votre nom de domaine.

Nous allons voir ici comment contrôler la mise en applications de vos
modifications via 2 outils en lignes de commande: NSLookup (présent sur tous
systèmes) et Dig (présent de base sous Linux et Mac OS X, une version cygwin
existe pour Windows).

Prenons un exemple concret, je viens de migrer mon blog sur un nouveau serveur
et je souhaite que l'adresse "blog.lelevier.fr" pointe bien sur ce nouveau
serveur. J'ai fait les modifications nécessaire dans l'interface de mon
registar et je connaît l'adresse ip ou le nom de mon nouveau serveur.

Commençons par NSLookup avec une requête simple:

~~~
23:03: tibo@Boudallu ~ % nslookup blog.lelevier.fr Server: 192.168.1.1
Address: 192.168.1.1#53 Non-authoritative answer: blog.lelevier.fr canonical
name = rps.lelevier.fr. Name: rps.lelevier.fr Address: 87.98.170.232
~~~

Ici c'est mon serveur DNS local qui me répond (192.168.1.1) et bien qu'il n'ai
pas autorité sur le domaine (il ne le gère pas directement) il me répond que
"blog.lelevier.fr" est un Alias de "rps.lelevier.fr" défini par l'adresse
"87.98.170.232" qui est justement mon serveur.

Même si le résultat est ici concluant nous allons partir sur le cas où la
modification n'a pas encore été répliquée sur notre serveur local. Regardons
alors directement sur les serveur DNS de notre registar pour voir si les
modifications ont était prise en compte sur ces derniers. Commençons par
trouver l'adresse ou le nom des serveurs DNS faisant autorité sur notre
domaine avec Dig:

~~~
23:04: tibo@Boudallu ~ % dig NS lelevier.fr ; «» DiG 9.4.3-P3 «» NS
lelevier.fr ;; global options: printcmd ;; Got answer: ;; -»HEADER«- opcode:
QUERY, status: NOERROR, id: 64451 ;; flags: qr rd ra; QUERY: 1, ANSWER: 2,
AUTHORITY: 0, ADDITIONAL: 2 ;; QUESTION SECTION: ;lelevier.fr. IN NS ;; ANSWER
SECTION: lelevier.fr. 86400 IN NS dns11.ovh.net. lelevier.fr. 86400 IN NS
ns11.ovh.net. ;; ADDITIONAL SECTION: dns11.ovh.net. 86371 IN A 213.251.188.130
ns11.ovh.net. 86371 IN A 213.251.128.130 ;; Query time: 54 msec ;; SERVER:
192.168.1.1#53(192.168.1.1) ;; WHEN: Wed Aug 19 00:06:38 2009 ;; MSG SIZE
rcvd: 107
~~~

Nous pouvons lire ici dans la zone "ANSWER SECTION" que notre domaine est
gérer par les serveur "dns11.ovh.net" et "ns11.ovh.net". Retournons alors
maintenant sur NSLookup pour vérifier l'état de la résolution sur un serveur
précis. Lançez NSLookup sans argument avec la commande "NSLookup", spécifiez
le serveur DNS avec l'option "server" suivit du nom ou de l'ip d'un des
serveur trouvé au dessus, et enfin entrez le nom DNS que vous souhaitez
résoudre:

~~~
23:06: tibo@Boudallu ~ % nslookup > server dns11.ovh.net Default server:
dns11.ovh.net Address: 213.251.188.130#53 > blog.lelevier.fr Server:
dns11.ovh.net Address: 213.251.188.130#53 blog.lelevier.fr canonical name =
rps.lelevier.fr. Name: rps.lelevier.fr Address: 87.98.170.232 >
~~~

On peut alors lire ici que le serveur en question redirige encore une fois
"blog.lelevier.fr" vers l'hôte "rps.lelevier.fr" dont l'adresse est
"87.98.170.232". On pourra alors vérifier sur le second serveur DNS que les
informations concordent et en conclure l'état de notre modification et sa
prise en compte par notre registar.

A noté cependant qu'il faut généralement entre 4h et 48h pour que la
modification soit répliquée.
