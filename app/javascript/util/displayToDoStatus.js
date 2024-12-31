export const displayToDoStatus = (status) => {
  switch (status) {
    case 'pending':
      return 'Pendente';
    case 'in_progress':
      return 'Em Progresso';
    case 'completed':
      return 'Concluído';
    default:
      return 'Status não encontrado';
  }
};