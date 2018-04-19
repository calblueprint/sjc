class EventsController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def all_events
    @user = current_user
    @clients = Client.all
  end
end
