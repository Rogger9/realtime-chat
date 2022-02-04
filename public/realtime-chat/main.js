// eslint-disable-next-line no-undef
const socket = io()
const $formChat = document.getElementById('formChat')

socket.on('message', message => {
  console.log(message)
})

$formChat.addEventListener('submit', (e) => {
  e.preventDefault()
  const msg = e.target.messageChat.value
  socket.emit('chatMessage', msg)
})
