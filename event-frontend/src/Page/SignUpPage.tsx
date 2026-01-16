import "./style/LoginPage.scss"
import { useState } from 'react'
import {Link} from "react-router-dom";
import {signup} from '../API/auth-actions'


export default function SignUpPage(){

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    async function handleSubmit(e:React.FormEvent){
        e.preventDefault()
        signup(username,password)
        
    }
    

    return(
        
        <form onSubmit={handleSubmit}>
            <h1>SignUp Page</h1>
            <input value = {username}
            onChange={(e)=>setUsername(e.target.value)}/>
            <input value = {password} type="password"
            onChange={(e)=>setPassword(e.target.value)}/>
            <button type ="submit"> S'inscrire </button>
            <p>Déjà un compte ?</p>

            <Link to="/login">
                <button>Se connecter</button>
            </Link>
        </form>
    )



}