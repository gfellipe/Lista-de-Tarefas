import "./App.css";
import { useState } from "react";

import Todo from "./Components/Todo/Todo";
import TodoForm from "./Components/TodoForm/TodoForm";
import Search from "./Components/Search/Search";
import Filter from "./Components/Filter/Filter";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Criar funcionalidade x no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir para a academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    },
  ]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  const addTodo = (text, category) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
      },
    ];

    setTodos(newTodos);
  };

  // Pego por base o id q o identificador unico para poder fazer remoção.
  const removeTodo = (id) => {
    const newTodos = [...todos];
    // Para usar o filtro preciso criar um novo array, pq o filtro nao modifica o array original.
    const filteredTodos = newTodos.filter((todo) =>
      // O todo.id que tiver o id diferente do id informado ele e retornado : ja o todo que tiver o id igual retorna como null.
      todo.id !== id ? todo : null
    );
    // Atualiza o todo passando o filteredTodos
    setTodos(filteredTodos);
  };

  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) =>
      // Se id foi === id ? eu vou mudar o todo.isCompleted = para o contrario de !todo.iscompleted : e se nao for id igual retorno o todo normal todo.
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );

    // atualizando a lista completa com todos os todos
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className="todo-list">
        {todos
          .filter((todo) =>
            filter === "All"
              ? true
              : filter === "Completed"
              ? todo.isCompleted
              : !todo.isCompleted
          )
          .filter((todo) =>
            todo.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
          .sort((a, b) =>
            sort === "Asc"
              ? a.text.localeCompare(b.text)
              : b.text.localeCompare(a.text)
          )
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
