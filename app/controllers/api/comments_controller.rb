class API::CommentsController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def show
    if params[:id]
      @comment = Comment.find(params[:id])
      render json: @comment
    end
  end

  def create
    puts params
    comment = Comment.new(comment_params)
    begin
      saved = comment.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render json: {message: 'Invalid comment'}
    end
    if saved
      if !params[:thread_id]
        comment.thread_id = comment.id
      end
      comments = Comment.where('client_id = ?', comment_params[:client_id])
      comment.created_at = Time.now.strftime("on %b %d %Y at %I:%M%P")
      comment.save
      return render json: {message: 'Comment successfully created!',
                           comment: comment}
    else
      return render json: {error: comments.errors.full_messages,
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
      new_comment = Comment.find(params[:id])
      return render json: {message: 'Comment successfully updated!',
                           comment: new_comment}
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
      :user_name
    )
  end

end
