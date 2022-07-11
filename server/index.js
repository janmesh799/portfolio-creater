const express = require("express");

const app = express();

const port = process.env.PORT || 5000;
app.use("/", (req, res) => {
  res.json({ home: "home reached" });
});

app.listen(port, () => {
  console.log(
    `portfolio creater backend is listening at http://localhost:${port}`
  );
});
