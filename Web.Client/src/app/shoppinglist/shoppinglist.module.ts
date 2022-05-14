import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentsComponent } from './components/contents/contents.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ContentsComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [ContentsComponent],
})
export class ShoppinglistModule {}
