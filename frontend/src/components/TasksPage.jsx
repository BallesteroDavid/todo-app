import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllTasks, updateTask, deleteTask } from "../service/api.js";
import AddTaskForm from "./AddTaskForm.jsx";

function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingTask, setEditingTask] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editStatus, setEditStatus] = useState('A faire');

    useEffect(() => {
        // fetch des tasks
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await getAllTasks();
            setTasks(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des tâches:", error);
        } finally {
            setLoading(false);
        }
    };

   
    // suppression d'une task
    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
            try {
                await deleteTask(id);
                fetchTasks(); // Recharger la liste
            } catch (error) {
                console.error("Erreur lors de la suppression:", error);
                alert('Erreur lors de la suppression de la tâche');
            }
        }
    };

    // modification d'une task
    const handleEdit = (task) => {
        setEditingTask(task.id);
        setEditTitle(task.title);
        setEditStatus(task.status);
    };

    const handleSaveEdit = async (id) => {
        try {
            await updateTask(id, editTitle, editStatus);
            setEditingTask(null);
            fetchTasks(); // Recharger la liste
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
            alert('Erreur lors de la mise à jour de la tâche');
        }
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Non définie';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement des tâches...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Liste des Tâches</h1>
                    <Link to="/" className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors">
                        Retour à l'accueil
                    </Link>
                </div>

                <AddTaskForm onTaskAdded={fetchTasks} />

                {tasks.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Aucune tâche trouvée</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((task) => (
                            <div key={task.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                                {editingTask === task.id ? (
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Titre de la tâche"
                                        />
                                        <select
                                            value={editStatus}
                                            onChange={(e) => setEditStatus(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="A faire">A faire</option>
                                            <option value="Fini">Fini</option>
                                        </select>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleSaveEdit(task.id)}
                                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Enregistrer
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-start mb-4">
                                            <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
                                                {task.title}
                                            </h2>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                task.status === 'Fini' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {task.status}
                                            </span>
                                        </div>

                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="font-medium">Créée le:</span>
                                                <span className="ml-2">{formatDate(task.created_at)}</span>
                                            </div>
                                            
                                            {task.finished_at && (
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="font-medium">Terminée le:</span>
                                                    <span className="ml-2">{formatDate(task.finished_at)}</span>
                                                </div>
                                            )}

                                            {!task.finished_at && task.status === 'A faire' && (
                                                <div className="flex items-center text-gray-400">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>En cours</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                                            <Link 
                                                to={`/task/${task.id}`}
                                                className="text-blue-600 text-sm font-medium hover:text-blue-800"
                                            >
                                                Voir les détails →
                                            </Link>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                                            <button
                                                onClick={() => handleEdit(task)}
                                                className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task.id)}
                                                className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TasksPage;

