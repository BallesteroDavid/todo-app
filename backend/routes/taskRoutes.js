import { getAllTasks, addTask, updateTask, deleteTask } from './services/taskService.js';

// La fonction reçoit la requête et la réponse
export const handleTasksRoute = async (req, res, urlParts, parseBody) => {
    try {
        // GET /tasks
        if (req.method === 'GET' && urlParts[0] === 'tasks') {
        const tasks = await getAllTasks();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));

        // POST /tasks
        } else if (req.method === 'POST' && urlParts[0] === 'tasks') {
        const data = await parseBody(req);
        const id = await addTask(data.title, data.status);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, id }));

        // PUT /tasks/:id
        } else if ((req.method === 'PUT' || req.method === 'PATCH') && urlParts[0] === 'tasks' && urlParts[1]) {
        const id = urlParts[1];
        const data = await parseBody(req);
        await updateTask(id, data.title, data.status);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));

        // DELETE /tasks/:id
        } else if (req.method === 'DELETE' && urlParts[0] === 'tasks' && urlParts[1]) {
        const id = urlParts[1];
        await deleteTask(id);
        res.writeHead(204);
        res.end();

        // Route non trouvée
        } else {
        return false; // pour indiquer au serveur que ce n'est pas la bonne route
        }

        return true; // route traitée avec succès
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
        return true;
    }
};
