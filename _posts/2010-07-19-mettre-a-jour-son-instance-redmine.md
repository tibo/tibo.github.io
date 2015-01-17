---
layout: post
title: Mettre à jour son instance Redmine
---
Aujourd'hui est un grand jour pour le projet Redmine, la sortie de la première
release candidate: Redmine version 1.0

Depuis 6 semaines la priorité est aux corrections de bugs et les évolutions
sont mises de coté.

Voici donc l'occasion de parler mise à jour!

Partons donc du principe que nous avons une instance de Redmine fonctionnelle.

La manière dont celle si a été installé importe peu puisque nous allons ici
repartir sur une version propre fraichement récupérée sur le SVN officiel.

Commencez donc par vous placer dans le dossier où vous souhaitez faire votre
installation et faite un checkout sur le dépôt officiel: [http://redmine.rubyf
orge.org/svn/branches/1.0-stable/](http://redmine.rubyforge.org/svn/branches/1
.0-stable/)

Placez vous ensuite dans le dossier contenant votre nouvelle instance de
redmine . Copiez les fichiers de configuration depuis votre ancienne instance
(database.yml pour la configuration des bases de données, et email.yml pour
les mails sortants) dans le dossier config/. Copiez également le dossier
/files de votre instance d'origine afin de conserver les fichiers joints à vos
projets. Copiez vos plugins dans le dossier vendor/plugins/. Et enfin copiez
votre thème dans le dossier public/themes/.

Passons maintenance à l'execution des script rake qui vont nous permettre de
mettre à jour la base de données et la configuration de Redmine.

Placez vous à nouveau à la racine de votre instance et commencez par recréer
l'espace de session:

> rake generate_session_store

Effectuez ensuite la configuration des plugins que vous avez copié tout à
l'heure (note: production est le nom de notre instance de production):

> rake db:migrate:upgrade_plugin_migrations RAILS_ENV=production

Et enfin, migrez la base de données vers cette nouvelle version de Redmine
(encore une fois production est le nom de notre instance):

> rake db:migrate_plugins RAILS_ENV=production

Voici donc votre instance à jour et, si vous avez suivi cet article à la
lettre, en version stable.

Quelques petites choses à vérifiez tout de même:

  * Si vous ressentez des lenteurs à l'exécution ou que vous remarquez des problèmes d'affichage de l'interface: nettoyez le cache 

> rake tmp:cache:clear

  * Si vos utilisateurs ne peuvent plus se logguer, ou accéder à certaines parties de Redmine: forcez la suppression des sessions en cours 

> rake tmp:sessions:clear

  * Pensez également à faire un tour dans la partie "rôles et permissions" de Redmine pour vérifier les autorisations sur de nouvelles fonctionnalités qui pourraient ne pas être prise en compte dans les rôles que vous aviez créé
  * Et enfin, chose importante, pensez à vérifier les droit posix sur les fichiers de votre instance, sans quoi vous ne pourrez utiliser certaines fonctionnalités (l'upload de fichier par exemple)
