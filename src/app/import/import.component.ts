import {Component, OnDestroy, OnInit} from '@angular/core';
import {firstValueFrom, Subscription} from "rxjs";
import {TrackService} from "../_services/track.service";
import {OptionsService} from "../_services/options.service";
import {SpotifyService} from "../_services/spotify.service";
import {ImportInitializerService} from "./import-initializer/import-initializer.service";
import {CreatePlaylist, GetUserProfile, SearchTrack} from "../_model/spotify-response";

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit, OnDestroy {

  completedPercentage: string = '0';
  completed: number = 0;
  totalTracks: number = 0;
  notAddedSongs: string[] = [];
  private subscription: Subscription;
  private playlistId: string;
  private tracks: string[] = [];

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
    this.subscription.add(this.importInitializerService.runningObservable.subscribe((value: boolean) => {
      if (value) {
        this.notAddedSongs = [];
        this.completed = 0;
        this.initImport();
      }
    }));
    this.subscription.add(
      this.trackService.tracksObservable.subscribe((tracks: string[]) => {
        if (tracks.length != 0) {
          this.totalTracks = tracks.length;
          this.tracks = tracks;
        }
      })
    );
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

  private async importToLikedSongs() {
    for (const track of this.tracks) {
      await firstValueFrom(this.spotifyService.searchTrack(track))
        .then(async (searchedTrack: SearchTrack) => {
          if (searchedTrack != undefined && searchedTrack.tracks != undefined && searchedTrack.tracks.items.length > 0) {
            await firstValueFrom(this.spotifyService.saveTrackToLikedSongs(searchedTrack.tracks.items[0].id));
          }
        })
        .catch(() => {
          this.notAddedSongs.push(track);
        });

      this.completed++;
      this.calculatePercentage();
    }
    this.importInitializerService.running(false);
  }

  private async importToNewList() {
    const userProfile: GetUserProfile = await firstValueFrom(this.spotifyService.getUserProfile());
    const createdPlaylist: CreatePlaylist = await firstValueFrom(this.spotifyService.createPlaylist(userProfile.id));
    this.addItemsToNewList(createdPlaylist.id);
  }

  private async addItemsToNewList(playlistId: string) {
    for (const track of this.tracks) {

      await firstValueFrom(this.spotifyService.searchTrack(track))
        .then(async (searchedTrack: SearchTrack) => {
          if (searchedTrack != undefined && searchedTrack.tracks != undefined && searchedTrack.tracks.items.length > 0) {
            await firstValueFrom(this.spotifyService.saveItemToPlaylist(playlistId, searchedTrack.tracks.items[0].uri));
          }
        })
        .catch(() => {
          this.notAddedSongs.push(track);
        });

      this.completed++;
      this.calculatePercentage();
    }
    this.importInitializerService.running(false);
  }

  private calculatePercentage() {
    this.completedPercentage = ((this.completed / this.totalTracks) * 100).toFixed(2);
  }
}
