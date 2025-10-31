import consumer from "./consumer"

const roomChannel = consumer.subscriptions.create("RoomChannel", {
  connected() {
    console.log("Connected to RoomChannel!");
  },

  disconnected() {
    console.log("Disconnected from RoomChannel.");
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    console.log("Data received:", data);
    const messagesDiv = document.getElementById('messages');
    const p = document.createElement('p');
    p.textContent = `[${data.time || 'N/A'}] ${data.sender || 'System'}: ${data.message}`;
    messagesDiv.appendChild(p);
  },
  // You can also add custom functions here to call server actions, e.g.
  // speak: function(message) {
  //   return this.perform('speak', { message: message });
  // }

  send_message: function(message) {
    // Use 'perform' to call the 'speak' method on the server channel
    return this.perform("speak", { message: message });
  }
});

window.roomChannel = roomChannel;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('message-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop the default form submission

      const input = document.getElementById('message-input');
      const message = input.value;

      // Send the message via the Action Cable channel
      if (message.trim() !== "" && window.roomChannel) {
        window.roomChannel.send_message(message); // Calls the 'speak' method on server
        input.value = ''; // Clear the input field
      }
    });
  }
});