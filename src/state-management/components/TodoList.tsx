import { useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { toDoState } from "./atoms";
import ToDo from "./ToDo";

function TodoList() {
  const toDos = useRecoilValue(toDoState);
  console.log(toDos);

  return  (
    <div style={{marginTop: '15px'}}>
      <h1> To Dos </h1>
      <hr />
      <CreateToDo />
      <hr/>

      <ul>
        { toDos.map(toDo => <ToDo key={toDo.id} {...toDo} />) }
      </ul>
    </div>
  );
}

export default TodoList;