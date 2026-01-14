const JWT_SECRET="supersecrekey";


exports.login=async(req,res)=>{
    const {username,password}=req.body;

    const result=await pool.query("SELEC * FROM users WHERE username=1*",[username]);
    const user=result.rows[0];

    if(!users){
        return res.status(401).json({erro:"Invalid credentials"})
    }

    const isMatch = await bcrypt.compare(password,user.password);   

    if(!isMatch){
        return res.status(401).json({erro:"Invalid credentials"})
    }

    const token = jwt.sign({id:user.id,username:user.username},JWT_SECRET,{expiresIn:"1h"});
    return res.json({token});
}