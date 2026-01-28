const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const {login,signup,me}=require("./auth/authController");
const { requireAuth } = require("./auth/authMiddleware");
const { createEvent, 
    getEvents,
    getEvent, 
    deleteEvent,
    modifyEvent, 
    register,
    unRegister,
    myRegistrations
 } = require("./events/eventController");

app.post("/api/login",login)
app.get("/api/me",requireAuth,me)
app.post("/api/signup",signup)
app.get("/api/me/registrations",requireAuth,myRegistrations)

app.post("/api/events", requireAuth, createEvent);
app.get("/api/events",getEvents)
app.delete("/api/events/:id",requireAuth,deleteEvent)
app.put("/api/events/:id",requireAuth,modifyEvent)

app.post("/api/events/:id/register",requireAuth,register)
app.delete("/api/events/:id/register",requireAuth,unRegister)





const PORT=5000;
app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)
})