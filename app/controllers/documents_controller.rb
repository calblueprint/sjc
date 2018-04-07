class DocumentsController < ApplicationController
  def view
  end

  def new
  end

  def fields
    # require 'pdf-forms'
    # require 'cliver'
    #
    # # Cliver makes it easy to find the path to command line utilities
    # pdftk = PdfForms.new(Cliver.detect('pdftk'))


    # fields = pdftk.get_fields('i-485-1-3.pdf').map do |field|
    #
    #   puts field.name_alt
    #   result = {}
    #   result[:pdf_name] = field.name
    #   result[:api_name] = field.name.downcase.gsub(' ', '').gsub('.', '')
    #   result[:type] = field.type.downcase
    #   result[:alt_text] = field.name_alt
    #   if field.respond_to?(:options) && !field.options.nil?
    #     result[:options] = field.options
    #   end
    #
    #   result
    # end

    # fields = pdftk.get_fields('i-485-1-3.pdf').map do |field|
    #   puts field.name_alt
    #   puts field.type
    # end
    #
    # render json: JSON.pretty_generate(fields)

    # @pdftk = PdftkForms::Wrapper.new
    # id = 1
    # fields = @pdftk.fields('i-485-1-3.pdf').map do |field|
    #   result = {}
    #   result[:id] = id
    #   result[:name] = field.name
    #   result[:type] = field.type
    #   result[:value] = field.value
    #   result[:alt_name] = field.alt_name
    #   result[:flags] = field.flags
    #   result[:field_type] = field.field_type
    #   result[:options] = field.options
    #   result[:required] = field.required?
    #
    #   id += 1
    #   result
    # end
    # puts fields
    # render json: fields

    @pdftk = PdftkForms::Wrapper.new
    id = 1
    #fields = @pdftk.fields('i-485-1-3-2-2.pdf').map do |field|
    fields = @pdftk.fields('app/assets/forms/eoir28.pdf').map do |field|
      # puts field.to_json
      # #puts field.to_json
      # result = {}
      # result[:id] = id
      # result[:name] = field.name
      # result[:type] = field.type
      # result[:value] = field.value
      # result[:alt_name] = field.alt_name
      # result[:flags] = field.flags
      # result[:field_type] = field.field_type
      # result[:options] = field.options
      # result[:required] = field.required?
      #
      # id += 1
      # result
      # field.to_json
      field
    end
    puts fields.to_json
    render json: fields.to_json
  end
end
