let exp = require('express')
let bd = require('body-parser')
let fs = require("fs");
const cors = require('cors');

let app = exp()
app.use(bd.json())
app.use(bd.urlencoded())
app.use(cors())


app.get("/", (req, res) => {
    res.send("welcome")
})
app.get("/home", (req, res) => {
    const oldData = JSON.parse(fs.readFileSync("cars.json", "utf8"));
    res.send(oldData);
})
app.get("/read/:pid", (req, res) => {
    res.send(req.params.pid)
})
app.post("/home", (req, res) => {
    // console.log(req.body);
    const request = req.body
    const oldList = JSON.parse(fs.readFileSync("cars.json", "utf8"));
    oldList.push(request);
    fs.writeFileSync("cars.json", JSON.stringify(oldList, null, 2));
    // res.send(req.query)
})
app.post("/reads", (req, res) => {
    let { name, email, phone } = req.body
    res.send(req.body)
})


app.listen(9900)
console.log("-> Local: http://localhost:9900/");
