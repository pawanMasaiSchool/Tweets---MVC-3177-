const express = require('express');
const cors = require('cors');
const connect = require('./app/Utils/db');
const app = express();
const router = require('./app/routes');
const PORT = 2000;

app.use(cors())
app.use(express.json())
app.use("/",router)

const start = async () => {
    await connect();
    app.listen(PORT,()=>{
        console.log(`Listening at ${PORT}`);
    })
}

module.exports = start