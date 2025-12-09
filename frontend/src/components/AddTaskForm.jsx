import { useState } from "react";
import { addTask } from "../service/api.js";

function AddTaskForm({ onTaskAdded }) {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim()) {
            setError('Le titre de la tâche est requis');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await addTask(title.trim(), 'A faire');
            setTitle('');
            if (onTaskAdded) {
                onTaskAdded();
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la tâche:", error);
            setError('Erreur lors de l\'ajout de la tâche');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ajouter une nouvelle tâche</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Titre de la tâche
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Entrez le titre de la tâche"
                    />
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    {loading ? 'Ajout en cours...' : 'Ajouter la tâche'}
                </button>
            </form>
        </div>
    );
}

export default AddTaskForm;

