import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TrackService} from "../../_services/track.service";
import {SpotifyService} from "../../_services/spotify.service";
import {ImportInitializerService} from "./import-initializer.service";

@Component({
  selector: 'app-import-initializer',
  templateUrl: './import-initializer.component.html',
  styleUrls: ['./import-initializer.component.scss']
})
export class ImportInitializerComponent implements OnInit, OnDestroy {

  disabledButton: boolean = false;

  private emptyTracks: boolean = true;
  private emptyToken: boolean = true;
  private subscription: Subscription;

  constructor(
    private trackService: TrackService,
    private spotifyService: SpotifyService,
    private importInitializerService: ImportInitializerService
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.trackService.tracksObservable.subscribe((tracks: string[]) => {
        this.emptyTracks = tracks.length == 0
        this.setDisabledButton();
      })
    );
    this.subscription.add(
      this.spotifyService.tokenObservable.subscribe((token: string) => {
        this.emptyToken = token.length == 0
        this.setDisabledButton();
      })
    )
    this.subscription.add(
      this.importInitializerService.runningObservable.subscribe((value: boolean) => {
        this.disabledButton = value;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  startImport(): void {
    this.disabledButton = true;
    this.importInitializerService.running(true);
  }

  private setDisabledButton(): void {
    this.disabledButton = this.emptyTracks || this.emptyToken;
  }
}
