---
layout: post
title: Redmine sous Apache avec Passenger
---
Cet article est le premier d’une série d’article sur l’outil de gestion de
projet Redmine.

Ce puissant outil disponible sous la forme d’une interface web permet de gérer
les projets de développements en intégrant des roadmap, la gestion des bugs,
des demandes dévolutions, un tracker de versionning, un wiki, le tout avec une
gestion des droits complète.

Dans cet article nous verrons comment installer Redmine sur un serveur Linux
(Debian dans notre cas) en utilisant Apache comme serveur d’application grâce
au module “Passenger” qui permet à Apache d’interpréter Ruby on Rails.

Comme d’habitude cet article décrit une suite de manipulations liée à des
versions précises. A vous d’adapter vos numéro de versions en fonction des
évolutions à venir.

Pour Commencer nous allons installer Apache 2 MySQL 5.0 et d’autres paquets
qui nous seront nécessaires.

~~~
# aptitude install apache2 mysql-server apache2-prefork-dev libaprutil1-dev
libaprutil1-dev libmysqlclient15-dev gcc make subversion
~~~

Pensez également à activer le mod_rewrite d’Apache dès maintenant

~~~
# a2enmod rewrite
~~~

Nous pouvons maintenant installé les près requis lié plus précisément à notre
application à savoir Ruby, l’interpréteur, gems le gestionnaire de paquets et
d’autres librairies nécessaire pour l’installation de Redmine. commençons donc
par Ruby et les librairies disponibles par aptitude.

~~~
# aptitude install ruby rdoc irb libyaml-ruby ruby1.8-dev libzlib-ruby ri
libopenssl-ruby1.8
~~~

Passons ensuite à l’installation de gems

~~~
# wget http://rubyforge.org/frs/download.php/60718/rubygems-1.3.5.tgz
# tar xvf rubygems-1.3.5.tgz 
# cd rubygems-1.3.5 
# ruby setup.rb 
# ln -s /usr/bin/gem1.8 /usr/bin/gem
~~~

Pensez également à mettre à jour les paquets et les dépots de Gems

~~~
# gem update && gem update —system
~~~

Installons aussi le support de MySQL pour Ruby

~~~
# gem install mysql
~~~

Et nous pouvons maintenant passer aux choses sérieuses et installer Rails en
version 2.3.5 comme le recommande Redmine.

~~~
# gem install rails -v=2.3.5
~~~

Nous aurons également besoin du support imagemagick pour la génération des
diagrammes de Gantt:

~~~
# aptitude install imagemagick libmagick9-dev librmagick-ruby1.8 #gem install
rmagick
~~~

Passons maintenant à l’installation de passenger et à la compilation du module
passenger pour apache2

~~~
# gem install passenger #/usr/lib/ruby/gems/1.8/gems/passenger-2.2.9/bin
/passenger-install-apache2-module
~~~

Ajoutons le à la configuration d’Apache: Créez un fichier /etc/apache2/mods-
available/passenger.load et insérez-y la ligne:

~~~
LoadModule passenger_module
/usr/lib/ruby/gems/1.8/gems/passenger-2.2.9/ext/apache2/mod_passenger.so
~~~

Créez également un fichier /etc/apache2/mods-available/passenger.conf et
placez-y les deux lignes suivantes:

~~~
PassengerRoot /usr/lib/ruby/gems/1.8/gems/passenger-2.2.9 PassengerRuby
/usr/bin/ruby1.8
~~~

Enfin Activez le module:

~~~
# a2enmod passenger
~~~

Maintenant que tous nos pré-requis sont en place, nous pouvons passez à
Redmine Commencez par créer un utilisateur et une base de donnée MySQL:

~~~
mysql -u root -p mysql> create database redmine character set utf8; mysql>
create user ‘redmine’@’localhost’ identified by ‘my_password’; mysql> grant
all privileges on redmine.* to ‘redmine’@’localhost’; mysql> exit
~~~

Plaçons nous ensuite dans le dossier où nous voulons installer Redmine (/var
dans mon cas) et récupérons la dernière version de Redmine depuis le dépôt
officiel:

~~~
# cd /var
~~~

~~~
# svn co http://redmine.rubyforge.org/svn/branches/0.9-stable/ redmine
# cd redmine 
~~~

Il est temps maintenant de mettre en place la configuration de la base de
donnée créez un fichier config/database.yml et entrez-y la configuration comme
ceci en adaptant à ce que vous avez entrez lors de la création de
l’utilisateur et de la base dans mysql:

~~~
production:
	adapter: mysql
	database: redmine
	host: localhost
	username: redmine
	password: my_password
	encoding: utf8
~~~

Profitons en également pour configurer le serveur d’envois de mails en créant
le fichier config/email.yml (ici ma configuration tape directement en local
par la commande  ”sendmail” sans passer par un socket):

~~~
production:
	delivery_method: :sendmail
	smtp_settings:
	address: localhost
	port: 25
	domain: lelevier.fr
~~~

Nous pouvons enfin passer à l’installation de Redmine en générant l’espace de
stockage des sessions, en créant la base de donnée, et enfin en installant la
configuration par défaut (utilisateurs, rôles, trackers… recommandé par
Redmine):

~~~
# rake generate_session_store
# RAILS_ENV=production rake db:migrate
# RAILS_ENV=production rake redmine:load_default_data
~~~

Il ne vous reste plus qu’a configurer votre VirtualHost Apache comme n’importe
quel virtual host en faisant pointer votre DocumentRoot vers le dossier
“public” de Redmine.

~~~
<VirtualHost *:80>
	ServerAdmin thibaut@my-test.com
	ServerName dev.my-test.com
	DocumentRoot /var/www/redmine/public/
</VirtualHost>
~~~
