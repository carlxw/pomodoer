const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());
const port = 8000;
const p = require("body-parser");
app.use(p.json())

app.get("/", (req, res) => {
    res.send("HI")
});

app.post("/upload", (req, res) => {
    console.log(req.body.link)
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});