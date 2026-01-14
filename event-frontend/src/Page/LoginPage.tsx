import "./style/LoginPage.scss"
import { useState } from 'react'


export default function LoginPage(){

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    async function handleSubmit(){
        console.log()
    }

    return(

        <form onSubmit={handleSubmit}>
            <input value = {username}
            onChange={(e)=>setUsername(e.target.value)}/>
            <input value = {password} type="password"
            onChange={(e)=>setPassword(e.target.value)}/>
            <button type ="submit"> Se connecter </button>
        </form>
    )



}