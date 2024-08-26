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

// Get actor by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [actor] = await pool.query(
      `
      SELECT * FROM actors
      WHERE id = ?`,
      [id]
    );
    if (actor.length === 0) {
      return res.status(404).json({ message: "Actor not found" });
    }

    res.json(actor[0]);
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

// Update actor by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const [result] = await pool.query(
      `
      UPDATE actors 
      SET name = ? 
      WHERE id = ?`,
      [name, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Actor not found" });
    }

    res.json({ message: "Actor updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//delete actor by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(`DELETE FROM actors WHERE id = ?`, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Actor not found" });
    }

    res.status(200).json({ message: "Actor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
