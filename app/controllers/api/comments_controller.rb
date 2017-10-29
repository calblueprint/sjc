class API::CommentsController < ApplicationController
  respond_to :json

  def show
    if params[:id]
      @comment = Comment.find(params[:id])
      render json: @comment
    end
  end

  def client_comments
    if params[:client_id]
      @client = Client.find(params[:client_id])
      @comments = Comment.where('client_id = ?', params[:client_id])
      render json: @comments, each_serializer: CommentSerializer, root: false
    end
  end

  def create
    comment = Comment.new(comment_params)
    begin
      saved = comment.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render json: {message: 'Invalid comment'}
    end
    if saved
      comments = Comment.where('client_id = ?', comment_params[:client_id])
      return render json: {message: 'Comment successfully created!',
                           comments: comments}
    else
      return render json: {error: comment.errors.full_messages,
                           status: 422}
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment.destroy
      return render json: {message: 'Comment successfully deleted!'}
    else
      return render json: {error: comment.errors.full_messages}
    end
  end

  def update
    begin
      comment = Comment.find(params[:id])
      a = comment.update(comment_params)
    rescue
      return render json: {error: "Forbidden"}
    end
    if a
      return render json: {message: 'Comment successfully updated!'}
    else
      return render json: {error: comment.errors.full_messages}
    end
  end

  def comment_params
    params.permit(
      :id,
      :user_id,
      :content,
      :thread_id,
      :client_id,
    )
  end

end
