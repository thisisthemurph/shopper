import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [HeaderComponent, NavComponent, PageHeaderComponent],
  imports: [RouterModule, CommonModule, FormsModule],
  exports: [HeaderComponent, PageHeaderComponent],
})
export class ShareModule {}
