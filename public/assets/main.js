// eslint-disable-next-line no-undef
const socket = io()
const $formChat = document.getElementById('formChat')
const templateMessage = document.getElementById('templateMessage').content
const fragment = document.createDocumentFragment()
const $messageContainer = document.getElementById('messageContainer')

function addMessage (msg) {
  templateMessage.querySelector('#textMessage').textContent = msg
  const clone = templateMessage.cloneNode(true)
  fragment.appendChild(clone)
  return $messageContainer.appendChild(fragment)
}

socket.on('message', message => {
  addMessage(message)
  $messageContainer.scrollTop = $messageContainer.scrollHeight
})

$formChat.addEventListener('submit', (e) => {
  e.preventDefault()
  const msg = e.target.messageChat.value
  socket.emit('chatMessage', msg)
  e.target.messageChat.value = ''
  e.target.messageChat.focus()
})
