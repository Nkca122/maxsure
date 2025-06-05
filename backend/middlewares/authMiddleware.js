const passport = require("passport");
module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return next(new Error("Unauthorized"));

    req.user = user._id;
    return next();
  })(req, res, next);
};
