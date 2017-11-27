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
      comments = Comment.where('client_id = ?', params[:client_id]).order(:thread_id, :created_at)
      @comments = []
      curr_thread = nil
      curr_thread_id = nil
      comments.each do |c|
        if c.thread_id != curr_thread_id
          if curr_thread != nil
            @comments << curr_thread
          end
          curr_thread = [c]
          curr_thread_id = c.thread_id
        else
          curr_thread << c
        end
      end
    end
  end

end
