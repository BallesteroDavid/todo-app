import { Link } from "react-router-dom";

function WellcomePage() {

    return (
        <div>
            <h2 className="lienTasks"><Link to={'/tasks'}>Clique ici <br /> pour acceder a une todolist fantastique qu'on aimerait l'utiliser tout les jours comme une todolist</Link></h2>
        </div>
    )
}

export default WellcomePage;