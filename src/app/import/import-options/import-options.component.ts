import {Component, OnDestroy, OnInit} from '@angular/core';
import {OptionsService} from "../../_services/options.service";
import {Subscription} from "rxjs";
import {ImportInitializerService} from "../import-initializer/import-initializer.service";

@Component({
  selector: 'app-import-options',
  templateUrl: './import-options.component.html',
  styleUrls: ['./import-options.component.scss']
})
export class ImportOptionsComponent implements OnInit, OnDestroy {

  disabledOptions: boolean = false;
  private subscription: Subscription;

  constructor(
    private optionsService: OptionsService,
    private importInitializerService: ImportInitializerService
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.importInitializerService.runningObservable.subscribe((value: boolean) => {
      this.disabledOptions = value;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeOptions(event: any): void {
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
}
