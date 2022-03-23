import axios from "axios";

const TODO_REST_API = "http://localhost:4000/todos";

export const findAllTodos = async () => {
  const response = await axios.get(TODO_REST_API);
  const todos = response.data;
  return todos;
}
export const findTodoById = async (tid) => {}
export const createTodo = async (todo) => {
  const response =
    await axios.post(TODO_REST_API, todo);
  const todos = response.data;
  return todos;
}
export const deleteTodo = async (tid) => {
  const response =
    await axios.delete(`${TODO_REST_API}/${tid}`);
  const todos = response.data;
  return todos;
}
export const updateTodo = async (tid, todo) => {
  const response = await axios.put(
    `${TODO_REST_API}/${tid}`, todo
  );
  const todos = response.data;
  return todos;
}
