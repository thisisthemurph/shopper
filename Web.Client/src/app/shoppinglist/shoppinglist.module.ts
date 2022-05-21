import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentsComponent } from './components/contents/contents.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ContentsComponent }];

@NgModule({
  declarations: [ContentsComponent],
  imports: [RouterModule.forChild(routes), CommonModule, HttpClientModule],
  exports: [ContentsComponent],
})
export class ShoppinglistModule {}
