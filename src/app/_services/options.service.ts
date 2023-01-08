import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private autoimportEnabled: BehaviorSubject<boolean>;
  private createNewListEnabled: BehaviorSubject<boolean>;
  private saveLikedSongsEnabled: BehaviorSubject<boolean>;

  constructor() {
    this.autoimportEnabled = new BehaviorSubject<boolean>(true);
    this.createNewListEnabled = new BehaviorSubject<boolean>(false);
    this.saveLikedSongsEnabled = new BehaviorSubject<boolean>(true);
  }

  setAutoimport(value: boolean) {
    this.autoimportEnabled.next(value);
  }

  isAutoimportEnabled(): boolean {
    return this.autoimportEnabled.value;
  }

  setSaveLikedSongs(value: boolean) {
    this.saveLikedSongsEnabled.next(value);
  }

  isSaveLikedSongsEnabled(): boolean {
    return this.saveLikedSongsEnabled.value;
  }

  setCreateNewList(value: boolean) {
    this.createNewListEnabled.next(value);
  }

  isCreateNewListEnabled(): boolean {
    return this.createNewListEnabled.value;
  }
}
