import { Link } from "react-router-dom";

function WellcomePage() {

    return (
        <div className="min-h-screen flex items-center justify-center -mt-40 -mb-40">
            <h2 className="text-center">
                <Link 
                    to={'/tasks'} 
                    className="relative inline-block text-blue-600 hover:text-blue-800 transition-all duration-500 ease-in-out
                               hover:scale-125 hover:rotate-3 transform">
                    Clique ici <br /> 
                    pour acceder a une todolist fantastique qu'on aimerait l'utiliser tout les jours comme todolist
                </Link>
            </h2>
        </div>
    )
}

export default WellcomePage;