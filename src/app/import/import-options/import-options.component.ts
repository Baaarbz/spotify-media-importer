import {Component, OnDestroy, OnInit} from '@angular/core';
import {OptionsService} from "../../_services/options.service";
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
    private optionsService: OptionsService
  ) {
    this.subscription = new Subscription();
  }

  changeOptions(event: any) {
    switch (event.id) {
      case 'autoImportSwitch':
        this.optionsService.setAutoimport(event.checked);
        break;
      case 'saveToNewList':
        this.optionsService.setCreateNewList(true);
        this.optionsService.setSaveLikedSongs(false);
        break;
      case 'saveToLikedSongs':
        this.optionsService.setCreateNewList(false);
        this.optionsService.setSaveLikedSongs(true);
        break;
    }
  }

  ngOnInit(): void {
    this.subscription.add(this.optionsService.isOptionsDisabled.subscribe((disabled: boolean) => {
      this.disabledOptions = disabled;
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
