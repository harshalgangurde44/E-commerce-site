const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user-schema");
const app = express();
const PORT = process.env.PORT || 3002;

mongoose
  .connect(
    "mongodb+srv://harshalg:jIUmTYRS86P0aD08@app.wen0ngb.mongodb.net/ecommerce-site"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Define schemas and models
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
  description: String,
});

const Product = mongoose.model("Product", ProductSchema);

app.post("/api/reg", async (req, res) => {
  try {
    // console.log(req.body);

    const { signupData } = req.body;
    const newUser = await User.create({
      name: signupData.signupName,
      email: signupData.signupEmail,
      password: signupData.signupPassword,
      isAdmin: false,
    });
    res.status(200).json({ message: "oK", User: newUser });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error("Product not found");
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) throw new Error("Product not found");
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw new Error("Product not found");
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.post("/api/cart", async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.query.toLowerCase();
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    });
    res.json({ data: products });
    // console.log(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found, please register" });
    }
    if (password !== user.password) {
      return res
        .status(404)
        .json({ message: " please enter correct password" });
    }
    const { password: pass, isAdmin, ...other } = user._doc; // Destructure isAdmin and omit password
    res.status(200).json({
      message: "Success",
      user: { email, isAdmin, ...other },
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
