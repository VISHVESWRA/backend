let exp = require('express')
let bd = require('body-parser')
let fs = require("fs");

let app = exp()
app.use(bd.json())
app.use(bd.urlencoded())


app.get("/", (req, res) => {
    res.send("welcome")
})
app.get("/home", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    console.log('car list');

    const oldData = JSON.parse(fs.readFileSync("cars.json", "utf8"));
    res.send(oldData);
})
app.get("/read/:pid", (req, res) => {

    res.send(req.params.pid)
})
app.get("/reads", (req, res) => {
    res.send(req.query)
})
app.post("/reads", (req, res) => {
    let { name, email, phone } = req.body
    res.send(req.body)
})


app.listen(9900)
console.log("-> Local: http://localhost:9900/");
