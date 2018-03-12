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

  def client_cases
    client = Client.find(params[:id])
    cases = client.cases
    render json: cases
  end

  def create
    client = Client.new(client_params)
    begin
      saved = client.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render json: {message: 'Invalid client'}
    end
    if saved
      client = Client.find(client.id)
      flash[:success] = "Client successfully created!";
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
      flash[:success] = "Client successfully deleted!";
      return render json: {message: 'Client successfully deleted!'}
    else
      flash[:error] = "Client unsuccessfully deleted";
      return render json: {error: client.errors.full_messages}
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
      flash[:success] = "Client successfully updated!";
      return render json: {message: 'Client successfully updated!',
                           client: new_client}
    else
      flash[:error] = "Client unsuccessfully updated";
      return render json: {error: client.errors.full_messages}
    end
  end

  def client_params
    params.require(:client).permit(
      :client,
      :id,
      :first_name,
      :last_name,
      :phone_number,
      :country,
      :state,
      :postal_code,
      :city,
      :street,
      :case_id,
      :stage,
      :education,
      :client_income,
      :family_income,
      :help,
      :court_date,
      :flee_country,
      :citizen_spouse,
      :citizen_child,
      :victim_crime,
      :living_w_parents,
      :initial_intake
    )
  end


end
