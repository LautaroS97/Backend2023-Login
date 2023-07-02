import express from "express";
import { userModel } from "../dao/models/users.model.js";

export const loginRouter = express.Router();

loginRouter.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  if (!first_name || !last_name || !email || !age || !password) {
    return res.status(400).json({ message: "Falta completar algún campo" });
  }
  try {
    await userModel.create({
      first_name,
      last_name,
      email,
      password,
      age,
    });

    req.session.first_name = first_name;
    req.session.email = email;
    req.session.admin = false;

    if (email === "admin@backend.com" && password === "adminBackend") {
      req.session.admin = true;
    }

    return res.status(201).redirect("/products");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

loginRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Falta completar algún campo" });
  }
  try {
    const user = await userModel.findOne({ email });

    if (user && user.password === password) {
      req.session.first_name = user.first_name;
      req.session.email = user.email;
      req.session.admin = false;
      if (
        user.email === "admin@backend.com" &&
        user.password === "adminBackend"
      ) {
        req.session.admin = true;
      }

      return res.redirect("/products");
    } else {
      return res.status(400).json({ message: "Email o contraseña incorrectos" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});