import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrackService} from "../_services/track.service";
import {Subscription} from "rxjs";
import {ImportInitializerService} from "../import/import-initializer/import-initializer.service";

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.scss']
})
export class FileLoaderComponent implements OnInit, OnDestroy {

  disableInput: boolean;
  private subscription: Subscription;

  constructor(
    private trackService: TrackService,
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadCsv(event: any): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      let tracks = e.target.result.split("\n");
      tracks.shift();
      tracks = this.readCsv(tracks);
      this.trackService.setTracks(tracks);
    };
    reader.readAsText(event.target.files[0]);
  }

  private readCsv(tracks: string[]): string[] {
    let trackNames: string[] = [];
    tracks.forEach(track => {
      if (track.length != 0) {
        trackNames.push(track.split(",")[0]);
      }
    });
    return trackNames;
  }
}
