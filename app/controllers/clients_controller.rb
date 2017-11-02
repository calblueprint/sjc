class ClientsController < ApplicationController
  def client_comments
    if params[:client_id]
      @client = Client.find(params[:client_id])
      @comments = Comment.where('client_id = ?', params[:client_id])
    end
  end
end
