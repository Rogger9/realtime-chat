function pad(number) {
  return number < 10 ? `0${number}` : number
}

function getHour() {
  const hour = new Date()
  return pad(hour.getHours()) + ':' + pad(hour.getMinutes())
}

const formatMessage = (name, text) => {
  return { name, text, time: getHour() }
}

module.exports = formatMessage
