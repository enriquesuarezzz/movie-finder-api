import { Router } from "express";
import pool from "../db.mjs";

const router = Router();

// Get all genres
router.get("/", async (req, res) => {
  try {
    const [genres] = await pool.query("SELECT * FROM genres");
    res.json(genres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new genre
router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const [result] = await pool.query("INSERT INTO genres (name) VALUES (?)", [
      name,
    ]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
