class CreateQuotes < ActiveRecord::Migration
  def change
    create_table :quotes do |t|
      t.text :body
      t.integer :user_id
      t.integer :author_id

      t.timestamps
    end
  end
end
