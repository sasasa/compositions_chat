class MessagesController < ApplicationController
  before_action :authenticate_user!, only: ["index"]

  def index
    messages_array = Message.all_array
    render json: messages_array, status: :ok
  end
end
