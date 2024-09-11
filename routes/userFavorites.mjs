import { Router } from "express";
import pool from "../db.mjs";

const router = Router();

// Get all favorite movies for a user
router.get("/:userId", async (req, res) => {
  try {
    const [favorites] = await pool.query(
      `
      SELECT movies.* 
      FROM user_favorites 
      JOIN movies ON user_favorites.movie_id = movies.id 
      WHERE user_favorites.user_id = ?`,
      [req.params.userId]
    );
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a movie to user favorites
router.post("/", async (req, res) => {
  const { user_id, movie_id } = req.body;

  try {
    // Check if the movie is already in the user's favorites
    const [existing] = await pool.query(
      "SELECT * FROM user_favorites WHERE user_id = ? AND movie_id = ?",
      [user_id, movie_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Movie already in favorites" });
    }

    // Add the movie to the user's favorites
    await pool.query(
      "INSERT INTO user_favorites (user_id, movie_id) VALUES (?, ?)",
      [user_id, movie_id]
    );
    res.status(201).json({ message: "Movie added to favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove a movie from user favorites
router.delete("/", async (req, res) => {
  const { user_id, movie_id } = req.body;

  try {
    const [result] = await pool.query(
      "DELETE FROM user_favorites WHERE user_id = ? AND movie_id = ?",
      [user_id, movie_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Movie removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
