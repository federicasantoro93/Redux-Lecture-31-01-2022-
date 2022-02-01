/*
-LEZIONE 31-01-2022

-ARGOMENTI: REDUX

-Cartella Store contenente un file actions.js e un file store.js



-FILE STORE.JS

-Importo createStore:
import { createStore } from 'redux';

-Stato iniziale con una chiave che contiene un array di elementi:
const initialState = {
  todos: [
    {
      text: 'Prima nota',
      id: 1,
      done: false,
    },
  ],
};

-Reducer che accetta come parametri uno stato(che la prima volta è lo stato iniziale, poi quello attuale) e un'azione e torna un nuovo stato:
const todosReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return {
        todos: [...state.todos, action.payload],
      };

    case 'remove':
      return {
        todos: state.todos.filter((item) => item.id !== action.payload),
      };

    case 'done':
      const newTodoState = [...state.todos];
      const foundIndex = newTodoState.findIndex(
        (note) => note.id === action.payload
      );
      newTodoState[foundIndex] = {
        ...newTodoState[foundIndex],
        done: !newTodoState[foundIndex].done,
      };
      return {
        todos: newTodoState,
      };

    default:
      return state;
  }
};

-Funzione createStore:
export const store = createStore(todosReducer, initialState);


-Importare il Provider su index.tsx:
import { Provider } from 'react-redux';

-Wrappare l'applicazione con il Provider di react-redux: 
const App = () => {
  return (
    <Provider store={store}>
      <Notes />
    </Provider>
  );
};

Il Provider prende divere prop. Importiamo store per poterlo passare come prop:
import { store } from './Store/store';

-useSelector permette al componente Notes di accedere allo store:
import { useSelector, useDispatch } from 'react-redux';

export default () => {
  const { todos } = useSelector((state) => state);  //<--------------
  //Lo useSelector in questo caso ritorna tutto lo stato 
  //Destrutturazione dello stato per ottenere i todos
  
  const dispatch = useDispatch();

  const onType = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      dispatch(
        addTodo({
          text: e.target.value,
          done: false,
          id: uuid(),
        })
      );
      e.target.value='';
    }
  };

  

  return (
    <div>
      
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">
          Insert a note
        </InputGroup.Text>
        
        <FormControl
          onKeyDown={onType}
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
     
      <ListGroup as="ol" numbered>
        {todos.map((todo) => (
          <Note key={todo.id} note={todo} />
        ))}
      </ListGroup>
    </div>
  );
};

-Prende i todos e renderizza un componente Note per ogni todos a cui passa note come prop

-Note riceve note come prop e renderizza il suo contenuto:
export default ({ note }) => {          //<-------------- prop 

  const dispatch = useDispatch()

  const remove = () => dispatch(removeTodo(note.id))

  const done = () => dispatch(completed(note.id))

  return (

    <ListGroup className="d-flex justify-content-between align-content-center flex-row">
      <ListGroup.Item
      variant={note.done ? 'success' : ''}
        className="d-flex p-2 flex-grow-1 align-items-center justify-content-center"
        as="li"
      >
        {note.text}                //<---------------- contenuto prop
      </ListGroup.Item>

      <ListGroup className="d-flex p-2">
        <Button className="mb-2" variant="success" onClick={done}>
          Done/Undone
        </Button>
        <Button className="mb-2" variant="danger" onClick={remove}>
          Remove
        </Button>
        </ListGroup>  

    </ListGroup>
  );
};

-All'interno del componente sono state dispacciate delle azioni

*/
