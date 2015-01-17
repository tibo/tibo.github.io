---
layout: post
title: Préparer Debian Lenny pour Zimbra
---
Zimbra 5  ne supporte actuellement pas la nouvelle version stable de Debian :
Lenny (alias 5.0)

Avec Debian, il reste cependant facile de "mixer" les sources afin de faire
concorder les version de package présentes sur différentes branches de la
distribution.

Le premier problème va alors venir du fichier /etc/debian_version qui nous dit
clairement que nous sommes sur une version 5.0. Commençons alors par remplacer
le 5 par un 4 dans ce fichier afin de laisser penser à Zimbra qu'il se trouve
sur une machine sous Debian Etch.

Ensuite, nous allons avoir besoin d'une ancienne version de perl (5.8)
uniquement disponible sous Etch.

Pour celà nous devons ajouter les sources de Etch dans la liste des sources de
notre serveur pour la faire correspondre à quelque chose dans ce genre (les
serveurs peuvent biensur être différents):

~~~
deb [http://ftp2.fr.debian.org/debian/](http://ftp2.fr.debian.org/debian/)
etch main deb-src
[http://ftp2.fr.debian.org/debian/](http://ftp2.fr.debian.org/debian/) etch
main deb [http://security.debian.org/](http://security.debian.org/)
etch/updates main deb-src
[http://security.debian.org/](http://security.debian.org/) etch/updates main
deb [http://ftp2.fr.debian.org/debian/](http://ftp2.fr.debian.org/debian/)
lenny main deb-src
[http://ftp2.fr.debian.org/debian/](http://ftp2.fr.debian.org/debian/) lenny
main deb [http://security.debian.org/](http://security.debian.org/)
lenny/updates main deb-src
[http://security.debian.org/](http://security.debian.org/) lenny/updates main
deb [http://volatile.debian.org/debian-volatile](http://volatile.debian.org
/debian-volatile) lenny/volatile main deb-src [http://volatile.debian.org
/debian-volatile](http://volatile.debian.org/debian-volatile) lenny/volatile
main
~~~

Nous devons ensuite mettre à jour la liste des sources:

~~~
# aptitude update
~~~

Et nous pouvons enfin installer perl 5.8:

~~~
# aptitude install perl=5.8.8-7etch6
~~~

Nous pouvons maintenant supprimer exim

~~~
# aptitude remove exim4
~~~

et installer les packages requis

~~~
# aptitude install sudo fetchmail openssl libltdl3 libgmp3c2 libexpat1
~~~

Enfin vérifiez que le nom plainement qualifié du serveur pointe vers son IP
réel et non pas sur 127.0.0.1 dans le fichier /etc/hosts et récuperez la
dernière version de Zimbra 5 sur le site de Zimbra pour l'installer.
