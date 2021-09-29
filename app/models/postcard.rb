class Postcard < ApplicationRecord
  belongs_to :user

  has_many :carts
  has_many :users, through: :carts
  
end
