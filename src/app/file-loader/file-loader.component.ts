import {Component} from '@angular/core';
import {TrackService} from "../_services/track.service";

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.scss']
})
export class FileLoaderComponent {

  constructor(
    private trackService: TrackService
  ) {
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
