import express from "express";
import passport from "passport";
import { login, logout, register } from "../controllers/auth.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/login/success", register);

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
  function (req, res) {
    res.status(201).json("YES IT WORKED");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logout);

export default router;
