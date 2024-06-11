const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");

let ExtractJwt = passportJWT.ExtractJwt,
  JwtStrategy = passportJWT.Strategy;

let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: `${process.env.JWT_KEY}`,
};

let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  if (jwt_payload) {
    next(null, {
      _id: jwt_payload._id,
      username: jwt_payload._username,
    });
  } else next(null, false);
});

passport.use(strategy);

// This function generates JWT token using id and username.
const generateJWTToken = (id, username) => {
  const payLoad = {
    _id: id,
    _username: username,
  };
  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payLoad, jwtOptions.secretOrKey, options);
};

const jwtDecoder = (jwtToken) => {
  return jwt.decode(jwtToken);
};

module.exports = {
  jwtOptions,
  passport,
  generateJWTToken,
  jwtDecoder,
};
