module ApplicationHelper
  def header_dashboard?
    controller_name == "users" and action_name == "dashboard"
  end

  def header_client?
    controller_name == "clients"
  end

  def header_notification?
    controller_name == "users" and action_name == "notifications"
  end
end
