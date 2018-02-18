class ClientsController < ApplicationController
  load_and_authorize_resource

  def all_clients
  end

  def view
    if params[:client_id]
      @client = Client.find(params[:client_id])
    end
  end

  def profile
    @client = Client.find(params[:client_id])
  end

  def edit
    @client = Client.find(params[:client_id])
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
