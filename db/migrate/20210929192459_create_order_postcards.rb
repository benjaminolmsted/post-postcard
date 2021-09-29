class CreateOrderPostcards < ActiveRecord::Migration[6.1]
  def change
    create_table :order_postcards do |t|
      t.belongs_to :order, null: false, foreign_key: true
      t.belongs_to :postcard, null: false, foreign_key: true

      t.timestamps
    end
  end
end
