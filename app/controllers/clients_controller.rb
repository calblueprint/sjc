class ClientsController < ApplicationController
  load_and_authorize_resource

  def all_clients
  end

  def view
    @client = Client.find(params[:client_id])

    # The below query takes the comments related to the client and first orders them by thread_id and comment.id ascending
    # Then it transforms the array [Comment(id1, thread_id1), Comment(id2, thread_id1), Comment(id3, thread_id2) ... ] into
    # the hash {thread_id1 => [comment_id1, comment_id2], thread_id2 => [comment_id3] ... }
    threads = Comment.where('client_id = ?', params[:client_id]).order(:thread_id, :id).group_by{ |c| c.thread_id }

    # Transforms the hash {thread_id1 => [comment_id1, comment_id2], thread_id2 => [comment_id3] ... }
    # into [[comment_id1, comment_id2], [comment_id3], ... ]
    @comments = threads.values
  end

  def profile
    @client = Client.find(params[:client_id])

    # The below query takes the comments related to the client and first orders them by thread_id and comment.id ascending
    # Then it transforms the array [Comment(id1, thread_id1), Comment(id2, thread_id1), Comment(id3, thread_id2) ... ] into
    # the hash {thread_id1 => [comment_id1, comment_id2], thread_id2 => [comment_id3] ... }
    threads = Comment.where('client_id = ?', params[:client_id]).order(:thread_id, :id).group_by{ |c| c.thread_id }

    # Transforms the hash {thread_id1 => [comment_id1, comment_id2], thread_id2 => [comment_id3] ... }
    # into [[comment_id1, comment_id2], [comment_id3], ... ]
    @comments = threads.values
  end

  def edit
    @client = Client.find(params[:client_id])

    # The below query takes the comments related to the client and first orders them by thread_id and comment.id ascending
    # Then it transforms the array [Comment(id1, thread_id1), Comment(id2, thread_id1), Comment(id3, thread_id2) ... ] into
    # the hash {thread_id1 => [comment_id1, comment_id2], thread_id2 => [comment_id3] ... }
    threads = Comment.where('client_id = ?', params[:client_id]).order(:thread_id, :id).group_by{ |c| c.thread_id }

    # Transforms the hash {thread_id1 => [comment_id1, comment_id2], thread_id2 => [comment_id3] ... }
    # into [[comment_id1, comment_id2], [comment_id3], ... ]
    @comments = threads.values
  end

  def view_case
    @client = Client.find(params[:client_id])
    @case = Case.find(params[:case_id])

    # The below query takes the comments related to the client and first orders them by thread_id and comment.id ascending
    # Then it transforms the array [Comment(id1, thread_id1), Comment(id2, thread_id1), Comment(id3, thread_id2) ... ] into
    # the hash {thread_id1 => [comment_id1, comment_id2], thread_id2 => [comment_id3] ... }
    threads = Comment.where('client_id = ?', params[:client_id]).order(:thread_id, :id).group_by{ |c| c.thread_id }

    # Transforms the hash {thread_id1 => [comment_id1, comment_id2], thread_id2 => [comment_id3] ... }
    # into [[comment_id1, comment_id2], [comment_id3], ... ]
    @comments = threads.values
  end

  def client_stage
    if params[:client_id]
      @client = Client.find(params[:client_id])
      @stage = @client.stage
    end
  end

  def tasks
    @client = Client.find(params[:client_id])

    # The below query takes the comments related to the client and first orders them by thread_id and comment.id ascending
    # Then it transforms the array [Comment(id1, thread_id1), Comment(id2, thread_id1), Comment(id3, thread_id2) ... ] into
    # the hash {thread_id1 => [comment_id1, comment_id2], thread_id2 => [comment_id3] ... }
    threads = Comment.where('client_id = ?', params[:client_id]).order(:thread_id, :id).group_by{ |c| c.thread_id }

    # Transforms the hash {thread_id1 => [comment_id1, comment_id2], thread_id2 => [comment_id3] ... }
    # into [[comment_id1, comment_id2], [comment_id3], ... ]
    @comments = threads.values
  end

  def create_task
    client = Client.find(params[:client_id])
    Task.create(params)
    tasks = client.tasks.where(:completed_status => 0).order(:due_date)
    render json: {"tasks": tasks, "completed": false, "hide": false}
  end

  def update_tasks
    client = Client.find(params[:client_id])
    task = Task.update(params)
    if task.client.id != client.id
      hide = true
    else
      hide = false
    end
    if task.active?
      tasks = client.tasks.where(:completed_status => 0).order(:due_date)
      render json: {"tasks": tasks, "completed": false, "hide": hide}
    else
      tasks = client.tasks.where(:completed_status => 1).order(updated_at: :desc)
      render json: {"tasks": tasks, "completed": true, "hide": hide}
    end
  end

  def all_clients
  end

  def new
  end
end
