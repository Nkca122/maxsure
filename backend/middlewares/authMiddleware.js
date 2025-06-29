const passport = require("passport");
const ExpressError = require("../utils/error");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return new ExpressError(400, "Unauthorized/Expired Access. Please Login/Signup to continue");
    if (!user) return next(new ExpressError(400, "Unauthorized/Expired Access. Please Login/Signup to continue"));

    req.user = user._id;
    return next();
  })(req, res, next);
};
