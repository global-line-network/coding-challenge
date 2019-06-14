const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/getAllUsers", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/api/updateUser", (req, res) => {
  console.log(req.body);
  res.send(
    `Update User POST request. This is what you sent me: ${req.body.post}`
  );
});

app.post("/api/deleteUser", (req, res) => {
  console.log(req.body);
  res.send(
    `Delete User POST request. This is what you sent me: ${req.body.post}`
  );
});

app.post("/api/createUser", (req, res) => {
  console.log(req.body);
  res.send(
    `Create User POST request. This is what you sent me: ${req.body.post}`
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
