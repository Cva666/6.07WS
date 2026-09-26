import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  const tracksData = [
    ["Bohemian Rhapsody", 354000],
    ["Stairway to Heaven", 482000],
    ["Hotel California", 391000],
    ["Sweet Child O' Mine", 356000],
    ["Smells Like Teen Spirit", 301000],
    ["Imagine", 183000],
    ["Billie Jean", 294000],
    ["Like a Rolling Stone", 369000],
    ["Hey Jude", 431000],
    ["Comfortably Numb", 382000],
    ["Back in Black", 255000],
    ["Superstition", 266000],
    ["Purple Haze", 170000],
    ["Wonderwall", 258000],
    ["Lose Yourself", 326000],
    ["Dreams", 257000],
    ["Humble", 177000],
    ["Blinding Lights", 200000],
    ["Shape of You", 233000],
    ["Uptown Funk", 270000],
  ];

  for (const [name, duration_ms] of tracksData) {
    await db.query("INSERT INTO tracks (name, duration_ms) VALUES ($1, $2);", [
      name,
      duration_ms,
    ]);
  }

  const playlistsData = [
    ["Classic Rock Hits", "Timeless rock anthems from the 70s and 80s."],
    ["90s Alternative", "Grunge and alternative hits from the 1990s."],
    ["Pop Classics", "Iconic pop tracks across generations."],
    ["Chill Vibes", "Relaxing tracks for study or downtime."],
    ["Workout Mix", "High-energy tracks to keep you motivated."],
    ["Road Trip Jams", "The ultimate driving playlist for long trips."],
    ["Party Starters", "Upbeat tracks to get any crowd dancing."],
    ["Focus Instrumental", "Calm beats and rhythms to boost productivity."],
    ["Indie Favorites", "Top indie and alternative music selections."],
    ["Late Night Acoustic", "Soft tunes for quiet late-night listening."],
  ];

  for (const [name, description] of playlistsData) {
    await db.query(
      "INSERT INTO playlists (name, description) VALUES ($1, $2);",
      [name, description],
    );
  }

  const playlistTracksData = [
    [1, 1],
    [1, 2],
    [2, 1],
    [2, 5],
    [3, 1],
    [3, 7],
    [3, 18],
    [4, 6],
    [4, 16],
    [5, 6],
    [5, 11],
    [6, 8],
    [6, 11],
    [7, 20],
  ];

  for (const [playlist_id, track_id] of playlistTracksData) {
    await db.query(
      "INSERT INTO playlists_tracks (playlist_id, track_id) VALUES ($1, $2);",
      [playlist_id, track_id],
    );
  }
}
