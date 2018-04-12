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

  def header_event?
    controller_name == "events" and action_name == "all_events"
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
