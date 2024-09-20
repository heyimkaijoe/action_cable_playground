class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_to_chat(data)
    Message.create!(body: data["msg"])
    ActionCable.server.broadcast("chat_#{params[:room]}", data)
  end
end
