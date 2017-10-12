class UsersController < ApplicationController
  def view_tasks
	@user = current_user
	@tasks = @user.tasks
  end
end
