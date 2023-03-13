import User from "../models/user.js";

export const getAllUsers = async function (req, res) {
  if (req.user && req.body.u.role == "admin") {
    const adminid = req.body.u._id;

    User.find({ _id: { $ne: adminid } }, (err, users) => {
      if (err) {
        res.json({ error: true, message: "Server Error" });
        return;
      }
      res.json(users);
    });
  } else {
    res.json({ error: true, message: "Not Authorized" });
  }
};

export const changeUserRole = async function (req, res) {
  if (req.user && req.body.u.role == "admin") {
    const adminid = req.body.u._id;
    const userid = req.body.uid;

    // const userToUpdate = User.findOne({ _id: userid });
    // console.log(userToUpdate);

    User.findOne({ _id: userid })
      .then((user) => {
        if (user) {
          if (user.role === "user") {
            user.role = "expert";
            user.save();
          } else if (user.role === "expert") {
            user.role = "user";
            user.save();
          }
        }
      })
      .catch((err) => {
        res.json({ error: true, message: "Server Error" });
      });

    // User.findByIdAndUpdate(userid, {updateData}, { new: true }, (err, user) => {
    //   if (err) {
    //     // Handle the error
    //   } else {
    //     // Find all users and return them
    //     User.find((err, users) => {
    //       if (err) {
    //         // Handle the error
    //       } else {
    //         // Return the updated list of users
    //         res.json(users);
    //       }
    //     });
    //   }
    // });

    User.find({ _id: { $ne: adminid } }, (err, users) => {
      if (err) {
        res.json({ error: true, message: "Server Error" });
        return;
      }
      res.json(users);
    });
  } else {
    res.json({ error: true, message: "Not Authorized" });
  }
};
