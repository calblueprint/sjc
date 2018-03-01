class AddDetailsToCase < ActiveRecord::Migration[5.1]
  def change
    add_column :cases, :type_of_case, :string
    add_column :cases, :pro_bono_placement, :string
    add_column :cases, :grant, :string
    add_column :cases, :initial_invoice_date, :date
    add_column :cases, :last_invoice_date, :date
    add_column :cases, :date_rec_initial_disbursement, :date
    add_column :cases, :date_rec_last_disbursement, :string
    add_column :cases, :case_tracking, :bigint
    add_column :cases, :case_supervisor_id, :bigint
    add_column :cases, :program, :string
    add_column :cases, :legal_case_name, :string
    add_column :cases, :judge_assigned, :string
    add_column :cases, :trial_attorney, :string
    add_column :cases, :case_progress, :string
    add_column :cases, :date_biometrics_done, :date
    add_column :cases, :lodge_or_rn_date, :date
    add_column :cases, :data_mta_filed, :date
    add_column :cases, :asylum_officer, :string
    add_column :cases, :nexus_argued, :string
    add_column :cases, :nexus_granted, :string
    add_column :cases, :case_outcome, :string
    add_column :cases, :case_outcome_achieved, :boolean
    add_column :cases, :date_of_outcome, :date
  end
end
