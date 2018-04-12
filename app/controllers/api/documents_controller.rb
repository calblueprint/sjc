class API::DocumentsController < ApplicationController
  respond_to :json
  before_action :authenticate_user!

  def show
    if params[:id]
      document = Document.find(params[:id])
      return render json: {message: 'Document successfully created!', document: document}
    end
  end

  def create
    document = Document.new(document_params)
    begin
      saved = document.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render json: {message: 'Invalid document'}
    end

    if saved
      flash[:success] = "Document successfully created!";
      puts("Document successfully created!")
      puts(document)
      puts({"message": 'Document successfully created!', "document": document})
      return render json: {"message": 'Document successfully created!', "document": document}
    else
      return render json: {"error": _case.errors.full_messages}, status: 500
    end
  end

  def destroy
    document = Document.find(params[:id])
    if document.destroy
      return render json: {message: 'Document successfully deleted!'}
    else
      return render json: {error: document.errors.full_messages}
    end
  end

  def document_params
    params.require(:document).permit(
      :case_id,
      :pdf
    )
  end
end
