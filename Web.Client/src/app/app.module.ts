import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareModule } from './share/share.module';
import { ShoppinglistModule } from './shoppinglist/shoppinglist.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ShareModule, ShoppinglistModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}