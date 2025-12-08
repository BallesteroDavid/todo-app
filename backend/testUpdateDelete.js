import { addTask, getAllTasks, updateTask, deleteTask } from './services/taskService.js';

async function test() {
  // Ajouter une tâche
  const id = await addTask('Tâche à modifier');
  console.log('Nouvelle tâche ID :', id);

  // Modifier la tâche
  await updateTask(id, 'Tâche modifiée', 'Fini');
  console.log('Tâche modifiée avec status Fini');

  // Vérifier
  const tasks = await getAllTasks();
  console.log('Liste des tâches après modification :', tasks);

  // Supprimer la tâche
  await deleteTask(id);
  console.log('Tâche supprimée');

  // Vérifier
  const tasksFinal = await getAllTasks();
  console.log('Liste des tâches après suppression :', tasksFinal);
}

test();
