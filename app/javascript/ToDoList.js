import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  darken
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { formatDisplayDate } from './util/formatDisplayDate';
import { useNavigate } from 'react-router-dom';
import CreateToDoModal from './components/CreateToDoModal';
import api from './api';
import { displayToDoStatus } from './util/displayToDoStatus';

function TodoListApp() {
  const [todos, setTodos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const fetchToDos = () => {
    api.get('/todos')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar To-Dos:', error);
      });
  };

  useEffect(() => {
    fetchToDos();
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDeleteToDo = (id) => {
    api.delete(`/todos/${id}`)
      .then(() => {
        fetchToDos();
      })
      .catch((error) => {
        console.error('Erro ao apagar To-Do:', error);
      });
  };

  const handleViewToDo = (id) => {
    navigate(`/todos/${id}`);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: '50px',
        textAlign: 'center',
        padding: '50px 0',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80vh',
        width: '100vh',
      }}
    >

      <Typography variant="h2" fontWeight="bold">
        LISTA DE TO-DOs
      </Typography>

      <Typography variant="h6" color="textSecondary" gutterBottom>
        {formatDisplayDate()}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: '30px', cursor: 'pointer' }}
        onClick={handleOpenModal}
      >
        Adicionar Novo To-Do
      </Button>

      <CreateToDoModal
        open={openModal}
        handleClose={handleCloseModal}
        fetchToDos={fetchToDos}
      />

      <List>
        {todos.length > 0 ? todos.map(todo => (
          <ListItem
            key={todo.id}
            sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              '&:hover': {
                backgroundColor: (theme) => darken('rgb(255, 255, 255)', 0.1)
              },
              transition: '0.1s',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => handleViewToDo(todo.id)}
          >

            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={todo.completed}
                tabIndex={-1}
                disableRipple
                onClick={() => handleToggle(todo.id)}
              />
            </ListItemIcon>

            <ListItemText
              primary={todo.title}
              sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            />

            <ListItemText
              primary={displayToDoStatus(todo.status)}
            />

            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDeleteToDo(todo.id)}
              sx={{ color: 'blue' }}
            >
              <Delete />
            </IconButton>
          </ListItem>
        )) :  
        <Typography variant="subtitle1" color="textSecondary">
          Os To-Dos criados aparecerão aqui
        </Typography>}
      </List>

      <Box sx={{ textAlign: 'center', paddingTop: '50px' }}>
        <Typography variant="caption" color="textSecondary">
          Emanuel | 2024 
        </Typography>
      </Box>
    </Container>
  );
}

export default TodoListApp;
