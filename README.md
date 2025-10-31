# action_cable_demo

This is a scratchpad application for me to learn to use ActionCable and Websockets effectively. It's just a simple playground that will be built up into a full chatroom app, converted to a React frontend, then merged into [Narratree](https://github.com/atshaw1994/Narratree).

---

### Screenshot

This screenshot was taken while using two seperate browser instances. The first was used to send messages 1, 2, and 3. The second was used to send message 4.

![Screenshot](Screenshot.png)

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Ruby** (version 3.1 or newer recommended)
- **Ruby on Rails** (version 7.x)
- **Redis Server** (Absolutely required for development)

### 🔴 Critical Requirement: Running Redis

This application uses the **Redis adapter** for Action Cable broadcasting in the development environment, which requires the Redis server to be running locally.

**Installation (macOS via Homebrew):**

```bash
brew install redis
brew services start redis
```

## ⚙️ Setup and Installation

Follow these steps to get the application running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/aaron/action_cable_demo.git
cd action_cable_demo
```

### 2. Install Dependencies

```bash
bundle install
```

### 3. Database Setup

```bash
rails db:create
rails db:migrate
```

## ▶️ Running and Testing the Application

The demo requires two separate processes to test real-time communication: the Rails server (Puma) and the Rails console.

### 1. Start the Rails Server

Open your first terminal window and start the application server:

```bash
rails s
```

The server will be running at [http://localhost:3000](http://localhost:3000).

### 2. Start the Rails Console (Broadcaster)

Open a second terminal window and start the Rails console for server-side testing:

```bash
rails c
```

### 3. Test the Real-Time Chat Loop

- Open your browser to [http://localhost:3000](http://localhost:3000).  
   (Open a second tab or window to simulate a second user!)
- Use the chat input form on the webpage to send a message (e.g., "Hello world!").
- **Verify:** The message should instantly appear in the message list on all connected browser tabs.

### 4. Test Broadcast from the Server

In your Rails console, run the following command to broadcast a message:

```ruby
ActionCable.server.broadcast("room", { message: "System Alert: All hands on deck!", sender: "System", time: Time.now })
```

**Verify:** The "System Alert" message should instantly appear in the browser.
