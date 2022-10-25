import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Todo } from "./server/shared/todo";
import { User } from "./server/shared/user";
import { remult } from "remult";

function App() {
  const [count, setCount] = useState(0);
 const create = async(id:string, name:string)=>{
  const user = await remult.repo(User).findId(id);
  const todo = await remult.repo(Todo).save({ name, userId: user.id });
  return todo;
 }
 create('49d5a9f4-401c-44ab-a62c-3fa3e3cb4803','We have done it!')
  return (
    <div className="container">
    <div className="task-tab">
      <h4>Todos</h4>
      <hr />
      <div>
        <form className="form">
          <input type="text" name="name" />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="task-list">
        <ul>
          
            <li>
              <p>Sleep now!</p>
              <input type="checkbox" name="brand" id="" />
            </li>
            <li>
              <p>Sleep now!</p>
              <input type="checkbox" name="brand" id="" />
            </li>
         
        </ul>
      </div>
    </div>
  </div>
  );
}

export default App;
