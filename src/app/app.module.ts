import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TokenComponent} from './token/token.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FileLoaderComponent } from './file-loader/file-loader.component';
import { ImportOptionsComponent } from './import/import-options/import-options.component';
import { ImportComponent } from './import/import.component';
import { ImportInitializerComponent } from './import/import-initializer/import-initializer.component';
import {SpotifyAuthInterceptor} from "./_helpers/spotify-auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    TokenComponent,
    FileLoaderComponent,
    ImportOptionsComponent,
    ImportComponent,
    ImportInitializerComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpotifyAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
