import { useEffect, useState } from "react";
import "./App.css";
import { Todo } from "./server/shared/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>();
  const [name, setName] = useState('');

  const create = async (e: any) => {
    e.preventDefault();
    const result = await fetch('/api/createTodo', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });
    if (result.ok) {
      setName("");
    }
    else alert(await result.json());
  }
  useEffect(() => {
    fetch('/api/getTodo').then(r => r.json())
      .then(async todosData => {
        setTodos(todosData)
      });
  },[todos]);

  return (
    <div className="container">
      <div className="task-tab">
        <h4>Todos</h4>
        <hr />
        <div>
          <form className="form">
            <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name}/>
            <button type="button" onClick={create}>Add</button>
          </form>
        </div>
        <div className="task-list">
          <ul>
            {
              todos?.map((todo) => {
                return (
                  <li key={todo.id}>
                    <p>{todo.name}</p>
                    <input type="checkbox" name="brand" id="" />
                  </li>
                )
              })}

          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
