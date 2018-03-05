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

  def num_unread_notification
    num_unread = 0
    current_user.notifications.each do |n|
      if not n.read
        num_unread += 1
      end
    end

    return num_unread
  end
end
