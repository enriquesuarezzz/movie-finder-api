import { Router } from "express";
import pool from "../db.mjs";

const router = Router();

// Validate director ID
const validateDirectorId = (id) => {
  return Number.isInteger(parseInt(id, 10)) && parseInt(id, 10) > 0;
};

// Validate director name
const validateDirectorName = (name) => {
  return typeof name === "string" && name.trim() !== "";
};

// Get all directors
router.get("/", async (req, res) => {
  try {
    const [directors] = await pool.query("SELECT * FROM directors");
    res.json(directors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a director by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!validateDirectorId(id)) {
    return res.status(400).json({ message: "Invalid director ID" });
  }

  try {
    const [director] = await pool.query(
      "SELECT * FROM directors WHERE id = ?",
      [id]
    );
    if (director.length === 0) {
      return res.status(404).json({ message: "Director not found" });
    }
    res.json(director[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new director
router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!validateDirectorName(name)) {
    return res.status(400).json({ message: "Invalid director name" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO directors (name) VALUES (?)",
      [name]
    );
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a director by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!validateDirectorId(id)) {
    return res.status(400).json({ message: "Invalid director ID" });
  }

  if (!validateDirectorName(name)) {
    return res.status(400).json({ message: "Invalid director name" });
  }

  try {
    const [result] = await pool.query(
      "UPDATE directors SET name = ? WHERE id = ?",
      [name, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Director not found" });
    }

    res.json({ message: "Director updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a director by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!validateDirectorId(id)) {
    return res.status(400).json({ message: "Invalid director ID" });
  }

  try {
    const [result] = await pool.query("DELETE FROM directors WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Director not found" });
    }

    res.status(200).json({ message: "Director deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
