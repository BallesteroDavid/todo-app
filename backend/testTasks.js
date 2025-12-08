import { getAllTasks, addTask } from './services/taskService.js';

async function test() {
  const id = await addTask('Tester ES Modules');
  console.log('Nouvelle tâche ID :', id);

  const tasks = await getAllTasks();
  console.log(tasks);
}

test();
