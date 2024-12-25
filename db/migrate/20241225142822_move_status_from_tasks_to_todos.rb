class MoveStatusFromTasksToTodos < ActiveRecord::Migration[6.0]
  def change
    # Remover o campo `status` da tabela `tasks`
    remove_column :tasks, :status, :string

    # Adicionar o campo `status` à tabela `todos`
    add_column :to_dos, :status, :string, default: 'pending'  # Ajuste o valor padrão se necessário
  end
end
