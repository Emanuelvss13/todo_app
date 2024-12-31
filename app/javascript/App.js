import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './pages/ToDoList';  // Página que lista todos os ToDos
import TodoDetails from './pages/ToDoDetails';  // Página que exibe as Tasks de um ToDo

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />  {/* Página inicial: lista de ToDos */}
        <Route path="/todos/:id" element={<TodoDetails />} /> {/* Página de detalhes do ToDo */}
      </Routes>
    </Router>
  );
}

export default App;
