class API::DocumentsController < ApplicationController
  respond_to :json
  before_action :authenticate_user!

  def create
    document = Document.new(document_params)
    begin
      saved = document.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render json: {message: 'Invalid document'}
    end

    if saved
      flash[:success] = "Document successfully created!";
      return render json: {message: 'Document successfully created!',
                           case: _case}
    else
      return render json: {error: _case.errors.full_messages,
                           status: 500}
    end
  end

  def document_params
    params.require(:document).permit(
      :client_id,
      :pdf
    )
  end
end
