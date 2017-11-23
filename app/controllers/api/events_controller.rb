class API::EventsController < ApplicationController
  respond_to :json

  def index
    events = Event.all
    render json: events
  end

  def create
    tasks = []
    event = Event.new(event_params)

    if event.save!
      templates = TaskTemplate.where(event_type_id: params[:event_type_id])
      templates.each do |temp|
        due_date = nil
        event_date = params[:start_time].to_datetime
        if temp.prior
          due_date = event_date - temp.completion_time
        else
          due_date = event_date + temp.completion_time
        end

        tasks.push({
          description: temp.description,
          due_date: due_date,
          client_id: params[:client_id].to_i
        })
      end
      new_tasks = Task.create(tasks)
      user = User.find(params[:user_id])
      user.tasks.concat(new_tasks)
      render json: Event.all
    else
      render {json: event.errors.full_messages, :status => 422}
    end
  end

  def create_event_type
    event_type = EventType.new({name: params[:name]})
    if event_type.save!
      templates = []
      params[:task_templates].each do |temp|
        puts temp
        completion_time = temp[:days].to_i.days
        templates.push({
          description: temp[:description],
          completion_time: completion_time,
          prior: temp[:prior],
          event_type: event_type
        })
      end
      TaskTemplate.create(templates)
      return render json: EventType.all
    else
      return render json: {error: event_type.errors.full_messages,
                           status: 422}
    end
  end

  def index_event_types
    event_types = EventType.all
    render json: event_types
  end

  def create_task_templates
    templates = []
    event_type = EventType.find(params[:event_type_id])
    params[:task_templates].each do |temp|
      completion_time = (temp.days.to_i).days
      templates.push({
        description: temp.description,
        completion_time: completion_time,
        prior: temp.prior,
        event_type: event_type
      })
    end
    TaskTemplate.create(templates)
  end 

  def event_params
    params.permit(
      :name,
      :location,
      :event_type_id,
      :start_time,
      :end_time,
      :user_id,
    )
  end
end