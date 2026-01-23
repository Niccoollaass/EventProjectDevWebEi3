import "./style/LoginPage.scss"
import { useState } from 'react'
import {Link,useNavigate} from "react-router-dom";
import {login, validateToken} from '../API/auth-actions'



export default function LoginPage(){
    const navigate = useNavigate();

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    async function handleSubmit(e:React.FormEvent){

        e.preventDefault()
        const tokernusername= await login(username,password)
        localStorage.setItem("token",tokernusername)
        const me = await validateToken();
        localStorage.setItem("user", JSON.stringify(me.username));
        navigate("/events");
        window.location.reload(); // simple et efficace pour reset l'état

    }
    

    return(
        
        <form onSubmit={handleSubmit}>
            <h1>Login Page</h1>
            <input value = {username}
            onChange={(e)=>setUsername(e.target.value)}/>
            <input value = {password} type="password"
            onChange={(e)=>setPassword(e.target.value)}/>
            <button type ="submit"> Se connecter </button>
            <p>Pas encore inscrit ? </p>
            <Link to="/signup">
                Créer un compte
            </Link>
        </form>
    )



}