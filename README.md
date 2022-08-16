AU cas ou la connection a la base de donnée ne fontionne pas, il faut configurer les info
sur mongoDB Atlas. et ajouter les informations de bd dans le fichier ".env" ou directement dans connection.js

.env file {
SECRET_KEY='XXXXX'
MONGO_USER='XXXXX'
MONGO_PASS='XXXXX'
}
-------------

Installation du projet
$ cd <project-path>

//installation des packages
$ npm install

//lancement du serveur backend
$ npm run start

