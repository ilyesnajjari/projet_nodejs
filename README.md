# Projet - NodeJS

## Introduction

Ce projet vise à développer une application de discussion instantanée s'appuyant sur les WebSockets.

## Auteurs

- [CHAPTAL Lilian](https://devops.telecomste.fr/chaptal.lilian).
- [NAJJARI Ilyes](https://devops.telecomste.fr/najjari.ilyes).

## Fonctionnalités opérationnelles

1. L'utilisateur doit pouvoir choisir son avatar parmi ceux proposés.

2. L'utilisateur doit aussi pouvoir entrer le pseudo qu'il souhaite pour ensuite pouvoir accèder au chat.

3. L'utilisateur doit pouvoir envoyer des messages à tout le monde, qu'il peut, lui aussi, voir.

4. Lorsqu'un utilisateur est en train d'écrire, les autres le voit.

5. L'utilisateur doit pouvoir voir quels sont les utilisateurs en ligne sur le chat.

6. L'utilisateur doit pouvoir envoyer des messages privés à d'autres utilisateurs en ligne en cliquant sur leur pseudo.

7. L'utilisateur doit pouvoir créer des channels, les rejoindre et les voir dans une liste (fonctionnalité bancale, pas terminée).

## Installation

1. **Cloner le projet :**
   ```bash
   git clone https://devops.telecomste.fr/chaptal.lilian/projet_nodejs.git
   cd projet_nodejs
   ```
   
2. **Installer les dépendances :**
   ```bash
   npm install
   ```

## Utilisation

1. **Démarrer le serveur :**
   ```bash
   node ./index.js
   ```

2. **Accès :**
   accèdez à l'application dans votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000).

## Licence

Ce projet, qui inclut l'utilisation de Socket.IO, est sous licence MIT.
