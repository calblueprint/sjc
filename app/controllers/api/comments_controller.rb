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
      comment.details = comment.user_name.concat(" " + comment.created_at)
      saved = comment.save!

      if saved
        user_ids = params[:mentioned_users]
        for user_id in user_ids
          user = User.where(id: user_id).first
          self.notify(user, comment)
        end
      end

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

  def notify(user, comment)
    # user = User.find(user.id)
    # comment = Comment.find(comment.id)
    # a = user.comments << comment
    n = Notification.create(
      notification_type: Notification.types[:mentioned],
      user: user,
      notified_by: current_user,
      notifiable: comment,
    )
    return 'User sent mentioned notification!'
    # render(:json => {:message => 'User sent mentioned notification!'}.to_json)
  end

  def comment_params
    params.require(:comment).permit(
      :id,
      :user_id,
      :content,
      :thread_id,
      :client_id,
      :created_at,
      :updated_at,
      :user_name,
      :details,
    )
  end

end
