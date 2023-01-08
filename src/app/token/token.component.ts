import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../_services/spotify.service';
import {ImportInitializerService} from "../import/import-initializer/import-initializer.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  spotifyToken: string = ''
  disableInput: boolean;
  private subscription: Subscription;

  constructor(
    private spotifyService: SpotifyService,
    private importInitializerService: ImportInitializerService
  ) {
    this.subscription = new Subscription();
    this.disableInput = false;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.importInitializerService.initObservable.subscribe((value: boolean) => {
        this.disableInput = value;
      })
    );
  }

  setToken(token: string): void {
    this.spotifyService.setToken(token)
  }
}
