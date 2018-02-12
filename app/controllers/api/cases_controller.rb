class API::CasesController < ApplicationController
  respond_to :json
  before_action :authenticate_user!

  def create
    _case = Case.new(case_params)
    begin
      saved = _case.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render json: {message: 'Invalid case'}
    end

    if saved
      return render json: {message: 'Case successfully created!',
                           case: _case}
    else
      return render json: {error: _case.errors.full_messages,
                           status: 500}
    end
  end

  def show
    if params[:id]
      _case = Case.find(params[:id])
      render json: _case
    end
  end

  def destroy
    _case = Case.find(params[:id])
    if _case.destroy
      return render json: {message: 'Case successfully deleted!'}
    else
      return render json: {error: _case.errors.full_messagese}
    end
  end

  def update
    begin
      _case = Case.find(params[:id])
      result = _case.update(comment_params)
    rescue
      return render json: {error: "Forbidden"}
    end

    if result
      new_case = Case.find(params[:id])
      return render json: {message: 'Case successfully updated!',
                           case: new_case}
    else
      return render json: {error: case.errors.full_messages}
    end
  end

  def case_params
    params.require(:case).permit(
      :id,
      :user_id,
      :type_of_case,
      :pro_bono_placement,
      :grant,
      :initial_invoice_date,
      :last_invoice_date,
      :date_rec_initial_disbursement,
      :date_rec_last_disbursement,
      :case_tracking,
      :date_mta_filed,
      :case_supervisor_id,
      :program,
      :legal_case_name,
      :judge_assigned,
      :trial_attorney,
      :case_progress,
      :date_biometrics_done,
      :lodge_or_rn_date,
      :date_mta_filed,
      :asylum_officer,
      :nexus_argued,
      :nexus_granted,
      :case_outcome,
      :case_outcome_achieved,
      :date_of_outcome
    )
  end
end
