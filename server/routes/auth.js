const express = require("express");
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const SEC_KEY = process.env.SEC_KEY;



// ENDPOINT #1 : {host}/api/aut/user
// Type: POST
// function : takes user with creds, is user already exists with same email, sends and error message for the same,
//             otherwise creats and user with the creds (with  an hashed password), and issues an jwt token.
router.post("/user", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const user = await User.find({ email: email });
    const IsUserAlreadypPresent = user.length >= 1;
    if (IsUserAlreadypPresent) {
      res.json({ error: "there already exists an user with same email" });
    } else {
      const hashed_pass = await bycrypt.hash(password, 10);
      const user = { name: name, password: hashed_pass, email: email };
      const flag = await User.create(user);
      const token = jwt.sign({ email }, SEC_KEY);
      res.json({
        success: true,
        user,
        token,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});



// ENDPOINT #2 : {host}/api/aut/user
// Type: POST
// function : takes user with creds, is user already exists with same email, sends and error message for the same,
//             otherwise creats and user with the creds (with  an hashed password), and issues an jwt token.
router.get("/user", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email: email });
    const IsUserAlreadypPresent = user.length >= 1;
    if (IsUserAlreadypPresent == false) {
      res.json({ error: "Try logging in with correct credentials" });
    } else {
      const isPasswordValid = await bycrypt.compare(password, user[0].password);
      if (isPasswordValid) {
        const token = await jwt.sign({ email }, SEC_KEY);
        res.json({
          success: true,
          token: token,
          message: "logged in successfully",
        });
      } else {
        res.json({ error: "Try logging in with correct credentials" });
      }
    }
  } catch (error) {
    res.json(error);
  }
});



module.exports = router;
