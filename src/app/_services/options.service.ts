import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private autoimportEnabled: BehaviorSubject<boolean>;

  constructor() {
    this.autoimportEnabled = new BehaviorSubject<boolean>(false);
  }

  setAutoimport(value: boolean) {
    this.autoimportEnabled.next(value);
  }

  isAutoimportEnabled(): boolean {
    return this.autoimportEnabled.value;
  }
}
