import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoDetails from './components/TodoDetails';
import Navbar from './components/Navbar';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/todo/:id" element={<TodoDetails />} />
    </Routes>
  </Router>
);

export default App;