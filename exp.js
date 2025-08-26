let exp = require('express')
let bd = require('body-parser')
let fs = require("fs");
const cors = require('cors');
const { log } = require('console');

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
app.get("/home/:pid", (req, res) => {
    console.log(req.params.pid);
    const oldData = JSON.parse(fs.readFileSync("cars.json", "utf8"));
    const getData = oldData.find((data) => data.id === Number(req.params.pid));
    
    res.send(getData)
})
app.post("/home", (req, res) => {
    const request = req.body
    const oldList = JSON.parse(fs.readFileSync("cars.json", "utf8"));
    oldList.push(request);
    fs.writeFileSync("cars.json", JSON.stringify(oldList, null, 2));
    res.send(oldList)
})
app.delete("/home/:pid", (req, res) => {
    // let { name, email, phone } = req.body

    res.send(req.params.pid)
})
app.put("/home", (res, req) => {
    console.log(res);
    req.send()
})

app.listen(9900)
console.log("-> Local: http://localhost:9900/");
