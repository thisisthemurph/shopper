import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingList } from '../../models/shoppinglist.interface';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  public shoppingList: ShoppingList | null = null;

  constructor(
    private route: ActivatedRoute,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = Number(params.get('listId'));

      this.shoppingService.getList(id).subscribe((list) => {
        console.log({ list });
        this.shoppingList = list;
      });
    });
  }
}
