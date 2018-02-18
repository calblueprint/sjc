class ClientsController < ApplicationController
  load_and_authorize_resource

  def view
    if params[:client_id]
      @client = Client.find(params[:client_id])

      # The below query takes the comments related to the client and first orders them by thread_id and comment.id ascending
      # Then it transforms the array [Comment(id1, thread_id1), Comment(id2, thread_id1), Comment(id3, thread_id2) ... ] into 
      # the hash {thread_id1 => [comment_id1, comment_id2], thread_id2 => [comment_id3] ... }
      threads = Comment.where('client_id = ?', params[:client_id]).order(:thread_id, :id).group_by{ |c| c.thread_id }

      # Transforms the hash {thread_id1 => [comment_id1, comment_id2], thread_id2 => [comment_id3] ... }
      # into [[comment_id1, comment_id2], [comment_id3], ... ]
      @comments = threads.values
      render "view_client", {client: @client}
    end
  end

  def client_stage
    if params[:client_id]
      @client = Client.find(params[:client_id])
      @stage = @client.stage
    end
  end

  def all_clients
  end
end
