import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import axios from 'axios';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CreateToDoModal({ open, handleClose, fetchToDos }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('pending');  // Valor padrão

  // Função para criar um novo To-Do
  const handleCreateToDo = () => {
    if (title.trim()) {
      axios.post('http://localhost:3000/todos', {
        title,
        status,
      })
      .then(() => {
        fetchToDos();
        handleClose();
      })
      .catch((error) => {
        console.error('Erro ao criar To-Do:', error);
      });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Criar Novo To-Do
        </Typography>
        <TextField
          fullWidth
          label="Título"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateToDo}
          fullWidth
        >
          Criar To-Do
        </Button>
      </Box>
    </Modal>
  );
}

export default CreateToDoModal;
