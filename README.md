# EurostarStarWatsFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Also you can run it with `npm start`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Code Structure

The project has a main component Contestant with the table of all contestants and several dialog components to manage the Contestant list (add, edit and delete contetants).

## Functionalities

The table is sortable and is paginated to better access its data.
Also you can find a filter to filter in any table field.
The characters are taken from SWAPI API, and the contestants appear sorted by last name when first open the page.

## Authentication performed with Firebase

The project needs authentication by mail or by Google account, one verified the mail, the user can access the main page in which the contestants can be managed.

