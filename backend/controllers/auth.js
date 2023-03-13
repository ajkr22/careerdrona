import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  if (req.user) {
    const { name, email, picture, email_verified, sub } = req.user._json;
    let existingUser;
    let user;
    let emailVerified;
    if (email_verified) {
      try {
        //Has the user signed in with google before
        emailVerified = true;

        existingUser = await User.findOne({ email });
        user = existingUser;
      } catch (err) {
        return res.status(500).json({
          error: true,
          message: "Signing up failed, please try again!",
        });
      }
    }

    if (!existingUser) {
      //create a new user with the name, email from the payload
      //and fictional payload
      emailVerified = false;

      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(email + name + email, 12); //12 - number of salting rounds (can't be reverse-engineered)
      } catch (err) {
        return res.status(500).json({
          error: true,
          message: "Could not create user, please try again",
        });
      }

      user = new User({
        name,
        email,
        password: hashedPassword,
        avatar: picture,
        username: email.substring(0, email.indexOf("@")),
      });
      try {
        await user.save();
      } catch (err) {
        return res.status(500).json({
          error: true,
          message: "Signup failed, please try again",
        });
      }
    }

    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
};
export const login = (req, res) => {};
export const logout = (req, res) => {};
