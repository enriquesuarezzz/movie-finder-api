import { Router } from "express";
import pool from "../db.mjs";
import { isValidDate, isValidURL, isPositiveNumber } from "../validators.mjs";

const router = Router();

// Function to validate movie fields
const validateMovie = (movie) => {
  const {
    title,
    release_date,
    genre_id,
    director_id,
    poster_url,
    description,
  } = movie;

  if (typeof title !== "string" || title.trim() === "") {
    return "Title is required and must be a non-empty string";
  }

  if (!isValidDate(release_date)) {
    return "Release date must be in the format YYYY-MM-DD";
  }

  if (!isPositiveNumber(genre_id)) {
    return "Genre ID must be a positive number";
  }

  if (!isPositiveNumber(director_id)) {
    return "Director ID must be a positive number";
  }

  if (!isValidURL(poster_url)) {
    return "Poster URL must be a valid URL";
  }

  return null; // No validation errors
};
// Search movies by title
router.get("/search", async (req, res) => {
  const query = req.query.query;

  if (typeof query !== "string" || query.trim() === "") {
    return res
      .status(400)
      .json({ message: "Valid query parameter is required" });
  }

  try {
    const [movies] = await pool.query(
      "SELECT * FROM movies WHERE title LIKE ?",
      [`%${query.trim()}%`]
    );

    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get all movies
router.get("/", async (req, res) => {
  try {
    const [movies] = await pool.query(`
      SELECT movies.*, genres.name as genre, directors.name as director 
      FROM movies
      LEFT JOIN genres ON movies.genre_id = genres.id
      LEFT JOIN directors ON movies.director_id = directors.id
    `);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a movie by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [movie] = await pool.query(
      `
      SELECT movies.*, genres.name as genre, directors.name as director 
      FROM movies
      LEFT JOIN genres ON movies.genre_id = genres.id
      LEFT JOIN directors ON movies.director_id = directors.id
      WHERE movies.id = ?`,
      [id]
    );
    if (movie.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new movie
router.post("/", async (req, res) => {
  const movie = req.body;
  const validationError = validateMovie(movie);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const {
    title,
    release_date,
    genre_id,
    director_id,
    poster_url,
    description,
  } = movie;

  try {
    const [result] = await pool.query(
      `
      INSERT INTO movies (title, release_date, genre_id, director_id, poster_url, description) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [title, release_date, genre_id, director_id, poster_url, description]
    );
    res.status(201).json({
      id: result.insertId,
      title,
      release_date,
      genre_id,
      director_id,
      poster_url,
      description,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a movie by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = req.body;
  const validationError = validateMovie(movie);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const {
    title,
    release_date,
    genre_id,
    director_id,
    poster_url,
    description,
  } = movie;

  try {
    const [result] = await pool.query(
      `
      UPDATE movies 
      SET title = ?, release_date = ?, genre_id = ?, director_id = ?, poster_url = ?, description = ? 
      WHERE id = ?`,
      [title, release_date, genre_id, director_id, poster_url, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a movie by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(`DELETE FROM movies WHERE id = ?`, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
