import http from 'http';
import dotenv from 'dotenv';
import { handleTasksRoute } from './routes/tasksRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

const parseBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
        try { resolve(JSON.parse(body)); } 
        catch (err) { reject(err); }
        });
    });
};

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const urlParts = req.url.split('/').filter(Boolean);

    // On délègue la logique à tasksRoutes.js
    const handled = await handleTasksRoute(req, res, urlParts, parseBody);

    if (!handled) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Route non trouvée' }));
    }
});

server.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
