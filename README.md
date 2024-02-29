# Star Wars Card Battle Game

## Project Description

"Star Wars Card Battle Game" is an interactive web application that allows users to engage in a fun and unique card game based on the Star Wars universe. The game utilizes the Star Wars API (SWAPI) to fetch random characters or starships and compares their attributes to determine a winner.

## Technologies Used

The project was created using the following technologies:

- **Angular**: A powerful framework for building web applications.
- **RxJS**: A library for handling data streams and asynchronous programming.
- **NgRx**: A library for state management in Angular.
- **TypeScript**: A programming language that adds static types to JavaScript.
- **Angular Material**: A UI component library that implements Material Design principles.

## Features

- **Random Selection**: The app fetches random characters or starships from the SWAPI and displays their details.
- **Attribute Comparison**: The game compares attributes (mass for characters, crew for starships) to determine a winner.
- **Replay Option**: Users can play again using an action button that repeats the same request.

## Installation Instructions

1. Clone the repository into a local directory.
2. Install project dependencies with the command `npm install`.
3. Start the development server with the command `npm start`.

## Game Instructions

1. The app displays two random cards (characters or starships) with their attributes.
2. The game automatically declares a winner based on the higher common attribute.
3. Users can play again using the replay option.

## Authors and License

The project was created by (Damian Pasterz).

The code is available under the MIT license.

## Additional Information

- **SWAPI**: The game uses the Star Wars API (SWAPI) to fetch data. Visit [https://www.swapi.tech/](https://www.swapi.tech/) for more information.
- **Angular Material Card**: The game utilizes Angular Material's card component to display the details of characters or starships. Visit [https://material.angular.io/components/card](https://material.angular.io/components/card) for more details.
- **Testing**: The project includes unit and end-to-end tests to ensure best practices and code quality.
