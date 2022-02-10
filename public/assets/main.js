// eslint-disable-next-line no-undef
const socket = io()
const $formChat = document.getElementById('formChat')
const templateMessage = document.getElementById('templateMessage').content
const fragment = document.createDocumentFragment()
const $messageContainer = document.getElementById('messageContainer')
const $roomName = document.getElementById('roomName')
const $listUsers = document.getElementById('listUsers')

const loginData = window.location.search
const username = loginData.match(/username=\w+/)[0].replace(/username=/, '')
const room = loginData.match(/rooms=\w+/)[0].replace(/rooms=/, '')

socket.emit('joinRoom', { username, room })

socket.on('roomUsers', ({ room, users }) => {
  addRoomName(room)
  showListUsers(users)
})

socket.on('message', ({ name, text, time }) => {
  createMessage(name, text, time)
  $messageContainer.scrollTop = $messageContainer.scrollHeight
})

$formChat.addEventListener('submit', (e) => {
  e.preventDefault()
  const msg = e.target.messageChat.value
  socket.emit('chatMessage', msg)
  e.target.messageChat.value = ''
  e.target.messageChat.focus()
})

function createMessage (name, msg, time) {
  templateMessage.querySelector('#nameMessage').textContent = name
  templateMessage.querySelector('#timeMessage').textContent = time
  templateMessage.querySelector('#textMessage').textContent = msg
  const clone = templateMessage.cloneNode(true)
  fragment.appendChild(clone)
  return $messageContainer.appendChild(fragment)
}

function addRoomName (name) {
  $roomName.textContent = name.toUpperCase()
}

function showListUsers (users) {
  $listUsers.innerHTML = `
    ${users.map(({ username }) => `<li>${username}</li>`).join('')}
  `
}
