import Pusher from 'pusher-js/react-native'
import { PlaySound } from '@/Containers/Utils/index'
import React from 'react'

function Pushers(channel, event) {
  const [count, setCount] = React.useState(0)
  const [value, setValue] = React.useState()
  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = false

  var pusher = new Pusher('e4ad133537d71dc9e689', {
    cluster: 'mt1',
  })

  var channel = pusher.subscribe(channel)
  channel.bind(event, function (data) {
    setCount(prev => prev + 1)
    PlaySound()
    if (count == 1) {
      PlaySound()
    }
    setValue(data)
  })

  const TimeOut = setInterval(() => {
    setCount(0)
  }, 0)

  clearInterval(TimeOut)
  function data() {
    return value
  }
}

export default Pushers
