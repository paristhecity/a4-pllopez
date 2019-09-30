//express initializetion
const express = require("express");
const app = express();
const port = 3000;

//helmet initialization
const helmet = require("helmet");
app.use(helmet());

//compression initialization
var compression = require("compression");
app.use(compression());


const dir = "public/";
app.use(express.static(dir));


//POST REQUESTS

//GET REQUESTS

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

