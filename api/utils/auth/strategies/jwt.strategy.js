const { Strategy, ExtractJwt } = require('passport-jwt');

const { config } = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const JwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    if (payload) {
      return done(null, payload);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = JwtStrategy;
