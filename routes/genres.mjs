import { Router } from "express";
import pool from "../db.mjs";

const router = Router();

// Validate genre ID
const validateGenreId = (id) => {
  return Number.isInteger(parseInt(id, 10)) && parseInt(id, 10) > 0;
};

// Validate genre name
const validateGenreName = (name) => {
  return typeof name === "string" && name.trim() !== "";
};

// Get all genres
router.get("/", async (req, res) => {
  try {
    const [genres] = await pool.query("SELECT * FROM genres");
    res.json(genres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a genre by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!validateGenreId(id)) {
    return res.status(400).json({ message: "Invalid genre ID" });
  }

  try {
    const [genre] = await pool.query("SELECT * FROM genres WHERE id = ?", [id]);
    if (genre.length === 0) {
      return res.status(404).json({ message: "Genre not found" });
    }
    res.json(genre[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new genre
router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!validateGenreName(name)) {
    return res.status(400).json({ message: "Invalid genre name" });
  }

  try {
    const [result] = await pool.query("INSERT INTO genres (name) VALUES (?)", [
      name,
    ]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a genre by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!validateGenreId(id)) {
    return res.status(400).json({ message: "Invalid genre ID" });
  }

  if (!validateGenreName(name)) {
    return res.status(400).json({ message: "Invalid genre name" });
  }

  try {
    const [result] = await pool.query(
      "UPDATE genres SET name = ? WHERE id = ?",
      [name, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Genre not found" });
    }

    res.json({ message: "Genre updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a genre by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!validateGenreId(id)) {
    return res.status(400).json({ message: "Invalid genre ID" });
  }

  try {
    const [result] = await pool.query("DELETE FROM genres WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Genre not found" });
    }

    res.status(200).json({ message: "Genre deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
