import db from '../db/index.js';

// rRécupérer toutes les taches / GET
export const getAllTasks = async () => {
    const [rows] = await db.query('SELECT * FROM tasks');
    return rows;
};

// Ajouter une tache / POST
export const addTask = async (title, status = 'A faire') => {
    const [result] = await db.query(
        'INSERT INTO tasks (title, status) VALUES (?, ?)',
        [title, status]
    );
    return result.insertId;
};

// Mettre à jour une tache / UPDATE 
export const updateTask = async (id, title, status) => {
    if (status === 'Fini') {
        await db.query(
            'UPDATE tasks SET title = ?, status = ?, finished_at = NOW() WHERE id = ?',
            [title, status, id]
        );
    } else {
        await db.query(
            'UPDATE tasks SET title = ?, status = ?, finished_at = NULL WHERE id = ?',
            [title, status, id]
        );
    }
} 

// Supprimer une tache / DELETE
export const deleteTask = async (id) => {
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
}