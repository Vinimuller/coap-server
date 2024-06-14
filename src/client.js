#!/usr/bin/env node

const coap    = require('coap')
// const ip = '34.228.186.7'
const ip = 'localhost'
const port = '5683'
const path = '/test/topic'

const req = coap.request(`coap://${ip}:${port}/${path}`)

const payload = {
    title: 'this is a test payload',
    body: 'containing nothing useful'
}

req.write(JSON.stringify(payload))

req.on('response', (res) => {
  
    res.pipe(process.stdout)
  res.on('end', () => {
    console.log("rqst sent")
    process.exit(0)
  })

})

req.end()