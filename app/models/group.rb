class Group < ApplicationRecord
  has_many :users, through: :members
  has_many :members
  has_many :messages
  
  validates :group_name, presence: true, uniqueness: true
end
