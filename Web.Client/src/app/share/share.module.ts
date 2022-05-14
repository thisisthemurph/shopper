import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FunctionBarComponent } from './components/function-bar/function-bar.component';

@NgModule({
  declarations: [HeaderComponent, FunctionBarComponent],
  imports: [CommonModule],
  exports: [HeaderComponent],
})
export class ShareModule {}
