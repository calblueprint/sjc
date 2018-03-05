# == Schema Information
#
# Table name: cases
#
#  id                            :integer          not null, primary key
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  type_of_case                  :integer
#  pro_bono_placement            :string
#  grant                         :string
#  initial_invoice_date          :date
#  last_invoice_date             :date
#  date_rec_initial_disbursement :date
#  date_rec_last_disbursement    :date
#  case_tracking                 :integer
#  case_supervisor_id            :integer
#  program                       :string
#  legal_case_name               :string
#  judge_assigned                :string
#  trial_attorney                :string
#  case_progress                 :string
#  date_biometrics_done          :date
#  lodge_or_rn_date              :date
#  date_mta_filed                :date
#  asylum_officer                :string
#  nexus_argued                  :string
#  nexus_granted                 :string
#  case_outcome                  :string
#  case_outcome_achieved         :boolean
#  date_of_outcome               :date
#  user_id                       :integer
#  client_id                     :integer
#

class Case < ApplicationRecord
    belongs_to :client
    belongs_to :user
    enum case_type: [:immigration_case, :criminal_case, :civil_rights]
end
