export function validateIdParam(req, res, next) {
  const id = req.params.id;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid ID parameter" });
  }
  next();
}

export function validateRequestBody(...fields) {
  return (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is required" });
    }

    for (const field of fields) {
      if (
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === ""
      ) {
        return res
          .status(400)
          .json({ error: `Missing required field: ${field}` });
      }
    }
    next();
  };
}

export function validateTrackIdBody(req, res, next) {
  const { trackId } = req.body || {};
  if (trackId === undefined || isNaN(Number(trackId))) {
    return res.status(400).json({ error: "trackId must be a valid number" });
  }
  next();
}
