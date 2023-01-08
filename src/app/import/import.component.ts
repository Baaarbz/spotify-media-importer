import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TrackService} from "../_services/track.service";
import {OptionsService} from "../_services/options.service";
import {SpotifyService} from "../_services/spotify.service";
import {ImportInitializerService} from "./import-initializer/import-initializer.service";
import {CreatePlaylist, GetUserProfile} from "../_model/spotify-response";

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private playlistId: string;

  constructor(
    private trackService: TrackService,
    private optionsService: OptionsService,
    private spotifyService: SpotifyService,
    private importInitializerService: ImportInitializerService
  ) {
    this.subscription = new Subscription();
    this.playlistId = '';
  }

  ngOnInit(): void {
    this.subscription.add(this.importInitializerService.initObservable.subscribe(() => {
      this.initImport();
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initImport(): void {
    if (this.optionsService.isSaveLikedSongsEnabled()) {
      this.importToLikedSongs();
    } else if (this.optionsService.isCreateNewListEnabled()) {
      this.importToNewList();
    }
  }

  private importToLikedSongs(): void {

  }

  private importToNewList(): void {
    this.spotifyService.getUserProfile().subscribe((response: GetUserProfile) => {
      this.spotifyService.createPlaylist(response.id).subscribe((response: CreatePlaylist) => {
        this.playlistId = response.id;
      })
    })
  }

  private addItemsToNewList(): void {

  }
}
