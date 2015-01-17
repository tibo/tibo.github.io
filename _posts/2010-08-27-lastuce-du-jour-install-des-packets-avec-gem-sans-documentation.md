---
layout: post
title: 'L''astuce du jour: install des packets avec Gem sans documentation'
---
Pour gagner du temps, de la place, du débit… et tout ce que vous voulez, il
n'est pas souvent utile d'installer la documentation ri (documentation en
ligne de commande) et/ou rdoc (documentation aux "normes" ruby) qui accompagne
les packets gems déployé sur un serveur de prod.

On va donc pouvoir installer notre packet de la manier suivante (ici rails en
exemple):

$ gem install rails --no-rdoc --no-ri

my 2 cents…
