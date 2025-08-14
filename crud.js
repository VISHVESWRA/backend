let http = require('http');
let fs = require('fs')

let server = http.createServer((req, res) => {

    if (req.url == "/") {
        res.write("<html><body><b>This is admin Page.</b></body><br/></html>")
        res.end('ended')
    } else if (requ.url == "/students") {
        console.log('fetch');
        res.write("<html><body><b>This is admin Page.</b></body><br/></html>")
        res.end('ended')

        // fs.readFile('student.json', function (err, data) {
        //     if (err) {
        //         throw err
        //     }
        // })
    } else {
        res.write("welcome server")
        res.end()
    }
})

server.listen(5000);
console.log("-> Local: http://localhost:5000/")