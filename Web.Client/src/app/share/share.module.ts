import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FunctionBarComponent } from './components/function-bar/function-bar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, FunctionBarComponent],
  imports: [CommonModule, FormsModule],
  exports: [HeaderComponent],
})
export class ShareModule {}
