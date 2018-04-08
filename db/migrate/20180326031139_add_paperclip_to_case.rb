class AddPaperclipToCase < ActiveRecord::Migration[5.1]
  def change
    add_attachment :cases, :pdf
  end
end
