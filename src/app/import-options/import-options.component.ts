import {Component} from '@angular/core';
import {OptionsService} from "../_services/options.service";

@Component({
  selector: 'app-import-options',
  templateUrl: './import-options.component.html',
  styleUrls: ['./import-options.component.scss']
})
export class ImportOptionsComponent {

  constructor(
    private optionService: OptionsService
  ) {
  }

  changeAutoimport(event: any) {
    this.optionService.setAutoimport(event.checked);
  }
}
