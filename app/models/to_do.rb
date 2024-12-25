class ToDo < ApplicationRecord
  has_many :tasks, dependent: :destroy

  validates :title, presence: true

  validates :status, inclusion: { in: ['pending', 'completed', 'in_progress'] }

  after_initialize :set_default_status, if: :new_record?

  private

  def set_default_status
    self.status ||= 'pending'
  end
end
