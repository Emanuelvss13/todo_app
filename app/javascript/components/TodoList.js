// components/TodoList.js
import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);  // Controle de abertura do modal
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Função para carregar os ToDos da API
  useEffect(() => {
    fetch('/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Erro ao carregar os ToDos:', error));
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateTodo = () => {
    const newTodo = { title, description, status: 'pending' };

    fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: newTodo }),
    })
      .then((response) => response.json())
      .then(() => {
        setTodos([...todos, newTodo]);  // Adiciona o novo ToDo à lista
        handleClose();  // Fecha o modal após criar o ToDo
      })
      .catch((error) => console.error('Erro:', error));
  };

  return (
    <div>
      <Navbar />

      {/* Botão para Criar ToDo - Abre o modal */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ margin: '20px' }}
      >
        Criar ToDo
      </Button>

      {/* Modal para Criar ToDo */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-create-todo"
        aria-describedby="modal-to-create-todo"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', padding: 3, boxShadow: 24, width: 300 }}>
          <h2 id="modal-create-todo">Criar Novo ToDo</h2>
          <TextField
            label="Título"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Descrição"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleCreateTodo}>
            Criar
          </Button>
        </Box>
      </Modal>

      {/* Tabela de ToDos */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabela de todos">
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>{todo.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" component={Link} to={`/todo/${todo.id}`}>
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TodoList;
