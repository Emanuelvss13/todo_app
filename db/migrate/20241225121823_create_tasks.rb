class CreateTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.boolean :completed
      t.references :to_do, null: false, foreign_key: true

      t.timestamps
    end
  end
end
