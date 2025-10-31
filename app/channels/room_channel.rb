# app/channels/room_channel.rb

class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room"
  end

  # This method is called via roomChannel.perform("speak", ...) from the client JS
  def speak(data)
    # The 'data' hash contains the arguments sent from the client: { message: "..." }
    
    # Broadcast the received message back to all clients connected to the "room" stream
    ActionCable.server.broadcast("room", { 
      message: data["message"], 
      sender: "Client User", # Placeholder name
      time: Time.now 
    })
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end