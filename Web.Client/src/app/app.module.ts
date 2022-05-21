import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ShareModule } from './share/share.module';
import { ShoppinglistModule } from './shoppinglist/shoppinglist.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ListCollectionPageComponent } from './pages/list-collection-page/list-collection-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NotFoundPageComponent,
    ListCollectionPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShareModule,
    ShoppinglistModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
