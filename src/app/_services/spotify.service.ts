import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpParams} from '@angular/common/http';
import {spotifyConstants} from "../_helpers/spotify-constants";
import {SearchTrack} from "../_model/spotify-response";

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

  saveTrack(trackId: string): void {
    const params = new HttpParams()
      .set('ids', trackId);

    this.http.put(spotifyConstants.baseUrl + spotifyConstants.endpointSaveTrack, null, {params});
  }

  searchTrack(trackName: string): Observable<SearchTrack> {
    const params = new HttpParams()
      .set("q", trackName)
      .set("type", "track")
      .set("limit", "5");

    return this.http.get<SearchTrack>(spotifyConstants.baseUrl + spotifyConstants.endpointSearchTrack, {params})
  }
}
