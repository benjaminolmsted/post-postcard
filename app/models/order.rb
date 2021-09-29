class Order < ApplicationRecord
    has_many :order_postcards, dependent: :destroy
    has_many :postcards, through: :order_postcards
end
