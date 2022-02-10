function getHour () {
  const hour = new Date()
  return hour.getHours() + ':' + hour.getMinutes()
}

const formatMessage = (name, text) => {
  return { name, text, time: getHour() }
}

module.exports = formatMessage
