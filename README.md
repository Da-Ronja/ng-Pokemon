# NgPokemon
A SPA built using Angular Framework to collect and manage Pokémon. Styled using Tailwindcss

## Features
- Landing Page: Login page where the user can enter their Trainer name. The name will be saved to the Trainer API and in session storage. The app will then redirect to the Pokémon Catalogue page.
- Trainer Page: Displays the list of Pokémon that the trainer has collected, with the Pokémon name and image. The user can also remove a Pokémon from their collection.
- Pokémon Catalogue Page: Displays the list of Pokémon names and avatars where trainer is able to catch pokemon´s. Store the Pokémon data in session storage to reduce API calls.

## Requirements
- Figma
- NPM/Node.js (LTS – Long Term Support version)
- Angular CLI
- Visual Studio Code Text Editor/IntelliJ
- Browser Developer Tools for testing and debugging (Angular Dev Tools)
- Git
- Trainer API: https://github.com/dewald-els/noroff-assignment-api

## Resources
Pokémon images: https://pokeapi.co/api/v2/pokemon?limit=100&offset=0

##

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
