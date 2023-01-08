import {Component, OnDestroy, OnInit} from '@angular/core';
import {OptionsService} from "../_services/options.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-import-options',
  templateUrl: './import-options.component.html',
  styleUrls: ['./import-options.component.scss']
})
export class ImportOptionsComponent implements OnInit, OnDestroy {

  disabledOptions: boolean = false;
  private subscription: Subscription;

  constructor(
    private optionService: OptionsService
  ) {
    this.subscription = new Subscription();
  }

  changeOptions(event: any) {
    switch (event.id) {
      case 'autoImportSwitch':
        this.optionService.setAutoimport(event.checked);
        break;
      case 'saveToNewList':
        this.optionService.setCreateNewList(true);
        this.optionService.setSaveLikedSongs(false);
        break;
      case 'saveToLikedSongs':
        this.optionService.setCreateNewList(false);
        this.optionService.setSaveLikedSongs(true);
        break;
    }
  }

  ngOnInit(): void {
    this.subscription.add(this.optionService.isOptionsDisabled.subscribe((disabled: boolean) => {
      this.disabledOptions = disabled;
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
