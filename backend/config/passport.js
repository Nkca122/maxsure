let JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
let User = require("../models/user");

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      await User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
};
