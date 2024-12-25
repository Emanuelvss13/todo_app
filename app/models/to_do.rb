class ToDo < ApplicationRecord
  has_many :tasks, dependent: :destroy

  validates :title, :status, inclusion: { in: ['pending', 'completed', 'in_progress'] }, presence: true

  after_initialize :set_default_status, if: :new_record?

  private

  def set_default_status
    self.status ||= 'pending'
  end
end
