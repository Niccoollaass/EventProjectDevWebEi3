const pool       = require("../../db");


const JWT_SECRET="supersecretkey";


exports.createevent=async(req,res)=>{
    try{
    const {username,password}=req.body;

    const result=await pool.query("SELECT id FROM users WHERE username=$1",[username]);
    const user=result.rows[0];

    if(result.rows.length>0){
        return res.status(409).json({error:"Invalid credentials"})
    }

    const hash = await bcrypt.hash(password,10);

    const insert =await pool.query("INSERT INTO users (username,password) VALUES($1,$2) RETURNING id, username",[username,hash]);  
    return res.status(201).json({ user: insert.rows[0] });

    }
    catch (err) {
    console.error("signup error:", err); // <= affiche l'erreur exacte
    // optionnel: gérer le cas unique violation
    if (err.code === "23505") {
      return res.status(409).json({ error: "Username already exists" });
    }
    return res.status(500).json({ error: err.message });
  }
}
  