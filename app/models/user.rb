class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true
    has_many :postcards
    
    has_many :carts
    #has_many :postcards, through: :carts
end
