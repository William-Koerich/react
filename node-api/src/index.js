const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const app = express()

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'fw007',
  database: 'alekids'
});

function getValuesProduct() {
  connection.connect();
  
  connection.query('SELECT pr_codseq as id, pr_descri as name, pr from tb_produto where pr_codseq < 23', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
  });
  
  connection.end();
}


app.use(cors())
app.use(express.json())

const db = [
  {
    "id": 1,
    "name": "Calça",
    "price": 10.0
  },

  {
    "id": 2,
    "name": "Camisa",
    "price": 20.0
  },

  {
    "id": 3,
    "name": "Bermuda",
    "price": 70.0
  }
]

app.get('/products', (req, res) => {
  return res.json(db).status(200)
})

app.listen(3004, () => console.log('Server runing'))