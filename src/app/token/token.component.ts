import {Component} from '@angular/core';
import {SpotifyService} from '../_services/spotify.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent {

  constructor(
    private spotifyService: SpotifyService
  ) {
  }

  spotifyToken: string = ''

  setToken(token: string): void {
    this.spotifyService.setToken(token)
  }
}
