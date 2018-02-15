class API::ClientsController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def show
    if params[:id]
      @client = Client.find(params[:id])
      render json: @client
    end
  end

  def index
    clients = Client.all
    render json: clients
  end

  def create
    puts client_params
    client = Client.new(client_params)
    begin
      saved = client.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render json: {message: 'Invalid client'}
    end
    if saved
      client = Client.find(params[:id])
      return render json: {message: 'Client successfully created!',
                           client: client}
    else
      return render json: {error: client.errors.full_messages,
                           status: 422}
    end
  end

  def destroy
    client = Client.find(params[:id])
    if client.destroy
      return render json: {message: 'Client successfully deleted!'}
    else
      return render json: {error: client.errors.full_messagese}
    end
    # head 204
  end

  def update
    begin
      client = Client.find(params[:id])
      a = client.update(client_params)
    rescue
      return render json: {error: "Forbidden"}
    end
    if a
      new_client = Client.find(params[:id])
      return render json: {message: 'Client successfully updated!',
                           client: new_client}
    else
      return render json: {error: client.errors.full_messages}
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
      :case_id,
      :stage
    )
  end


end
