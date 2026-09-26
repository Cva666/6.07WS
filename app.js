import express from "express";
import tracksRouter from "./api/tracks.js";
import playlistRouter from "./api/playlists.js";
const app = express();
app.use(express.json());

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
export default app;
