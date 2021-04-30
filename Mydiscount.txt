
Nom du projet Mydiscount
Type : application  de e-commerce
Collabarateur : Robert Benjamin , Fawzi Bazari

Afin de lancer le projet voici les instructions détaillés:

-obtenez le projet au format zip ou via git et le placer dans un dossier , si vous utiliser git dans ce cas:
	-> git init
	-> git clone https://github.com/slasherbane/Mydiscount.git ( dans le dossier ou l'invite de commande est ouverte :) )

- une fois le projet télécharger entrer dans le dossier et effectuer les commandes via un terminal equipé de npm et/ou yarn:

	-> yarn construct ou npm construct

	ou à defaut l'enchainement de commandes suivante:
	-> npm install 
	-> ng build
  	-> ionic capacitor add android	 
	-> npx jetify
	-> npx cap sync

	-> ionic capacitor run android -l --external: Si cette commande vous demande l'adresse a utiliser choissez celle sur un port Ethernet
	-> A défaut d'android studio l'application peux etre lancer via la commande : ionic serve --lab


- Le projet va alors lancer, si il est installé , android studio.Une fois l'application ouverte veuillez exécuter le lancement 
de l'application via la flèche verte (ou run) apres que l'initialisation est eut lieu .L'application devrais donc avoir été recompiler par android studio 
si cela n'étais pas fais et enfin s'ouvrir. Vous arriverais donc sur la page de login.
les identifiant natif sont:

	-> test@email.fr
	-> fraise

Mais vous pouvez également en crée.

la navigation peut donc commencer :D

NOTES:

Dans le dossier Mydiscount du projet du même nom ce trouve le cahier des charges avec des documents annexes si vous souhaitez les lire afin d'apprécier
le comportement de l'application.