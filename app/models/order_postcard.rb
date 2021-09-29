class OrderPostcard < ApplicationRecord
  belongs_to :order
  belongs_to :postcard
end
