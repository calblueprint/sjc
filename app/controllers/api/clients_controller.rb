class API::ClientsController < ApplicationController
  respond_to :json

  def show
    @client = Client.find(params[:id])
    render json: @client
  end

  def index
    clients = Client.all
    render json: clients
  end
  
  def create
    client = Client.new(client_params)
    begin
      saved = client.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render_json_message(:forbidden, errors: "Invalid client")
    end
    if saved
      render_json_message(:ok, message: 'Client successfully created!')
    else
      render_json_message(:forbidden, errors: client.errors.full_messages)
    end
  end

  def destroy
    client = Client.find(params[:id])
    if client.destroy
      render_json_message(:ok, message: 'Client successfully deleted!')
    else
      render_json_message(:forbidden, errors: client.errors.full_messages)
    end
    # head 204
  end

  def update
    begin
      client = Client.find(params[:id])
      a = client.update(client_params)
    rescue
      render_json_message(:forbidden)
      return
    end
    if a
      render_json_message(:ok, message: 'Client successfully updated!')
    else
      render_json_message(:forbidden, errors: client.errors.full_messages)
    end
  end

  def client_params
    params.permit(
      :id,
      :name,
      :phone_number,
      :country,
      :state,
      :postal_code,
      :city,
      :street,
      :case_id
    )
  end


end
