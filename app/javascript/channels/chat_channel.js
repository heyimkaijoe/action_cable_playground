import consumer from "channels/consumer"

const chatConsumer = consumer.subscriptions.create({ channel: "ChatChannel", room: "general" }, {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("Connected")
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    if (data['msg']) {
      const msgContainer = document.getElementById('messages')
      const msgElement = document.createElement('div')

      msgElement.innerText = data['msg']
      msgContainer.appendChild(msgElement)
    }
  },

  sendToChat(msg) {
    this.perform('send_to_chat', { msg: msg })
  },
})

document.addEventListener('DOMContentLoaded', (e) => {
  const inputField = document.getElementById('chat-input')

  inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      const msg = inputField.value
      chatConsumer.sendToChat(msg)
      inputField.value = ''
    }
  })
})
