import { defineStore } from 'pinia'
import { io } from 'socket-io-client'

export const socketStore = defineStore('socket', {
  state: () => ({
    connected: false,
  }),
  actions: {
    connect() {
      const socket = io('http://localhost:3000')
      console.log('connecting socket')

      socket.on('connect', () => {
        console.log('socket connected')
        this.connected = true
      })

      socket.on('disconnect', () => {
        console.log('socket disconnected')
        this.connected = false
      })

      setInterval(() => {
        socket.emit('time', new Date()).toTimeString()
      }, 1000)
    },
  }
})
