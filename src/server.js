#!/usr/bin/env node

const coap    = require('coap')
const server  = coap.createServer()

server.on('request', function(req, res) {
    try{
        console.log("--------------new msg-----------------")
        console.log(`msgId: ${req._packet.messageId}`)
        console.log(`ip: ${req.rsinfo.address}`)
        console.log(`url: ${req.url}`)
        console.log(`method: ${req.method}`)
        console.log(`headers: ${JSON.stringify(req.headers)}`)
        console.log(`payload: ${req.payload}`)

        // res.end();
    } catch (err){
        console.log("Exception occurred: " + err)
        // res.end();
    }
})

server.listen(function() {
  console.log('server started')
})