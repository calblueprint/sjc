class Document < ApplicationRecord
  belongs_to :case
  has_attached_file :pdf, default_url: '/images/default_pdf.png'
  validates_attachment :pdf, :content_type => { :content_type => 'application/pdf' }
end
