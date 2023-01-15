const express = require("express");
const mongoose = require("mongoose");
const Customer = require("./models/customer");

const app = express();

mongoose.set("strictQuery", false);

app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

const customers = [
  {
    name: "James",
    industry: "Youtube",
  },
  {
    name: "Katherine",
    industry: "Music",
  },
  {
    name: "Lily",
    industry: "Entertainment",
  },
];

const customer = new Customer({
  name: "Maria",
  industry: "Networking",
});

// customer.save();

app.get("/", (req, res) => {
  res.send(customer);
});

app.get("/api/customers", async (req, res) => {
  try {
    const result = await Customer.find();
    res.send({ customers: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/customers", (req, res) => {
  res.send(req.body);
});

app.post("/", (req, res) => {
  res.send("This is a post request");
});

const start = async () => {
  try {
    await mongoose.connect(CONNECTION);

    app.listen(PORT, () => {
      console.log("App is listening on port " + PORT);
    });
  } catch (err) {
    console.log(err.message);
  }
};

start();
