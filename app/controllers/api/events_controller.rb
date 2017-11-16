class API::EventsController < ApplicationController
  respond_to :json

  def create_event_type
    event_type = EventType.new({name: params[:name]})
    if event_type.save!
      return render json: {message: 'Event successfully created!'}
    else
      return render json: {error: event_type.errors.full_messages,
                           status: 422}
    end
  end

  def index_event_types
    event_types = EventType.all
    render json: {event_types: event_types}
  end

  def create_task_templates
    templates = []
    event_type = EventType.find(params[:event_type_id])
    params[:task_templates].each do |temp|
      completion_time = temp.years.years + temp.months.months + temp.weeks.weeks + temp.days.days
      templates.push({
        description: temp.description,
        completion_time: completion_time.to_i,
        prior: prior,
        event_type: event_type
      })
    end
    TaskTemplate.create(templates)
  end

  def create
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