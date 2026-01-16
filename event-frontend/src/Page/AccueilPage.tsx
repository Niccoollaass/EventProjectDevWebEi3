
import {Link} from "react-router-dom";

export default function Event(){
    return(
            <div>
            <h1>Accueil</h1>

            <Link to="/login">
                <button>Se connecter</button>
            </Link>

            <Link to="/signup">
                <button>S'inscire</button>
            </Link>
            </div>
        
    )



}