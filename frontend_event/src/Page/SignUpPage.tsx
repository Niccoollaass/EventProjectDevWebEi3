import "./style/LoginPage.scss"
import { useState } from 'react'
import {Link,useNavigate} from "react-router-dom";
import {signup,validateToken,login} from '../API/auth-actions'


export default function SignUpPage(){
    const navigate = useNavigate();

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault()
        setError(null);
        try {

        await signup(username,password)
        const tokernusername= await login(username,password)
        localStorage.setItem("token",tokernusername)
        const me = await validateToken();
        localStorage.setItem("user", JSON.stringify(me.username));
        navigate("/events");
        window.location.reload(); // simple et efficace pour reset l'état
        }
        catch (err:any){
            if(err.response.status==409){
                console.error("Signup error:", err);
                setError("Ce nom d'utilisateur existe déjà.");
            }
            else {
                 setError("Impossible de contacter le serveur.");
            }
        }
    }
    

    return(
        
        <form onSubmit={handleSubmit}>
            <h1>SignUp Page</h1>
            {error && <p className="error">{error}</p>}

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