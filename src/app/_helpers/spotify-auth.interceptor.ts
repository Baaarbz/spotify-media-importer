import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SpotifyService} from "../_services/spotify.service";
import {spotifyConstants} from "./spotify-constants";

@Injectable()
export class SpotifyAuthInterceptor implements HttpInterceptor {

  constructor(
    private spotifyService: SpotifyService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith(spotifyConstants.baseUrl)) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${this.spotifyService.getToken()}`}
      });
    }
    return next.handle(request);
  }
}
