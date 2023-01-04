import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TokenComponent} from './token/token.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FileLoaderComponent } from './file-loader/file-loader.component';
import { ImportOptionsComponent } from './import-options/import-options.component';
import { ImportStatusComponent } from './import-status/import-status.component';
import { ImportInitializerComponent } from './import-initializer/import-initializer.component';

@NgModule({
  declarations: [
    AppComponent,
    TokenComponent,
    FileLoaderComponent,
    ImportOptionsComponent,
    ImportStatusComponent,
    ImportInitializerComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
