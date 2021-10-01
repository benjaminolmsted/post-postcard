class AddAmountToCarts < ActiveRecord::Migration[6.1]
  def change
    add_column :carts, :amount, :integer
  end
end
