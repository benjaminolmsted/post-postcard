class Order < ApplicationRecord
    has_many :order_postcards, dependent: :destroy
    has_many :postcards, through: :order_postcards

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :address_1, presence: true
    validates :city, presence: true
    validates :state, presence: true
    validates :zip, presence: true
    validates :country, presence: true

end
