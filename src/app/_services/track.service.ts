import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private tracksSubject: BehaviorSubject<string[]>;

  constructor() {
    this.tracksSubject = new BehaviorSubject<string[]>([]);
  }

  setTracks(tracks: string[]): void {
    this.tracksSubject.next(tracks);
  }

  getTracks(): string[] {
    return this.tracksSubject.value;
  }
}
