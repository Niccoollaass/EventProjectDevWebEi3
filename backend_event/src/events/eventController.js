const pool = require("../../db");

exports.createevent = async (req, res) => {
  try {
    const { name, event_date, description, people_max } = req.body;

    const creator_id = req.user.id;

    if (!name || !event_date || !description || people_max == null) {
      return res.status(400).json({ error: "Missing fields",received : req.body });
      
    }

    const result = await pool.query(
      `INSERT INTO events (name, event_date, creator_id, description, people_max)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, event_date, creator_id, description, people_max]
    );

    return res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("create event error:", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT e.id, e.name, e.event_date, e.description, e.people_max,
              u.username AS creator
       FROM events e
       JOIN users u ON u.id = e.creator_id
       ORDER BY e.event_date ASC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("get events error:", err);
    res.status(500).json({ error: err.message });
  }
};