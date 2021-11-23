const path = require("path");
const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

//koneksi ke sql
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tugas_crud",
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log("Database sudah konek :V...");
});

app.set("views", path.join(__dirname, "views"));
// tempalte engine
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/assets", express.static(__dirname + "/public"));

//route halaman depon
app.get("/", (req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render("product_view", {
      results: results,
    });
  });
});

//untuk tambah data
app.post("/save", (req, res) => {
  let data = {
    nama: req.body.nama,
    NBI: req.body.NBI,
    jurusan: req.body.jurusan,
  };
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

//untuk update data
app.post("/update", (req, res) => {
  let sql =
    "UPDATE product set nama ='" +
    req.body.nama +
    "',NBI='" +
    req.body.NBI +
    "', jurusan ='" +
    req.body.jurusan +
    "' WHERE product_id =" +
    req.body.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

//untuk hapus data
app.post("/delete", (req, res) => {
  let sql = "DELETE FROM product WHERE product_id=" + req.body.product_id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

//server jagan dihapus ren :v
app.listen(8000, () => {
  console.log("Server berjalan di port 8000");
});
