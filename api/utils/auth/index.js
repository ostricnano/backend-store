//import passport and the local strategy en el index.js global
const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

passport.use(LocalStrategy)
passport.use(JwtStrategy)