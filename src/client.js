#!/usr/bin/env node

const coap    = require('coap')
// const ip = '34.228.186.7'
const ip = 'localhost'
const port = '5683'
const path = '/test/topic'


function sendRequest(num){
  req = coap.request(`coap://${ip}:${port}/${path}`)

  payload = {
      title: 'this is a test payload',
      body: num
  }
  
  req.write(JSON.stringify(payload))
  
  req.on('finish', (res) => {
    
      console.log(`finished ${num}`)
  })
  
  req.end()
}

sendRequest(1)
sendRequest(2)
sendRequest(3)
