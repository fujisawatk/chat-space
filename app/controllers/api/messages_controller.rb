class Api::MessagesController < ApplicationController
  def index 
    @group = Group.find(params[:group_id])
    @messages = @group.messages.includes(:user).where('id > ?', params[:message][:id])
  end
end