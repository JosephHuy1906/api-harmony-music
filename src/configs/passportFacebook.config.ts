import { Strategy } from 'passport-facebook'
import passport from "passport";



const FACEBOOK_CLIENT_ID = '974282080589348'
const FACEBOOK_CLIENT_SECRET = '11e7a3a4bdd4c776bf7da37f66b5ccdc'

passport.use(new Strategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: "http://localhost:6060/api/v1/user/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
  function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
  }
));

passport.serializeUser( (user, done) => {
  done(null, user);
});

passport.deserializeUser( (obj: any, done) => {
  done(null, obj);
});

