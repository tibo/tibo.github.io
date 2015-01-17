---
layout: post
title: Installation de mod_python pour Apache sous Mac OS X.4
---
Bataille d'une soirée, j'ai passé pas mal de temps avant de réussir à faire
redémarré mon Apache avec le chargement du module python.

L'erreur est pourtant simple:

~~~
mod_python.so: mach-o, but wrong architecture
~~~

Curieusement, il m'a alors fallu compiler un mod_python compatible avec toutes
les architectures suportées par OS X (alors que je n'ai que des machines
intel…)

Attention, pré-requis: vous devez avoir "gcc" et "make" installé sur votre
machine. Si ce n'est pas le cas, installez les xcodestools.

Voici alors comment précéder:

-Tout d'abord, récupérez les dernières sources de mod_python sur [le site du projet apache](http://www.apache.org/dist/httpd/modpython/) Actuellement, la dernière version étant la 3.3.1, l'url compléte des sources sera: [http://www.apache.org/dist/httpd/modpython/mod_python-3.3.1.tgz](http://www.apache.org/dist/httpd/modpython/mod_python-3.3.1.tgz) (utilisez wget si vous l'avez installé!)

-Ouvrez un terminal est localisez l'endroit où ses sources ont été téléchargées (certainemant dans ~/Downloads)

-Décompressez l'archive:

~~~
% tar xvf mod_python-X.Y.Z.tgz
~~~

(notez que le X.Y.Z correspond à votre version) et entrez dans le dossier:

~~~
% cd mod_python-X.Y.Z
~~~

-Commençons par configurer les sources en précisant l'emplacement d'[apxs](http://httpd.apache.org/docs/2.2/programs/apxs.html)

~~~
% ./configure --with-apxs=/usr/sbin/apxs
~~~

Laissons la machine mouliner et si tout ce passe bien elle devrai nous créer
les bons Makefile.

C'est là que ça se complique puisque nous allons modifier directement le
Makefile pour lui préciser les architectures à utiliser:

-Ouvrez donc le fichier src/MakeFile avec votre éditeur de text favori (vi est le mien!)

-Reperez la ligne LDFLAGS et ajoutez en fin de ligne:

~~~
-arch x86_64 -arch ppc -arch i386
~~~

Pour obtenir quelque chose du genre:

~~~
LDFLAGS= -Wl,-framework,Python -u _PyMac_Error -framework Python -Wl,-F.
-arch x86_64 -arch ppc -arch i386
~~~

-Interessez vous maintenant à la ligne CFLAGS et ajoutez lui, en fin de ligne encore une fois:

~~~
-arch x86_64 -arch ppc -arch i386
~~~

Vous obtiendrez alors quelque chose qui ressemblera à ceci:

~~~
CFLAGS=$(OPT) $(INCLUDES) -arch x86_64 -arch ppc -arch i386
~~~

-Enfin dans la section "mod_python.so: $(SRCS)" (un peu plus bas), ajoutez les options:

~~~
-Wc,"-arch x86_64" -Wc,"-arch ppc" -Wc,"-arch i386"
~~~

après l'option -c de la ligne

~~~
$(APXS) $(INCLUDES) -c $(SRCS) $(LDFLAGS) $(LIBS)
~~~

pour obtenir un résultat proche de celui-ci:

~~~
$(APXS) $(INCLUDES) -c -Wc,"-arch x86_64" -Wc,"-arch ppc" -Wc,"-arch i386"
$(SRCS) $(LDFLAGS) $(LIBS)
~~~

-Enregistrez vous modifications et quittez l'éditeur de texte pour revenir dans le dossier principal des sources.

Passons maintenant à la compilation de ce fameu module:

-Un petit

~~~
make
~~~

suvit d'un

~~~
sudo make install
~~~

devrai faire apparaitre un module nommé "mod_python.so" dans le dossier
/usr/libexec/apache2

-Pour plus d'information sur notre module:

~~~
% file mod_python.so mod_python.so: Mach-O universal binary with 3
architectures mod_python.so (for architecture x86_64): Mach-O 64-bit bundle
x86_64 mod_python.so (for architecture ppc7400): Mach-O bundle ppc
mod_python.so (for architecture i386): Mach-O bundle i386
~~~

Enfin pour finir, activons le module dans Apache et voyons le résultat:

-Editez le fichier /etc/apache2/httpd.conf avec les droits administrateur et ajoutez la ligne

~~~
LoadModule python_module libexec/apache2/mod_python.so
~~~

(proprement parmi les autres LoadModule)

-Enfin pour tester le tout, ajoutez ces lignes à la toute fin du fichier:

~~~
<Location /mpinfo> SetHandler mod_python PythonInterpreter main_interpreter
PythonHandler mod_python.testhandler </Location>
~~~

-Sauvegardez les modification, quittez l'éditeur de texte et relancez apache:

~~~
apachectl -k restart
~~~

Le final: Connectez vous maintenant à l'adresse
[http://localhost/mpinfo](http://localhost/mpinfo) et vous remarquerez que
votre serveur fonctionne bien avec les extensions python :)