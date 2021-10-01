class CartSerializer < ActiveModel::Serializer
  attributes :id, :amount
  #has_one :user
  has_one :postcard
end
