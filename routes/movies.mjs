import { Router } from "express";
import pool from "../db.mjs";

const router = Router();

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
  const { title, release_date, genre_id, director_id } = req.body;

  try {
    const [result] = await pool.query(
      `
      INSERT INTO movies (title, release_date, genre_id, director_id) 
      VALUES (?, ?, ?, ?)`,
      [title, release_date, genre_id, director_id]
    );
    res.status(201).json({
      id: result.insertId,
      title,
      release_date,
      genre_id,
      director_id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a movie by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, release_date, genre_id, director_id } = req.body;
  try {
    const [result] = await pool.query(
      `
      UPDATE movies 
      SET title = ?, release_date = ?, genre_id = ?, director_id = ? 
      WHERE id = ?`,
      [title, release_date, genre_id, director_id, id]
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
