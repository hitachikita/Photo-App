var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: false });
var cors = require('cors');
app.use(bodyParser.json())
app.listen(5000, function () {
    console.log('Node server running @ http://localhost:5000');
});

app.use(cors());

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "photo_app"
});

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!!!")
// });

app.post('/checklogin', parser, function (req, res) {
    const data = {
        email: req.body.email,
        password: req.body.password,
    }

    //con.connect(function (err) {
    //if (err) throw err;
    const sql = `SELECT * FROM users WHERE email='${data.email}' and password='${data.password}'`;
    console.log("Email: ", data.email);
    console.log("Password: ", data.password);

    con.query(sql, function (errors, results) {
        if (errors) throw errors;
        console.log(results);

        if (results.length == 0) {
            res.status(200).send({
                correct: false
            });
        } else {
          const sql = `SELECT * FROM photo WHERE email='duongthanhbinhfb@gmail.com'`;
          // const sql = `SELECT * FROM photo WHERE email='${data.email}'`;
          var photos = {};
          con.query(sql, function(erro, resu) {
            if (erro) throw erro;
            console.log("photo:.. ",resu);

            if (resu.length > 0) {
              photos = resu;
            }
            const data = results.forEach(result => {
                res.status(200).send({
                  correct: true,
                  data: result,
                  photos: photos,
                });
            });

          });
        }
    })
    //});
})

app.post('/insert', parser, function(req, res) {
  const value = {
    id: res.body.id.toString(),
    categoryId: res.body.categoryId.toString(),
    photo: res.body.photo.toString(),
    title: res.body.title.toString(),
  };
    const sql = "INSERT INTO photo (email, id, categoryId, photo, title) VALUES ('duongthanhbinhfb@gmail.com', '91176', '5', 'https://picsum.photos/id/532/300/300', 'Enim laboris dolore consectetur et fugiat do amet eiusmod anim proident do culpa irure consectetur.')";

    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
        con.query(sql, function(errors, results) {
          if (errors) throw errors;
          console.log(results);
        })
    })
})

// con.connect(function (err) {
//     if (err) throw err;
//     var sql = "SELECT * FROM `users`";
//     con.query(sql, function (err, results) {
//         if (err) throw err;
//         console.log(results);
//     })
// });
