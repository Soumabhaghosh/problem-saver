let express = require('express')
let mongodb = require('mongodb').MongoClient


let app = express()
let db
let port=process.env.PORT
if(port==null || port==""){
port=8000

}



app.use(express.json())
app.use(express.static(__dirname + '/public'));

const string = 'mongodb+srv://toappuser:ufg4tGLQogufmTlM@cluster0.vt8zr.mongodb.net/?retryWrites=true&w=majority'

mongodb.connect(string, { useNewUrlParser: true }, (err, client) => {
  db = client.db('todoapp')
  app.listen(port)
})

app.use(express.urlencoded({ extended: false }))


app.get('/', function (req, res) {

  db.collection("pets").find().toArray(function (err, items) { //returning an javascript array items very easy to work with

    res.send(`<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Problem Saver</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
      <link rel="stylesheet" href="/style.css">
      </head>
    <body>
    <div id="background" >
      <div class="container">
        <h1 id="heading" class="display-4  text-center py-1"><b>Problem Saver</b></h1>
        
        <div class="jumbotron p-3 shadow-sm">
          <form action="/creat-item" method="POST"> 
            <div class="d-flex align-items-center">
              <input placeholder="Type the problem name here" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
              <input placeholder="Paste the problem link here" name="link" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
              <button class="btn btn-primary">Add New Problem</button>
            </div>
          </form>
        </div>
        
        <ul class="list-group pb-5">
        ${items.map(function (item) {

      return `
            <a id="myAnchor" href="${item.link}"   target="_blank">
            
            <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
           <span class="item-text">${item.text}</span> 
           </a>
           <div>
              
              <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
            
          </li>
          
          
         
          `

    }).join('')}
        </ul>
        
      </div>
    </div>
      
    </body>
    
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="/browser.js"></script>
    </html>`)
  })


})
app.post('/creat-item', function (req, res) {
  if (req.body.item && req.body.link) {
    if (req.body.link.slice(0, 8) == "https://" || req.body.link.slice(0, 7) == "http://") {

      db.collection("pets").insertOne({ text: req.body.item, link: req.body.link }, function () {

        res.redirect('/')


      })



    }
    else {

      db.collection("pets").insertOne({ text: req.body.item, link: "https://" + req.body.link }, function () {

        res.redirect('/')


      })


    }





  }
  else {
    res.send(`<h2 >please enter name and a Link </h2>`)
  }


})

app.post('/update-item', function (req, res) {

  db.collection("pets").findOneAndUpdate({ _id: new require('mongodb').ObjectID(req.body.id) }, { $set: { text: req.body.text, link: req.body.link } }, function () {


    res.send("success")

  })
})


app.post('/delete-item', function (req, res) {

  db.collection("pets").deleteOne({ _id: new require('mongodb').ObjectID(req.body.id) }, function () {

    res.send("success")
  })




  // console.log(req.body.id);
})
