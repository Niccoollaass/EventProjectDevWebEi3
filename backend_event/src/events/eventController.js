const pool = require("../../db");

exports.createEvent = async (req, res) => {
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
      `SELECT e.id,
              e.name,
              e.event_date,
              e.description,
              e.people_max,
              e.creator_id,
              u.username AS creator_username,
              COUNT(ep.user_id)::int AS nb_participants
       FROM events e
       JOIN users u ON u.id = e.creator_id
       LEFT JOIN event_people ep ON ep.event_id = e.id
       GROUP BY e.id, e.name, e.event_date, e.description, e.people_max, e.creator_id, u.username
       ORDER BY e.event_date ASC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("get events error:", err);
    res.status(500).json({ error: err.message });
  }
};
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing event id" });
    }

    await pool.query(
      `DELETE FROM events WHERE id = $1`,
      [id]
    );

    return res.status(204).send();

  } catch (err) {
    console.error("delete event error:", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.modifyEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, event_date, description, people_max } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Missing event id" });
    }

    if (!name || !event_date || !description || people_max == null) {
      return res.status(400).json({
        error: "Missing fields",
        received: req.body
      });
    }

    const result = await pool.query(
      `UPDATE events
       SET name = $1,
           event_date = $2,
           description = $3,
           people_max = $4
       WHERE id = $5
       RETURNING *`,
      [name, event_date, description, people_max, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    return res.json(result.rows[0]);

  } catch (err) {
    console.error("modify event error:", err);
    return res.status(500).json({ error: err.message });
  }
};
exports.register = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;

    if (!eventId) {
      return res.status(400).json({ error: "Missing event id" });
    }

    await pool.query(
      `INSERT INTO event_people (event_id, user_id)
       VALUES ($1, $2)`,
      [eventId, userId]
    );

    return res.status(201).send();

  } catch (err) {
    console.error("register error:", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.unRegister = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;

    if (!eventId) {
      return res.status(400).json({ error: "Missing event id" });
    }

    await pool.query(
      `DELETE FROM event_people
       WHERE event_id = $1 AND user_id = $2`,
      [eventId, userId]
    );

    return res.status(204).send();

  } catch (err) {
    console.error("unregister error:", err);
    return res.status(500).json({ error: err.message });
  }
};
exports.myRegistrations = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT event_id
       FROM event_people
       WHERE user_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("getMyRegistrations error:", err);
    res.status(500).json({ error: err.message });
  }
};
