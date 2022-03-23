import TodoItem from "./TodoItem";
import {useState, useEffect} from "react";
import * as service from "./TodoService";

const TODOS = [
  {title: "Read Dune", done: true, _id: "123"},
  {title: "Read Foundation", done: true, _id: "234"},
  {title: "Read Forever war", done: false, _id: "345"}
];

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("New Todo");

  useEffect(async () => {
    const todos = await service.findAllTodos();
    setTodos(todos);
  }, []);

  const addTodo = async () => {
    // alert('add todo')
    const newTodo = {
      title: newTodoTitle
    };
    const newTodos = await service.createTodo(newTodo);
      // [...todos, newTodo];
    setTodos(newTodos);
  }

  const deleteTodo = async (todo) => {
    const newTodos = await service.deleteTodo(todo._id);
    //   todos.filter((t) => {
    //   if(t === todo) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });
    setTodos(newTodos);
  }

  const updateTodo = async (updatedTodo) => {
    // alert(updatedTodo.done)
    const newTodos = await service.updateTodo(
      updatedTodo._id,
      updatedTodo
    )
    //   todos.map(t => {
    //   if(t._id === updatedTodo._id) {
    //     return updatedTodo;
    //   } else {
    //     return t;
    //   }
    // });
    setTodos(newTodos);
  }

  return (
    <div className="container">
      <h1>Todo App</h1>
      <ul className="list-group">
        {
          todos.map(todo =>
            <TodoItem todo={todo}
                      changeTodo={updateTodo}
                      removeTodo={deleteTodo}/>
          )
        }
      </ul>
      <input
        onChange={(e) => {
          setNewTodoTitle(e.target.value)
        }}
        value={newTodoTitle}
        className="form-control"
        placeholder="Buy milk"/>
      <button className="btn btn-success" onClick={addTodo}>Add</button>
    </div>
  )
}

export default TodoApp;