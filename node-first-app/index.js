const express = require('express');
const app = express();

// everytime a request hits our server, app.use executes
app.use(() => {
    console.log('new request received');
})

// the server is setup on localhost:3000
app.listen(3000, () => {
    console.log('listening on port 3000');
});