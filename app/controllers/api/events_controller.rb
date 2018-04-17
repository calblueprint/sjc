class API::EventsController < ApplicationController
  respond_to :json

  def index
    events = Event.all
    render json: events
  end

  def create
    # tasks = []
    # event = Event.new(event_params)
    #
    # if event.save!
    #   templates = TaskTemplate.where(event_type_id: event.event_type_id)
    #   templates.each do |temp|
    #     due_date = nil
    #     event_date = event.start_time.to_datetime
    #     completion_time_days = temp.completion_time.to_i.days
    #     if temp.prior
    #       due_date = event_date - completion_time_days
    #     else
    #       due_date = event_date + completion_time_days
    #     end
    #
    #     tasks.push({
    #       title: temp.title,
    #       description: temp.description,
    #       due_date: due_date,
    #       client_id: params[:client_id].to_i,
    #       user_id: event.user_id,
    #       current_user_id: event.user_id
    #     })
    #   end
    #   #new_tasks = Task.create(tasks)
    #   user = User.find(event.user_id)
    #   created_tasks = tasks.map { |task| Task.create(task)}
    #   user.tasks.concat(created_tasks)
    #   render json: Event.all
    # else
    #   return render json: {error: event.errors.full_messages,
    #                        status: 422}
    # end

    event = Event.new(event_params)

    if event.save!
      templates = TaskTemplate.where(event_type_id: event.event_type_id)
      templates.each do |temp|
        due_date = nil
        event_date = event.start_time.to_datetime
        completion_time_days = temp.completion_time.to_i.days
        if temp.prior
          due_date = event_date - completion_time_days
        else
          due_date = event_date + completion_time_days
        end
        # task_params = {
        #   title: temp.title,
        #   description: temp.description,
        #   due_date: due_date,
        #   client_id: params[:client_id].to_i,
        #   user_id: event.user_id,
        #   current_user_id: event.user_id
        # }
        #
        # t = Task.create(task_params.to_json)

        task = Task.new(:client_id => params[:client_id].to_i, :description => temp.description, :title => temp.title, :due_date => due_date)
        saved = task.save!
        user_id = event_params[:user_id]
        Task.assign(user_id, task.id, user_id)
      end
      #new_tasks = Task.create(tasks)
      # user = User.find(event.user_id)
      # created_tasks = tasks.map { |task| Task.create(task)}
      # user.tasks.concat(created_tasks)
      #render json: Event.all

      # user = User.find(event_params[:user_id])
      # tasks = user.tasks.where(:completed_status => 0).order(:due_date)
      # tasks = tasks.map { |task| TaskSerializer.new(task)}
      # render json: tasks

      render json: Event.all

    else
      return render json: {error: event.errors.full_messages,
                           status: 422}
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
          title: temp[:title],
          description: temp[:description],
          completion_time: temp[:days],
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
    params.require(:event).permit(
      :name,
      :location,
      :event_type_id,
      :start_time,
      :end_time,
      :user_id
    )
  end
end
