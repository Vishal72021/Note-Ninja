import JWT from "jsonwebtoken";
const JWT_secret = "jwt-secret";

const fetchUser = (req, res, next) => {
  const token = req.header("Auth-Token");

  if (!token) {
    res.status(401).send({ error: "Invalid token" });
  }

  try {
    const data = JWT.verify(token, JWT_secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid token" });
  }
};

export default fetchUser;
