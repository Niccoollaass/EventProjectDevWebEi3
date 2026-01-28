const  pool  = require("../db");

async function seed() {
  try {
    console.log("pool =", pool);

    await pool.query(
      `INSERT INTO event_people (event_id,user_id)
       VALUES ($1, $2)`,
      [
        "17",
        "18"
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