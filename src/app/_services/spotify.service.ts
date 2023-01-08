import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpParams} from '@angular/common/http';
import {spotifyConstants} from "../_helpers/spotify-constants";
import {CreatePlaylist as CreatePlaylistResponse, GetUserProfile, SearchTrack} from "../_model/spotify-response";
import {CreatePlaylist as CreatePlaylistRequest} from "../_model/spotify-request";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private tokenSubject: BehaviorSubject<string>;

  constructor(
    private http: HttpClient
  ) {
    this.tokenSubject = new BehaviorSubject<string>("");
  }

  setToken(token: string): void {
    this.tokenSubject.next(token);
  }

  getToken(): string {
    return this.tokenSubject.value;
  }

  get tokenObservable(): Observable<string> {
    return this.tokenSubject.asObservable();
  }

  saveTrackToLikedSongs(...trackIds: string[]): Observable<any> {
    const endpoint: string = spotifyConstants.baseUrl + '/v1/me/tracks';
    const params = new HttpParams()
      .set('ids', trackIds.join(','));

    return this.http.put(endpoint, null, {params});
  }

  saveItemToPlaylist(playlistId: string, ...itemUri: string[]): Observable<any> {
    const endpoint: string = spotifyConstants.baseUrl + `/v1/playlists/${playlistId}/tracks`;
    const params = new HttpParams()
      .set('uris', itemUri.join(','));

    return this.http.post(endpoint, null, {params})
  }

  searchTrack(trackName: string): Observable<SearchTrack> {
    const endpoint: string = spotifyConstants.baseUrl + '/v1/search';
    const params = new HttpParams()
      .set("q", trackName)
      .set("type", "track")
      .set("limit", "5");

    return this.http.get<SearchTrack>(endpoint, {params})
  }

  getUserProfile(): Observable<GetUserProfile> {
    const endpoint: string = spotifyConstants.baseUrl + '/v1/me';

    return this.http.get<GetUserProfile>(endpoint);
  }

  createPlaylist(userId: string): Observable<CreatePlaylistResponse> {
    const endpoint: string = spotifyConstants.baseUrl + `/v1/users/${userId}/playlists`;
    const body: CreatePlaylistRequest = {
      name: 'Imported Songs!',
      description: 'Imported songs with Spotify Media Importer! If it was useful do not forget to leave your star! https://github.com/Baaarbz/spotify-media-importer',
      public: false
    }

    return this.http.post<CreatePlaylistResponse>(endpoint, body);
  }

  checkSavedTracks() {
    // TODO
    const endpoint: string = spotifyConstants.baseUrl + '/v1/me/tracks/contains';
  }
}
