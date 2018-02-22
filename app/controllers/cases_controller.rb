class CasesController < ApplicationController
  def new
    @client_id = params[:client_id]
  end

  def view
    if params[:case_id]
      @case = Case.find(params[:case_id])
      render "view_case"
    end
  end
end
