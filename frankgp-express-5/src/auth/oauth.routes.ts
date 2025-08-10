import { ENV_GOOGLE } from "../config/envs";
import { OAuthController } from "./oauth.controller";
import { Router } from "express";
import { Strategy } from "passport-google-oauth20";
import passport from "passport";

// 🔐 Auth (Google Strategy)
if (ENV_GOOGLE.CLIENT_ID) {
  passport.use(
    new Strategy(
      {
        clientID: ENV_GOOGLE.CLIENT_ID!,
        clientSecret: ENV_GOOGLE.CLIENT_SECRET!,
        callbackURL: ENV_GOOGLE.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        return done(null, profile); // lo usamos como req.user
      }
    )
  );
}

const controller = new OAuthController();
const router = Router();

router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
  //
);

router.get(
  "/callback",
  passport.authenticate(
    "google",
    { session: false, failureRedirect: ENV_GOOGLE.CLIENT_URL + "/auth/login" }
    //
  ),
  controller.googleCallback
);

export default router;
