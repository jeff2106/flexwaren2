import Pusher from 'pusher-js/react-native'
import { PlaySound } from '@/Containers/Utils/index'
import React from 'react'

async function Pushers(channel,event) {
  const [count, setCount] = React.useState(0)
  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = false

  var pusher = new Pusher('e4ad133537d71dc9e689', {
    cluster: 'mt1',
  })

  var channel = pusher.subscribe('my-channel')
  channel.bind('my-event', function (data) {
    setCount(prev => prev + 1)
    if (count == 1) {
      //alert(JSON.stringify(data))
      PlaySound()
    }
    return data
  })
  const TimeOut = setInterval(() => {
    setCount(0)
  }, 0)
  return clearInterval(TimeOut)
}

export default Pushers
