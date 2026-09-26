DROP TABLE IF EXISTS playlists_tracks;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS tracks;

CREATE TABLE playlists (
  id serial PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE tracks (
  id serial PRIMARY KEY,
  name TEXT NOT NULL,
  duration_ms int NOT NULL
  
);

CREATE TABLE playlists_tracks (
  id serial PRIMARY KEY,
  playlist_id int REFERENCES playlists(id) ON DELETE CASCADE NOT NULL,
  track_id int REFERENCES tracks(id) ON DELETE CASCADE NOT NULL,
  UNIQUE (track_id, playlist_id)
  
);