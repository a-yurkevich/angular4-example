import {Component, Input, OnInit} from '@angular/core';
import {AppEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() events: AppEvent[] = [];
  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount';

  constructor() {
  }

  // todo ???
  ngOnInit() {
    this.events.forEach((e) => {
      e.categoryName = this.categories.find(c => c.id === e.category).name;
    });
  }

  getEventClass(e: AppEvent) {
    return {
      'red': e.type === 'outcome',
      'green': e.type === 'income'
    };
  }

  onChange(type: string) {
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };

    this.searchPlaceholder = namesMap[type];
    this.searchField = type;
  }

}
