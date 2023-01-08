import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TrackService} from "../../_services/track.service";
import {OptionsService} from "../../_services/options.service";
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
    private optionsService: OptionsService,
    private spotifyService: SpotifyService,
    private importInitializerService: ImportInitializerService
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.trackService.tracks.subscribe((tracks: string[]) => {
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  startImport() {
    this.optionsService.setDisableOptions(true);
    this.disabledButton = true;
    this.importInitializerService.init(true);
  }

  private setDisabledButton() {
    this.disabledButton = this.emptyTracks || this.emptyToken;
  }
}
