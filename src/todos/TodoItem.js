const TodoItem = ({todo, removeTodo, changeTodo}) => {
  return(
    <li className="p-2 list-group-item">
      <input
        onClick={(e) => changeTodo({
          ...todo, done: e.target.checked
        })}
        type="checkbox"
        checked={todo.done}/>

      <input className="form-control w-75 d-inline border-0" onChange={(event) => {
        changeTodo({...todo, title: event.target.value})
      }} value={todo.title}/>

      <button onClick={() => removeTodo(todo)}
              className="btn btn-sm btn-danger float-end">
        Delete
      </button>
    </li>
  );
}

export default TodoItem;