# == Schema Information
#
# Table name: clients
#
#  id           :integer          not null, primary key
#  type_of_case                   :string
#  pro_bono_placement             :string
#  grant                          :string
#  initial_invoice_date           :string
#  last_invoice_date              :string
#  date_rec_initial_disbursement  :string
#  date_rec_last_disbursement     :string
#  case_tracking                  :bigint
#  case_supervisor_id             :bigint
#  program                        :string
#  legal_case_name                :string
#  judge_assigned                 :string
#  trial_attorney                 :string
#  case_progress                  :string
#  date_biometrics_done           :date
#  lodge_or_rn_date               :date
#  data_mta_filed                 :date
#  asylum_officer                 :string
#  nexus_argued                   :string
#  nexus_granted                  :string
#  case_outcome                   :string
#  case_outcome_achieved          :boolean
#  date_of_outcome                :date
#

class Case < ApplicationRecord
    belongs_to :client
    belongs_to :user
    belongs_to :client
    enum case_type: [:immigration_case, :criminal_case, :civil_rights]
end
