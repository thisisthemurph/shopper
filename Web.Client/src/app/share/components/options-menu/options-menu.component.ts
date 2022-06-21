import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OptionsMenuService } from '../../services/options-menu.service';

export enum OptionsMenuVariant {
  Normal = 'normal',
  Error = 'error',
  Warning = 'warning',
}

export interface OptionsMenuItem {
  text: string;
  onClick: () => void;
  variant?: OptionsMenuVariant;
}

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss'],
})
export class OptionsMenuComponent implements OnInit, OnDestroy {
  @Input() key!: number;
  @Input() items: OptionsMenuItem[] = [];
  @Input() closeOnClick = true;

  public isOpen: boolean = false;
  public OptionsMenuVariantEnum = OptionsMenuVariant;
  private optionsMenuSubscription$!: Subscription;

  constructor(private optionsMenuService: OptionsMenuService) {}

  ngOnInit(): void {
    this.optionsMenuSubscription$ =
      this.optionsMenuService.optionsMenuEvent.subscribe((keyToOpen) => {
        this.isOpen = this.isOpen ? false : keyToOpen === this.key;
      });
  }

  ngOnDestroy(): void {
    this.closeMenu();
    this.optionsMenuSubscription$.unsubscribe();
  }

  public closeMenu() {
    this.optionsMenuService.closeAll();
  }

  public openMenu(): void {
    this.optionsMenuService.open(this.key);
  }

  public onClickOutside(): void {
    if (this.isOpen) {
      this.closeMenu();
    }
  }

  public onItemClick(callback: () => void) {
    callback();

    if (this.closeOnClick) {
      this.closeMenu();
    }
  }
}
