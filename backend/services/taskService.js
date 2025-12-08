import db from '../db/index.js';

export const getAllTasks = async () => {
    const [rows] = await db.query('SELECT * FROM tasks');
    return rows;
};

export const addTask = async (title, status = 'A faire') => {
    const [result] = await db.query(
        'INSERT INTO tasks (title, status) VALUES (?, ?)',
        [title, status]
    );
    return result.insertId;
};
