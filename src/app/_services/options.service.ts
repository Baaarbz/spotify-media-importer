import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private autoimportEnabled: BehaviorSubject<boolean>;
  private disableOptions: BehaviorSubject<boolean>;

  constructor() {
    this.autoimportEnabled = new BehaviorSubject<boolean>(false);
    this.disableOptions = new BehaviorSubject<boolean>(false);
  }

  get isOptionsDisabled(): Observable<boolean> {
    return this.disableOptions.asObservable();
  }

  setDiasbleOptions(value: boolean) {
    this.disableOptions.next(value)
  }

  setAutoimport(value: boolean) {
    this.autoimportEnabled.next(value);
  }

  isAutoimportEnabled(): boolean {
    return this.autoimportEnabled.value;
  }
}
