require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2')
const PORT = process.env.PORT || 3009;

console.log("my", process.env.MYSQL_DATABASE)

const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});


app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}));


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
};



app.get('/api/get', (req, res) => {
    const sqlGet = "SELECT * FROM dividend_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});


app.post("/api/post", (req, res) => {
    const {stock, shares} = req.body;
    const sqlInsert = "INSERT INTO dividend_db (stock, shares) VALUES (?, ?)";
    db.query(sqlInsert, [stock, shares], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});


app.get("/api/get/:id", (req, res) => {
    const {id} = req.params;
    const sqlGet = "SELECT * FROM dividend_db WHERE id = ?";
    db.query(sqlGet, id, (err, result) => {
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});


app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM dividend_db WHERE id  = ?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    })
})


// app.get("https://stockapi-rskk.onrender.com/api/", (req, res) => {
    
// }) 


app.put("/api/update/:id", (req, res) => {
    const {id} = req.params;
    const {stock, shares} = req.body;
    // const sqlUpdate = "UPDATE dividend_db SET stock = ?, shares = ?, total = ? WHERE id = ?";
    const sqlUpdate = "UPDATE dividend_db SET stock = ?, shares = ? WHERE id = ?";
    db.query(sqlUpdate, [stock, shares, id], (err, result) => {
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

app.get("/", (req, res) => {
    // const sqlInsert = "INSERT INTO dividend_db (stock, name, shares, total) VALUES ('aapl', 'Apple', 1, 5)";
    // db.query(sqlInsert, (err, result) => {
    //     console.log("error", err);
    //     console.log("result", result);
    //     res.send("Hello Express");
    // })
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});


// //route for index page
// app.get("/", function (req, res) {
// });

// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//     }
//   };

// app.get('/api/get', (req, res) => {
//     console.log("RUNNING")
//     stock = req.query.stock;


//     fetch(`https://stockapi-rskk.onrender.com/api/${stock}`, options)
//     .then(response => response.json())
//     .then(response => {

//     })
// })