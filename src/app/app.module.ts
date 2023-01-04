import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TokenComponent} from './token/token.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FileLoaderComponent } from './file-loader/file-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    TokenComponent,
    FileLoaderComponent,
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
