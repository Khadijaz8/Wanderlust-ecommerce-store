const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const flash = require("connect-flash");
const passport = require("passport");
const { redirectSave } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(userController.renderSignUpForm)
  .post(wrapAsync(userController.userSignUp));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    redirectSave,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// logout
router.get("/logout", userController.logout);
module.exports = router;
