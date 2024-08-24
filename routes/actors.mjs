import { Router } from "express";
import pool from "../db.mjs";

const router = Router();

// Get all actors
router.get("/", async (req, res) => {
  try {
    const [actors] = await pool.query("SELECT * FROM actors");
    res.json(actors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new actor
router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const [result] = await pool.query("INSERT INTO actors (name) VALUES (?)", [
      name,
    ]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
