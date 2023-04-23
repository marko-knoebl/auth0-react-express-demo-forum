import fs from "fs";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { auth } from "express-oauth2-jwt-bearer";
import crypto from "crypto";
import dotenv from "dotenv";

// load configuration from ".env" file
dotenv.config();

const API_PORT = process.env.API_PORT;
const AUTH_DOMAIN = process.env.AUTH_DOMAIN;
const AUTH_AUDIENCE = process.env.AUTH_AUDIENCE;

const app = express();

app.use(cors());
app.use(express.json({ strict: false }));
app.use(helmet());
app.use(morgan("dev"));

// check all incoming requests for their access tokens
const checkJwt = auth({
  audience: AUTH_AUDIENCE,
  issuerBaseURL: `https://${AUTH_DOMAIN}/`,
  algorithms: ["RS256"],
});
app.use(checkJwt);

app.get("/api/test", (req, res) => {
  res.json({ msg: "Hello world" });
});

app.get("/api/posts", (req, res) => {
  const posts = JSON.parse(fs.readFileSync("posts.json"));
  res.json(posts);
});

app.post("/api/posts", (req, res) => {
  const newPost = req.body;
  newPost.user = { sub: req.auth.payload.sub };
  newPost.id = crypto.randomUUID().toString();
  const posts = JSON.parse(fs.readFileSync("posts.json"));
  const newPosts = [...posts, newPost];
  fs.writeFileSync("posts.json", JSON.stringify(newPosts, null, 2));
  res.json({ status: "success" });
});

app.delete("/api/posts/:id", (req, res) => {
  const posts = JSON.parse(fs.readFileSync("posts.json"));
  const id = req.params.id;
  const post = posts.find((p) => p.id === id);
  const userSub = req.auth.payload.sub;
  if (post.user.sub !== userSub) {
    res.status(401).json({ text: "Unable to delete post of a different user" });
    return;
  }
  const newPosts = posts.filter((p) => p.id !== id);
  fs.writeFileSync("posts.json", JSON.stringify(newPosts, null, 2));
  res.json({ status: "success" });
});

app.listen(API_PORT, () =>
  console.log(`API Server listening on port ${API_PORT}`)
);
