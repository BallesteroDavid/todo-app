const API_URL = import.meta.env.VITE_API_URL;

export const fetchTasks = async () => {
  const res = await fetch(API_URL);
  return res.json();
};
