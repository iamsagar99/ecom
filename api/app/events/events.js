// Bi directional Communication
const event = require("events");
const myEvent = new event()

// listener
myEvent.on('registerEvent', (data) => {
    // email 
    console.log("On connect event: ", data);
    // myEvent.emit("send",{})
    // push noti, email
})

module.exports = myEvent;