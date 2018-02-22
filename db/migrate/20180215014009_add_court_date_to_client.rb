class AddCourtDateToClient < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :court_date, :datetime
  end
end
