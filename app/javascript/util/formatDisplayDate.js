export const formatDisplayDate = () => {
  const date = new Date();

  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    year: 'numeric',  
    month: 'long',    
    day: 'numeric'      
  }).format(date);

  return formattedDate;
}