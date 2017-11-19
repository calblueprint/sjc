class ClientsController < ApplicationController

  def view
    if params[:client_id]
      @client = Client.find(params[:client_id])
      render "view_client", {client: @client}
    end
  end

  def client_comments
    if params[:client_id]
      @client = Client.find(params[:client_id])
      @comments = Comment.where('client_id = ?', params[:client_id])
    end
  end

  def client_stage
    if params[:client_id]
      @client = Client.find(params[:client_id])
      @stage = @client.stage
    end
  end 
end
