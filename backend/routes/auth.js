import express from "express";
import User from "../models/User.js";
import fetchUser from "../middleware/fetchUser.js";
import { validationResult, body } from "express-validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const router = express.Router();
const JWT_Secret = "jwt-secret";

// Endpoint for creating a new user
router.post(
  "/createUser",
  [
    body("Name", "Name should be atleast 3 characters long").isLength({
      min: 3,
    }),
    body("email", "Enter a valid E-mail ID").isEmail(),
    body("password", "Password should be atleast 6 characters long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // res.status(200).json({success: true, data: []});
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
          return res
            .status(400)
            .json({ error: "Sorry a user with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
          Name: req.body.Name,
          email: req.body.email,
          password: securePass,
        });
        const data = {
          user: {
            id: user.id,
          },
        };
        const authToken = JWT.sign(data, JWT_Secret);

        // return res.send(req.body);
        res.status(200).json({ authToken });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred while creating a new user");
      }
    } else {
      res.send({ errors: result.array() });
    }
  }
);

// Endpoint for validating new user
router.post(
  "/userLogin",
  [
    body("email", "Enter a valid E-mail ID").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // res.status(200).json({success: true, data: []});
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { email, password } = req.body;
      try {
        let user = await User.findOne({ email });

        if (!user) {
          res
            .status(400)
            .json({ message: "Invalid Credentials! Please try again" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
          res
            .status(400)
            .json({ message: "Invalid Credentials! Please try again" });
        }

        const data = {
          user: {
            id: user.id,
          },
        };
        const authToken = JWT.sign(data, JWT_Secret);

        res.status(200).json({ authToken });
      } catch (error) {
        console.error(error.message);
        res
          .status(500)
          .send(
            "Some error occurred while validating the email address and password"
          );
      }
    } else {
      res.send({ errors: result.array() });
    }
  }
);

// Endpoint for getting data of new user
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send(
        "Some error occurred while validating the email address and password"
      );
  }
});

export default router;
