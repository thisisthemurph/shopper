import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ShoppinglistModule } from './shoppinglist/shoppinglist.module';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'auth', loadChildren: () => AuthModule },
  { path: 'list', loadChildren: () => ShoppinglistModule },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
