import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CreateTodoModal = ({ open, handleClose, onTodoCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    try {
      const response = await axios.post('/todos.json', { todo: { title, description } });
      onTodoCreated(response.data); // Atualiza a lista de To-Dos ao criar
      handleClose(); // Fecha o modal
    } catch (error) {
      console.error('Erro ao criar o To-Do:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Criar Novo To-Do</h2>
        <TextField
          label="Título"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Descrição"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" onClick={handleCreate} sx={{ mt: 2 }}>
          Criar
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateTodoModal;
