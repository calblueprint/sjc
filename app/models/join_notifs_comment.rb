class JoinNotifsComment < ApplicationRecord
  belongs_to :notification
  belongs_to :comment
end
