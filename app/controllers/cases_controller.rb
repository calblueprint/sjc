class CasesController < ApplicationController
  def new
  end

  def view
    if params[:case_id]
      @case = Case.find(params[:case_id])
      render "view_case"
    end
  end
end
