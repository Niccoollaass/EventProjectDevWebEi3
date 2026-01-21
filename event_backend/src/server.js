const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const {login,signup,me}=require("./auth/authController");
const { requireAuth } = require("./auth/authMiddleware");

app.post("/api/login",login)
app.get("/api/me",requireAuth,me)
app.post("/api/signup",signup)



const PORT=5000;
app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)
})