const express = require("express");
const router = express.Router();
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "ItsNotASecret"
const User = require("../models/users");

router.post(
  "/createuser",
  body("name").isLength({ min: 5 }),
  body("phone").isLength({ min: 5 }),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        phone: req.body.phone,
        password: secPassword,
      });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  body("phone").isLength({ min: 5 }),
  body("password", "incorrect password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let phone = req.body.phone;
    try {
      let userData = await User.findOne({ phone });
      if (!userData) {
        return res.status(400).json({ errors: "invalid phone number" });
      }

      const comparePwd = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (!comparePwd) {
        console.warn(req.body.password, "-----", userData.password);
        return res.status(400).json({ errors: "invalid id/phone number" });
      }

      const data = {
        user:{
            id :userData.id
        }
      }
      const authToken = jwt.sign(data, secretKey)

      return res.json({ success: true ,authToken: authToken});
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

module.exports = router;
