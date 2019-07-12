class Group < ApplicationRecord
  has_many :users, through: :members
  has_many :members
  validates :group_name, presence: true, uniqueness: true
end
