class CreateToDos < ActiveRecord::Migration[8.0]
  def change
    create_table :to_dos do |t|
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
