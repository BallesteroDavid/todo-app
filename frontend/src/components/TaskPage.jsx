import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTasks } from "../service/api.js";

function TaskPage() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const data = await getTasks(id);
                setTask(data);
            } catch (error) {
                console.error("Erreur lors de la récupération de la tâche:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTask();
        }
    }, [id]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!task) {
        return (
            <div>
                <h1>Tâche non trouvée</h1>
                <Link to="/tasks">Retour à la liste</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Détails de la Tâche</h1>
            <div>
                <h2>{task.title || task.name}</h2>
                <p>{task.description || "Pas de description"}</p>
                <p>Statut: {task.completed ? "Terminée" : "En cours"}</p>
            </div>
            <Link to="/tasks">Retour à la liste</Link>
        </div>
    );
}

export default TaskPage;

