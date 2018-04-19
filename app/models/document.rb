# == Schema Information
#
# Table name: documents
#
#  id               :integer          not null, primary key
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  pdf_file_name    :string
#  pdf_content_type :string
#  pdf_file_size    :integer
#  pdf_updated_at   :datetime
#  case_id          :integer
#

class Document < ApplicationRecord
  belongs_to :case
  has_attached_file :pdf, default_url: '/images/default_pdf.png'
  validates_attachment :pdf, :content_type => { :content_type => 'application/pdf' }
end
