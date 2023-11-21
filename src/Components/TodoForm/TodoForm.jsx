import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmite = (e) => {
    e.preventDefault();
    if (!value || !category) return;

    // add novas tarefas
    addTodo(value, category);

    // Limpa os campos
    setValue("");
    setCategory("");
  };

  return (
    <div className="todo-form">
      <h2>Criar tarefa:</h2>
      <form onSubmit={handleSubmite}>
        <input
          value={value}
          type="text"
          placeholder="Digite o título"
          onChange={(e) => setValue(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Selecione uma categoria</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Pessoal">Pessoa</option>
          <option value="Estudos">Estudos</option>
        </select>
        <button type="submit">Criar Tarefa</button>
      </form>
    </div>
  );
};

export default TodoForm;