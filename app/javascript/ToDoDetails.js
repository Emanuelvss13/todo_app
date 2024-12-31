import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  darken,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import api from './api';

function ToDoListDetails() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchToDoDetails();
  }, [id]);

  const fetchToDoDetails = () => {
    api.get(`/todos/${id}`)
      .then((response) => {
        setTodo(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar o To-Do:", error);
      });
  };

  const addTask = () => {
    if (newTask.trim()) {
      api.post(`/todos/${id}/tasks`, {
        name: newTask,
      })
      .then(() => {
        fetchToDoDetails();
        setNewTask('');
      })
      .catch((error) => {
        console.error("Erro ao adicionar task:", error);
      });
    }
  };

  const handleToggleCompleted = (taskId) => {
    api.patch(`/todos/${id}/tasks/${taskId}/toggle_completed/`)
    .then(() => {
      fetchToDoDetails();
    })
    .catch((error) => {
      console.error("Erro ao marcar task como completa:", error);
    });
  };

  const handleRemoveTask = (taskId) => {
    api.delete(`/todos/${id}/tasks/${taskId}`)
      .then(() => {
        fetchToDoDetails();
      })
      .catch((error) => {
        console.error("Erro ao remover task:", error);
      });
  };

  if (!todo) {
    return <Typography>Carregando...</Typography>;
  }

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

      <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
        Detalhes do To-Do: {todo.title}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
        <TextField
          label="Nova Task"
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          sx={{ marginRight: 2, width: '300px' }}
        />
        <Button variant="contained" color="primary" onClick={addTask} sx={{ height: '56px' }}>
          Adicionar Task
        </Button>
      </Box>

      <List>
        {todo.tasks.length > 0 ? todo.tasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              '&:hover': {
               backgroundColor: (theme) => darken('rgb(255, 255, 255)', 0.1)
              }, 
            }} 
          >

            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.completed}
                tabIndex={-1}
                disableRipple
                onClick={() => handleToggleCompleted(task.id)}
              />
            </ListItemIcon>

            <ListItemText
              primary={task.name}
              sx={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
              onClick={() => handleViewToDo(task.id)}
            />

            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleRemoveTask(task.id)}
              sx={{ color: 'blue' }}
            >
              <Delete />
            </IconButton>
          </ListItem>
        )): 
          <Typography variant="subtitle1" color="textSecondary">
            As Tasks do To-Do aparecerão aqui.
          </Typography>
          }
      </List>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="outlined" sx={{ marginTop: 3 }}>
          Voltar para a lista de To-Dos
        </Button>
      </Link>
    </Container>
  );
}

export default ToDoListDetails;
