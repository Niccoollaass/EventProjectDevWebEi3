const JWT_SECRET="supersecretkey";

const jwt        = require("jsonwebtoken");


exports.requireAuth=(req,res,next)=>{
    const authHeader=req.header("Authorization");
    if(!authHeader){
        return res.status(401).json({error:"No token provided"});
    }
    const token = authHeader.replace("Bearer", "").trim();

try{
    const decoded=jwt.verify(token,JWT_SECRET);
    req.user=decoded;
    next();
}
catch (err) {
  return res.status(401).json({ error: "Token invalid", detail: err.message });
}


}


