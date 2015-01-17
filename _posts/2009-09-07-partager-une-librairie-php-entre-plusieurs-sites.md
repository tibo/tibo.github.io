---
layout: post
title: Partager une librairie PHP entre plusieurs sites
---
Sur un serveur en production, il peut nous arriver d’avoir plusieurs sites qui
utilisent le même framework, ou le même fichier de configuration. De la même
manière, les framework, comme dans mon cas Zend Framework, évoluent très
rapidement et il peux être utile de gérer plusieurs versions sur le même
serveur. Dans tous les cas, cette manipulation vous fera économiser de la
place et facilitera vos mises à jours.

Commençons alors par placer dans un répertoire le ou les framework ainsi que
les versions qui nous intéressent et incluons ce répertoire dans la
configuration de php (votre fichier php.ini). Recherchez la ligne contenant la
directive “include_path”. Celle si est commentée par défaut à l’aide d’un
point-virgule (;). Elle décrit les différents répertoires contenant des
fichiers sur lesquels nous voulons faire des include(). Décommentez alors la
ligne en supprimant le point-virgule et adapter la description du chemin en
fonction de l’endroit où vous avez placer vos librairies. Dans mon cas, cela
donne:

~~~
include_path = “.:/var/www/library”
~~~

Pensez à conserver le “.” dans la liste des chemins à inclure afin de pouvoir
inclure un fichier localement dans vos différentes applications php et
redémarrez votre serveur http.

Dans le cas où nous avons plusieurs versions, il peut aussi être intéressant
de simplifier le chemin d’accès à la dernière version stable. On peux alors
utilise de manière toute simple utiliser les liens virtuels unix:

~~~
$ ln -s Zend_1.9.2 Zend
~~~

Pensez également à régler vos droits sur vos librairies:

~~~
# chown -R www-data:www-data /var/www/library
~~~

![](/img/tumblr_lhnz30P7PC1qgcouj.png)

Enfin, voyons comment nous allons pouvoir utiliser cette librairie partagée
coté applications. Je reprend alors mon exemple de Zend et le fichier
bootstrap dans lequel nous avions l’habitude de re-écrire le path d’include de
php (ici Zend se trouvais dans le ./library et ./application/models/ contient
les modèles de notre application MVC):

~~~
set_include_path(‘.’ . PATH_SEPARATOR . ‘./library’ . PATH_SEPARATOR .
‘./application/models/’ . PATH_SEPARATOR . get_include_path());
~~~

Le path contenant le Zend Framework étant maintenant inclue par le
“get_include_path()” nous pouvons supprimer le ./library des répertoires
inclus.

Ensuite nous appelions notre framework avec la ligne:

~~~
require_once ‘Zend/Loader/Autoloader.php’;
~~~

Si vous avez suivit toutes les indications précédente et que vous laissez la
ligne telle quelle, le site chargera ici la version courante de Zend Framework
que j’ai décrit tout à l’heure par le lien logique unix. C’est ici que ça
deviens intéressant et que nous pouvons préciser la version de Zend à
utiliser.

Selon la manière donc vous avez nommé vos répertoires (dans mon cas Zend_x.y.z
ou x.y.z correspond à la version du framework), vous pouvez alors appeler par
exemple une version 1.6.2 de Zend dans une ancienne application.

~~~
require_once ‘Zend_1.6.2/Loader/Autoloader.php’;
~~~

Libre à vous d’adapter tout cela à vos propres conventions de nommage et de
rangement.
