import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { FunctionBarComponent } from '../shoppinglist/components/function-bar/function-bar.component';
import { ListGroupPageComponent } from './pages/list-group-page/list-group-page.component';
import { FormsModule } from '@angular/forms';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ShareModule } from '../share/share.module';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  { path: '', component: ListGroupPageComponent },
  { path: ':listId', component: ListPageComponent },
];

@NgModule({
  declarations: [
    ListGroupComponent,
    ListComponent,
    FunctionBarComponent,
    ListGroupPageComponent,
    ListPageComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    FormsModule,
    ShareModule,
    MatIconModule,
  ],
  exports: [],
})
export class ShoppinglistModule {}
