// components/Navbar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');

  const handleClickOpen = () => {
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateTodo = () => {
    const newTodo = {
      title: todoTitle,
      description: todoDescription,
      status: 'pending',
    };

    fetch('/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todo: newTodo }),
    })
      .then((response) => response.json())
      .then(() => {
        setTodoTitle('');
        setTodoDescription('');
        setOpen(false);
      })
      .catch((error) => console.error('Erro:', error));
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            To-Do List
          </Typography>
          <Button color="inherit" component={Link} to="/todos">
            Todos
          </Button>
          <Button color="inherit" onClick={handleClickOpen}>
            Criar ToDo
          </Button>
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Criar Novo ToDo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título"
            fullWidth
            variant="outlined"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Descrição"
            fullWidth
            variant="outlined"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreateTodo} color="primary">
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Navbar;
