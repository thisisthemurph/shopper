import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { MatIconModule } from '@angular/material/icon';
import { OptionsMenuComponent } from './components/options-menu/options-menu.component';
import { ListComponent } from '../shoppinglist/components/list/list.component';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    PageHeaderComponent,
    OptionsMenuComponent,
    ClickOutsideDirective,
  ],
  imports: [RouterModule, CommonModule, FormsModule, MatIconModule],
  exports: [
    HeaderComponent,
    PageHeaderComponent,
    NavComponent,
    OptionsMenuComponent,
  ],
})
export class ShareModule {}
