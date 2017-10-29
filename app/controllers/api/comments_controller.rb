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
      return render_json_message(:forbidden, errors: "Invalid comment")
    end
    if saved
      render_json_message(:ok, message: 'Comment successfully created!')
    else
      render_json_message(:forbidden, errors: comment.errors.full_messages)
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment.destroy
      render_json_message(:ok, message: 'Comment successfully deleted!')
    else
      render_json_message(:forbidden, errors: comment.errors.full_messages)
    end
    # head 204
  end

  def update
    begin
      comment = Comment.find(params[:id])
      a = comment.update(comment_params)
    rescue
      render_json_message(:forbidden)
      return
    end
    if a
      render_json_message(:ok, message: 'Comment successfully updated!')
    else
      render_json_message(:forbidden, errors: comment.errors.full_messages)
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
