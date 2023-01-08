export interface SearchTrack {
  tracks: Track[];
}

export interface CreatePlaylist {
  id: string;
}

export interface GetUserProfile {
  id: string;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

interface Album {
  images: Image[];
  release_date: string;
  name: string;
}

interface Artist {
  name: string;
}

interface Item {
  id: string;
  name: string;
  uri: string;
  preview_url: string;
  duration_ms: number;
  album: Album;
  artists: Artist[];
}

export interface Track {
  items: Item[];
}
