const jwt = require("jsonwebtoken");
const SEC_KEY = process.env.SEC_KEY;
const fetchuser = (req, res, next) => {
  //get the user from jwt token and add id to req object
  const token = req.header("profiler_token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, SEC_KEY);
    req.email = data.email;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;