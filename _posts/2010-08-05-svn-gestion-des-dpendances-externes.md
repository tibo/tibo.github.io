---
layout: post
title: 'SVN: Gestion des dépendances externes'
---
Le versionning de vos projets de développement est une chose essentielle pour
garantir la sécurité et la tenu à jour de vos sources entre développeurs.

Si l’intégralité des sources de votre projet peut être place sur un seul et
unique dépôt, il arrive souvent que votre application soit dépendante d’un
framework ou de quelques librairies importé d’un autre projet et souvent d’un
autre dépôt SVN.

Il est donc relativement lourd est contraignant de devoir stocker et
versionner les fichiers de ces sources externes qui ne seront de toute façon
pas à jour par rapport au dépôt sur lequel vous l’aurez récupéré. Prenons
l’exemple d’un projet PHP utilisant Zend Framework. Nous avons déjà mis en
place la structure MVC du projet et nous l’avons importé vers notre dépôt SVN.

![](/img/tumblr_lhnya9C5591qgcouj.png)

Nous souhaitons ajouter le Framework à jour dans le dossier /library à partir
du dépôt officiel: [http://framework.zend.com/svn/framework/standard/branches
/release-1.9/library/](http://framework.zend.com/svn/framework/standard/branch
es/release-1.9/library/)

Commencez donc par vous placer dans le dossier /library en ligne de commande.

Pour déclarer notre dépôt externe nous allons utiliser la propriété
“externals”  à l’aide de la fonction “propset” de SVN.

> svn propset svn:externals “http://framework.zend.com/svn/framework/standard/
branches/release-1.9/library/Zend Zend” .

Le point passé en dernier argument précise que nous déclarons cette propriété
dans le dossier courant, ne l’oubliez surtout pas!

SVN nous répond alors: property ‘svn:externals’ set on ‘.’ Il ne nous reste
plus qu’a faire un “svn up” pour mettre à jour la copie locale et récupérer
ainsi une copie à jour du Framework sans que celui si soit stocké sur votre
dépôt.

![](/img/tumblr_lhnyakN1Qg1qgcouj.png)

Votre projet sera maintenant à jour à chaque mise à jour et vous voilà
affranchis de toute maintenance sur vos sources externes.
