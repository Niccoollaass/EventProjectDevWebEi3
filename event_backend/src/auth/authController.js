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
        return res.status(401).json({error:"Invalid credentials"})
    }

    const token = jwt.sign({id:user.id,username:user.username},JWT_SECRET,{expiresIn:"1h"});
    return res.json({token});
}

exports.signup=async(req,res)=>{
    try{
    const {username,password}=req.body;

    const result=await pool.query("SELEC id FROM users WHERE username=1*",[username]);
    const user=result.rows[0];

    if(result.rows.lenght()>0){
        return res.status(409).json({error:"Invalid credentials"})
    }

    const hash = await bcrypt.hash(password);

    const isInsert =await pool.query("INSERT INTO users (username,password) VALUES($1,$2)",["user",hash]);  
    if(!isInsert){
            return res.status(401).json({error:"Invalid credentials"})
        }
    }
    catch(err){
        return res.status(500).json({error:"Server Error"})
    }
    
}

