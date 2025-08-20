let server = require("http");
let fs = require("fs");
let url = require("url");

// let app = server.createServer((req, res) => {
//     let q = url.parse(req.url, true)
//     console.log(q)
//     if (req.url == "/") {
//         res.write("<html><body><b>This is admin Page.</b></body><br/></html>")
//         res.end('ended')
//     } else if (q.pathname == "/home") {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write(JSON.stringify(q.query))
//         // res.write("<html><body><p>This is home Page.</p></body></html>")
//         res.end()
//     } else if (req.url == "/json") {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.write(JSON.stringify({ message: "This is Json stringify format" }))
//         res.end();
//     } else if (req.url === '/api/list' && req.method === "GET") {
//         console.log(req.method);
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.write(JSON.stringify({ message: `${req}` }))
//         res.end();
//     } else {
//         res.write("welcome server")
//         res.end()
//     }
// })

// const file = fs.readFile("Text.txt", function (err, data) {
//     if (err) {
//         throw err
//     }
// })

// // const data = fs.readFileSync("Text.txt", "utf8")
// // console.log('new',data);

// // fs.writeFile('NewText.txt', 'Welcome to Txt File', function (err) {
// //     if (err) {
// //         throw err
// //     } else {
// //         console.log('Write Process completed');
// //     }
// // })

// // fs.appendFile('Text.txt', 'This is appened now', function (err) {
// //     if (err) {
// //         throw err
// //     } else {
// //         const data = fs.readFileSync("Text.txt", "utf8")
// //     }
// // })

let app = server.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  let newReq = url.parse(req.url, true);

  if (req.url == "/") {
    res.write("<html><body><b>This is admin Page.</b></body><br/></html>");
    res.end("ended");
  } else if ((req.url === "/students") & (req.method === "GET")) {
    fs.readFile("student.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      res.end(data);
    });
  } else if (newReq.pathname === "/students/add") {
    const newData = JSON.parse(newReq.query.data);
    const oldData = JSON.parse(fs.readFileSync("student.json", "utf8"));

    const exist = oldData.some((profile) => profile.id === newData.id);
    const passwordExist = oldData.some(
      (profile) => profile.password === newData.password
    );

    if (exist) {
      res.writeHead(409, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Student with this ID already exists" }));
      return;
    }

    if (passwordExist) {
      res.writeHead(409, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Password already exists" }));
      return;
    }

    if (!exist && !passwordExist) {
      oldData.push(newData);

      fs.writeFileSync("student.json", JSON.stringify(oldData, null, 2));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        message: "Student added successfully",
        student: newData
      }));
    }
  } else if (newReq.pathname === "/students/signIn") {
    const oldData = JSON.parse(fs.readFileSync("student.json", "utf8"));
    const newData = JSON.parse(newReq.query.data);
    const user = oldData.find(user => user.name.toLowerCase() === newData.name.toLowerCase() && user.password === newData.password)
    if (user) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        success: true,
        message: "Login successfully",
      }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        success: false,
        message: "No User Found"
      }));
    }
  } else if (newReq.pathname === "/students/delete") {
    const deleteData = JSON.parse(newReq.query.data);
    const oldData = JSON.parse(fs.readFileSync("student.json", "utf8"));
    const updatedData = oldData.filter(student => student.id !== deleteData.id);

    if (oldData.length === updatedData.length) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Student not found" }));
      return;
    }
    fs.writeFileSync("student.json", JSON.stringify(updatedData, null, 2));

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Student deleted successfully" }));
  } else if (newReq.pathname === "/students/editPassword") {
    const reqData = JSON.parse(newReq.query.data);
    const { id, password } = reqData;

    const studentList = JSON.parse(fs.readFileSync("student.json", "utf8"));
    const index = studentList.findIndex(student => student.id === id);
    studentList[index].password = password;

    fs.writeFileSync("student.json", JSON.stringify(studentList, null, 2));

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Password updated successfully" }));
  }
  else {
    res.write("welcome server");
    res.end();
  }
});

app.listen(9000);
console.log("-> Local: http://localhost:9000/");
