#!/usr/bin/env node

const awsIot    = require('aws-iot-device-sdk');
const coap      = require('coap')
require('dotenv').config();

const device = awsIot.device({
  keyPath: process.env.AWS_IOT_KEY_PATH,
  certPath: process.env.AWS_IOT_CERT_PATH,
  caPath: process.env.AWS_IOT_CA_PATH,
  clientId: process.env.AWS_IOT_CLIENT_ID,
  host: process.env.AWS_IOT_HOST
});

const server    = coap.createServer()
server.listen(function() {
    console.log('server started')
  })

server.on('request', function(req, res) {
    try{
        console.log("--------------new msg-----------------")
        console.log(`msgId: ${req._packet.messageId}`)
        console.log(`ip: ${req.rsinfo.address}`)
        console.log(`url: ${req.url}`)
        console.log(`method: ${req.method}`)
        console.log(`headers: ${JSON.stringify(req.headers)}`)
        console.log(`payload: ${req.payload}`)

        // removes leading "/"
        const url = req.url.substring(1);
        if(url.startsWith(process.env.TOPIC_META) || url.startsWith(process.env.TOPIC_ERROR) || url.startsWith(process.env.TOPIC_TL)|| url.startsWith(process.env.TOPIC_COAP_TEST)){
            console.log(">>> sending to AWS IoT");
            console.log(`>>> topic: ${url}`);
            console.log(`>>> payload: ${req.payload}`);
            device.publish(url, req.payload);
        }

        res.end("serverACK")
    } catch (err){
        console.log("Exception occurred: " + err)
    }
})

device.on('connect', function() {
  console.log('Connected to AWS IoT');
  
});
