class AddAttachmentPdfToDocuments < ActiveRecord::Migration[5.1]
  def self.up
    change_table :documents do |t|
      t.attachment :pdf
    end
  end

  def self.down
    remove_attachment :documents, :pdf
  end
end
