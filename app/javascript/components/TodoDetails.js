// components/TodoDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Typography, Box, TextField } from '@mui/material';

function TodoDetail() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch(`/todos/${id}`)
      .then((response) => response.json())
      .then((data) => setTodo(data))
      .catch((error) => console.error('Erro:', error));
  }, [id]);

  const handleAddTask = () => {
    const taskData = {
      name: newTask,
      completed: false,
    };

    if(!taskData.name) {
      alert('Por favor, digite o nome da nova task');
      return
    }

    fetch(`/todos/${id}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: taskData }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodo((prevTodo) => ({
          ...prevTodo,
          tasks: [...prevTodo.tasks, data],
        }));
        setNewTask('');
      })
      .catch((error) => console.error('Erro:', error));
  };

  const handleCompleteTask = (taskId) => {
    fetch(`/todos/${id}/tasks/${taskId}/mark_as_complete`, {
      method: 'PATCH',
    })
      .then((response) => response.json())
      .then((data) => {
        setTodo((prevTodo) => ({
          ...prevTodo,
          tasks: prevTodo.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: true } : task
          ),
        }));
      })
      .catch((error) => console.error('Erro:', error));
  };

  if (!todo) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Typography variant="h4">{todo.title}</Typography>
      <Typography variant="body1">{todo.description}</Typography>

      <Box sx={{ marginTop: 2 }}>
        <TextField
          label="Nova Task"
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button onClick={handleAddTask} variant="contained" sx={{ marginLeft: 2 }}>
          Adicionar Task
        </Button>
      </Box>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Tasks:
      </Typography>
      <Box>
        {todo.tasks.map((task) => (
          <Box key={task.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Typography variant="body1" sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.name}
            </Typography>
            {!task.completed && (
              <Button
                onClick={() => handleCompleteTask(task.id)}
                variant="contained"
                color="primary"
                sx={{ marginLeft: 2 }}
              >
                Marcar como Completa
              </Button>
            )}
          </Box>
        ))}
      </Box>

      <Link to="/">
        <Button variant="outlined" sx={{ marginTop: 2 }}>
          Voltar
        </Button>
      </Link>
    </div>
  );
}

export default TodoDetail;
