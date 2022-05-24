import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ShoppinglistModule } from './shoppinglist/shoppinglist.module';
import { AuthGuardService as AuthGuard } from './auth/services/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { Auth } from './auth/Auth';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'auth', loadChildren: () => AuthModule },
  {
    path: 'list',
    loadChildren: () => ShoppinglistModule,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => Auth.getToken(),
        allowedDomains: ['http://localhost:4200'],
      },
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
