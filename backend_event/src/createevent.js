const  pool  = require("../db");

async function seed() {
  try {
    console.log("pool =", pool);

    await pool.query(
      `INSERT INTO events (name, event_date, creator_id, description, people_max)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        "Soirée test",
        "2026-01-22 20:00:00", // ou new Date().toISOString()
        "user",
        "Event créé par seed",
        50
      ]
    );

    console.log("Event inserted : OK");
  } catch (err) {
    console.error("Seed event failed:", err);
    process.exit(1);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

seed();