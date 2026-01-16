const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const {login,signup}=require("./auth/authController");
const { requireAuth } = require("./auth/authMiddleware");

app.post("/api/login",login)
app.post("/api/validate",requireAuth)
app.post("/api/signup",signup)



const PORT=5000;
app.listen(PORT,()=>{console.log('Server running on port ${PORT}')
})