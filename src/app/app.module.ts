import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from '@gorniv/ngx-universal';
import { AppInitService } from './app.init.service';

export function appInit(appInitService: AppInitService): () => Promise<any> {
  return () => appInitService.initApp();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CookieModule.forRoot(),
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [AppInitService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
