class AddAmountToOrderPostcards < ActiveRecord::Migration[6.1]
  def change
    add_column :order_postcards, :amount, :integer
  end
end
