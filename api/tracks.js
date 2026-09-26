import { Router } from "express";
import { getTracks, getTracksById } from "#db/queries/tracks";
import { validateIdParam } from "./middleware.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const tracks = await getTracks();
    res.json(tracks);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateIdParam, async (req, res, next) => {
  try {
    const track = await getTracksById(req.params.id);

    if (!track) {
      return res.status(404).json({ error: "Track not found" });
    }
    res.json(track);
  } catch (err) {
    next(err);
  }
});

export default router;
