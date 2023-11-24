const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  //Get the user from the jwt token and add id to req object
  const token = req.header("token");
  if (!token) {
    res.status(401).send({ error: "Authentication failed" });
  }
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    req.user = data.user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Authentication failed" });
  }
};

module.exports = fetchuser;
