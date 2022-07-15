const express = require("express");
const mongoose = require("mongoose");
const Portfolio = require("../models/Portfolio");
const router = express.Router();
const data = require("./data.json");

// Endpoint #1 : {host}/api/portfolio/
// type: POST
// function: add a portfolio in the data base, with an unique username if portfolio with that name already not
//           present in the database, else send an error message "There already exists portfolio with the
//           username --${portfolio.username}--, try again with another unique username"
router.post("/", async (req, res) => {
  try {
    const portfolio = req.body;
    const ispresent = await Portfolio.find({ username: portfolio.username });
    if (ispresent.length >= 1) {
      res.json({
        success: false,
        error: `There already exists portfolio with the username --${portfolio.username}--, try again with another unique username`,
      });
    } else {
      const flag = await Portfolio.create(portfolio);
      res.json({
        success: true,
        message: `portfolio successfully added with the username --${portfolio.username}--`,
      });
    }
  } catch (error) {
    res.json(error.message);
  }
});

// Endpoint #2 : {host}/api/portfolio/{username}
// type: GET
// function: finds a portfolio with username , if it is present in data base then it returns it
//           else, send status code '404' with an error message -"404 not found"
router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const profile = await Portfolio.find({ username });
    if (profile.length) res.json(profile);
    else {
      res.status(404).json({ error: "404 not found" });
    }
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = router;
