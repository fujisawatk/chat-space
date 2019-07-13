class MessagesController < ApplicationController
  def index
    @message = Message.new
  end

  def create
    Message.create(message_params)
  end



  private
  def message_params
    params.permit(:text, :image)
  end
end
