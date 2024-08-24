# Movie Finder API

This is a RESTful API built with Node.js and Express for managing a movie database. The API allows you to perform CRUD operations on movies, directors, genres, actors, and user favorites.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/movie-finder-api.git
  ```

2. Navigate to the project directory:
   
 ```bash
   cd movie-finder-api
 ```

3. Navigate to the project directory:
   
 ```bash
   npm install
 ```

## Environment Variables

Create a .env file in the root of your project and add the following environment variables:

    PORT=5000
    DB_HOST=your-database-host
    DB_USER=your-database-username
    DB_PASSWORD=your-database-password
    DB_NAME=your-database-name
Replace your-database-host, your-database-username, your-database-password, and your-database-name with your actual database credentials.

## Usage
To start the server, run:
```bash
   node app.mjs
 ```
By default, the server will run on http://localhost:5000.


API Endpoints
Here are the main endpoints provided by the API:

    Movies
    GET /api/movies - Get all movies
    GET /api/movies/:id - Get a single movie by ID
    POST /api/movies - Create a new movie
    PUT /api/movies/:id - Update a movie by ID
    DELETE /api/movies/:id - Delete a movie by ID
    Genres
    GET /api/genres - Get all genres
    GET /api/genres/:id - Get a single genre by ID
    POST /api/genres - Create a new genre
    PUT /api/genres/:id - Update a genre by ID
    DELETE /api/genres/:id - Delete a genre by ID
    Directors
    GET /api/directors - Get all directors
    GET /api/directors/:id - Get a single director by ID
    POST /api/directors - Create a new director
    PUT /api/directors/:id - Update a director by ID
    DELETE /api/directors/:id - Delete a director by ID
    Actors
    GET /api/actors - Get all actors
    GET /api/actors/:id - Get a single actor by ID
    POST /api/actors - Create a new actor
    PUT /api/actors/:id - Update an actor by ID
    DELETE /api/actors/:id - Delete an actor by ID
    User Favorites
    GET /api/userFavorites - Get all user favorites
    GET /api/userFavorites/:id - Get a single user favorite by ID
    POST /api/userFavorites - Add a movie to user favorites
    DELETE /api/userFavorites/:id - Remove a movie from user favorites
    Dependencies
    Node.js - JavaScript runtime
    Express - Web framework for Node.js
    MySQL2 - MySQL client for Node.js with promises
    dotenv - Loads environment variables from a .env file
    cors - Enables Cross-Origin Resource Sharing (CORS)
