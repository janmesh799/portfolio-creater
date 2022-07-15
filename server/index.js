const express = require("express");
const ConnectToMongo = require("./Database/db");
const app = express();

const port = process.env.PORT || 5000;
ConnectToMongo();
app.use(express.json());

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/portfolio", require("./routes/portfolio.js"));

app.use("/", (req, res) => {
  res.json({ home: "home reached" });
});
app.listen(port, () => {
  console.log(
    `portfolio creater backend is listening at http://localhost:${port}`
  );
});
