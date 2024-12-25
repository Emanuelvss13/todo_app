class Task < ApplicationRecord
  belongs_to :toDo, foreign_key: 'to_do_id'

  validates :name, presence: true

  after_initialize :set_default_completed, if: :new_record?

  private

  def set_default_completed
    self.completed ||= false
  end
end
