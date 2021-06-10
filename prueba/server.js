const express = require("express");
const app = express();
const routes = require('./routes/index')

//Settings
app.set('port', 3000);
const port = app.set('port')
app.use(routes);

//Middlewares
app.use(express.json());

//run server
app.listen(port, () => {
    console.log("server listen on port 3000")
})
