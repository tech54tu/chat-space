class Api::MessagesController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json { @new_message = Message.where('id > ?', params[:id])}
    end
  end
end