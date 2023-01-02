import {Component} from '@angular/core';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent {
  spotifyToken: String = ''

  setToken(token: String) {

  }
}
