class API::EventsController < ApplicationController
  respond_to :json

  def create
    event = Event.new(params[:name])
    if event.save!
      return render json: {message: 'Event successfully created!'}
    else
      return render json: {error: event.errors.full_messages,
                           status: 422}
    end
  end

  def index
    events = Event.all
    render json: {events: events}
  end

  def create_task_templates
    templates = []
    event = Event.find(params[:event_id])
    params[:task_templates].each do |temp|
      completion_time = temp.years.years + temp.months.months + temp.weeks.weeks + temp.days.days
      templates.push({
        description: temp.description,
        completion_time: completion_time.to_i,
        prior: prior,
        event: event
      })
    end
    TaskTemplate.create(templates)
  end

  def schedule_event
    tasks = []
    templates = TaskTemplate.where(event_id: params[:event_id])
    templates.each do |temp|
      due_date = nil
      event_date = params[:event_date].to_datetime
      if temp.prior
        due_date = event_date - temp.completion_time
      else
        due_date = event_date + temp.completion_time

      tasks.push({
        descriptions: temp.description,
        due_date: due_date,
        client_id: params[:client_id]
      })
    end
    Task.create(tasks)
  end
end
