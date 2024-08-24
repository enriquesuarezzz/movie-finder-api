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

export default router;
