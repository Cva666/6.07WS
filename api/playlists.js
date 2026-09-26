import { Router } from "express";
import {
  getPlaylists,
  getPlaylistsById,
  getPlaylistTracks,
  addTrackToPlaylist,
  createPlaylist,
} from "../db/queries/playlists.js";
import { getTracksById } from "#db/queries/tracks";
import {
  validateIdParam,
  validateRequestBody,
  validateTrackIdBody,
} from "./middleware.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const playlists = await getPlaylists();
    res.json(playlists);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateIdParam, async (req, res, next) => {
  try {
    const playlist = await getPlaylistsById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }
    res.json(playlist);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/tracks", validateIdParam, async (req, res, next) => {
  try {
    const playlist = await getPlaylistsById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const tracks = await getPlaylistTracks(req.params.id);
    res.json(tracks);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  validateRequestBody("name", "description"),
  async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const playlist = await createPlaylist({ name, description });
      res.status(201).json(playlist);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/:id/tracks",
  validateIdParam,
  validateRequestBody("trackId"),
  validateTrackIdBody,
  async (req, res, next) => {
    try {
      const playlistId = req.params.id;
      const { trackId } = req.body;

      // 1. Check if playlist exists (404)
      const playlist = await getPlaylistsById(playlistId);
      if (!playlist) {
        return res.status(404).json({ error: "Playlist not found" });
      }

      // 2. Check if track exists (400 required by test suite)
      const track = await getTracksById(trackId);
      if (!track) {
        return res.status(400).json({ error: "Track does not exist" });
      }

      // 3. Add track to playlist
      const playlistTrack = await addTrackToPlaylist(playlistId, trackId);
      res.status(201).json(playlistTrack);
    } catch (err) {
      // Unique constraint violation (duplicate track in playlist)
      if (err.code === "23505") {
        return res.status(400).json({ error: "Track is already in playlist" });
      }
      next(err);
    }
  },
);

export default router;
