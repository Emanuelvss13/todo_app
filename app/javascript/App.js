import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './pages/ToDoList';
import TodoDetails from './pages/ToDoDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todos/:id" element={<TodoDetails />} />      </Routes>
    </Router>
  );
}

export default App;
