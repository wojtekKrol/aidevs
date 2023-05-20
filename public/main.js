const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')
const chatBox = document.getElementById('chat-box')

messageForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const message = messageInput.value
  messageInput.value = ''
  appendMessage(`${message}`, 'you')
  fetch('http://localhost:3000/api/ask-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: 'user', content: message }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      appendMessage(`${data || 'No response'}`, 'ai')
    })
})

function appendMessage(message, sender) {
  const messageElement = document.createElement('div')
  messageElement.classList.add('message', sender)

  const textElement = document.createElement('span')
  textElement.innerText = message

  messageElement.appendChild(textElement)
  chatBox.append(messageElement)
}
