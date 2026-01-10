import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from '../Modal/User.modal.js';
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Google OAuth configuration
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://dcoder-backend.onrender.com/auth/google/callback", // Production callback URL
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ email: profile.emails[0].value });

            if (!user) {
                user = new User({
                    googleId: profile.id || "null",
                    firstName: profile.displayName || "null",
                    lastName: "null",
                    email: profile.emails[0].value,
                    phone: "null",
                    password: "null",
                    photo: profile.photos[0].value || "null"
                });
                await user.save();
            } else {
                // Update existing user with new data
                user.firstName = profile.displayName || "null";
                user.lastName = "null"; // No update from Google
                user.photo = profile.photos[0].value || "null";
                user.googleId = profile.id || "null"; // Update Google ID if necessary
                await user.save();
            }

            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Google login route handler
export const googleLogin = passport.authenticate("google", { scope: ["profile", "email"] });

// Google login callback route handler
export const googleCallback = passport.authenticate("google", { failureRedirect: "https://dcoder-7vi1.onrender.com/login" });

export const googleCallbackRedirect = (req, res) => {
    console.log('Google login successful!');
    // Redirect to the frontend root URL with user details
    res.redirect(`https://dcoder-7vi1.onrender.com/?user=${encodeURIComponent(JSON.stringify(req.user))}`);
};
