import express from "express";
import mongoose from "mongoose";
// Routes
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import contactRoutes from "./routes/contactRoutes.js";

import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";
import GoogleStrategy from "passport-google-oauth20";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

// ----------------------------
// ----------------------------
const googlestrategy = GoogleStrategy.Strategy;

passport.use(
  new googlestrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
// ----------------------------
// ----------------------------

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", express.static("./users"));
app.use("/posts", express.static("./posts"));

app.use(
  cookieSession({
    name: "session",
    keys: ["devto"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/admin", adminRoutes);

// Contacts Middleware
// Middleware
app.use(express.json());
// app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/contacts", contactRoutes);

// errorHandler Middleware
app.use(errorHandler);

// Port
const port = process.env.PORT || 8080;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
