class OrderSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :address_1, :address_2, :city, :state, :zip, :country, :email
end
