const express = require("express");
const cors = require("cors");
const msql = require("mysql2");
const app = express();
const bcrypt = require("bcryptjs"); // ← Make sure this line is there!

app.use(cors());
app.use(express.json());
app.use("/images", express.static("uploads/products"));

const db = msql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "claude",
});

db.connect((err) => {
  if (err) {
    console.error("mysql connection error", err);
    process.exit(1);
  }
  console.log("mysql connected");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "username and password required" });
  }
  const query = "SELECT * FROM users WHERE username = ? ";

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "server error", error: err });
    }

    //check if the user exists
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const user = results[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    res.json({ message: "login successful" });
  });
});

app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "err0r fetching ", error: err });
    }
    res.json(results);
  });
});

app.post("/insert", (req, res) => {
  const { name, description, price, category, image } = req.body;
  const query =
    "INSERT INTO products (name , description, price , category, image) values (?,?,?,?,?)";
  db.query(
    query,
    [name, description, price, category, image],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "err0r inserting ", error: err });
      }
      res.json(results);
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM products WHERE id = ? ";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "error deleting", error: err });
    }
    res.json({ message: "product deleted successfully! , ", id: id });
  });
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image } = req.body;
  const query =
    "UPDATE products SET name = ? , description = ? ,price = ? , category = ? , image = ? WHERE id = ?  ";
  db.query(
    query,
    [name, description, price, category, image, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "error updating", error: err });
      }
      res.json({ message: "product updated successfully", id: id });
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
