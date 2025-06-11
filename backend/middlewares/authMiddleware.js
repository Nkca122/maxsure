const passport = require("passport");
const ExpressError = require("../utils/error");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return new ExpressError(400, "Unauthorized");
    if (!user) return next(new ExpressError(400, "Unauthorized"));

    req.user = user._id;
    return next();
  })(req, res, next);
};
