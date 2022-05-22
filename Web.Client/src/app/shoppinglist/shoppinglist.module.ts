import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListGroupComponent } from './components/contents/list-group.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ListGroupComponent }];

@NgModule({
  declarations: [ListGroupComponent],
  imports: [RouterModule.forChild(routes), CommonModule, HttpClientModule],
  exports: [ListGroupComponent],
})
export class ShoppinglistModule {}
