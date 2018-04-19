class CasesController < ApplicationController
  before_action :authenticate_user!

  def new
    @client_id = params[:client_id]
    @client = Client.find(params[:client_id])
  end

  def view
    if params[:case_id]
      @case = Case.find(params[:case_id])
      render "view_case"
    end
  end

  def edit
    @case = Case.find(params[:case_id])
    @client = Client.find(@case.client_id)
    threads = Comment.where('client_id = ?', @case.client_id).order(:thread_id, :id).group_by{ |c| c.thread_id }
    @comments = threads.values
  end
end
