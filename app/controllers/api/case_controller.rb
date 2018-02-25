class API::CaseController < ApplicationController
  respond_to :json

  def show
    if params[:id]
      @case = Case.find(params[:id])
      render json: @case
    end
  end

  def index
    cases = Case.all
    render json: cases
  end

  def create
    @case = Case.new(case_params)
    begin
      saved = @case.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render json: {message: 'Invalid case'}
    end
    if saved
      @case = Case.find(params[:id])
      return render json: {message: 'Case successfully created!',
                           case: case}
    else
      return render json: {error: case.errors.full_messages,
                           status: 422}
    end
  end

  def destroy
    @case = Case.find(params[:id])
    if @case.destroy
      return render json: {message: 'Case successfully deleted!'}
    else
      return render json: {error: case.errors.full_messagese}
    end
    # head 204
  end

  def update
    begin
      @case = Case.find(params[:id])
      a = @case.update(case_params)
    rescue
      return render json: {error: "Forbidden"}
    end
    if a
      new_case = Case.find(params[:id])
      return render json: {message: 'Case successfully updated!',
                           case: new_case}
    else
      return render json: {error: @case.errors.full_messages}
    end
  end

  def case_params
    params.permit(
      :id,
      :type_of_case,
      :pro_bono_placement,
      :grant,
      :initial_invoice_date,
      :last_invoice_date,
      :date_rec_initial_disbursement,
      :date_rec_last_disbursement,
      :case_tracking,
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
