import {Component, OnDestroy, OnInit} from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';

import { combineLatest, Subscription } from 'rxjs';
import { Category } from '../shared/models/category.model';
import { AppEvent } from '../shared/models/event.model';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  isLoaded = true;
  sub: Subscription;
  categories: Category[] = [];
  events: AppEvent[] = [];
  chartData = [];
  isPopupVisible = false;

  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.sub = combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Category[], AppEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];
      this.calculateChartData();
      this.isLoaded = true;
    });
  }

  calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach((category) => {
      const categoryEvents = this.events.filter((e) => e.category === category.id && e.type === 'outcome');
      this.chartData.push({
        name: category.name,
        value: categoryEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  private togglePopupVisibility(isOpen: boolean) {
    this.isPopupVisible = isOpen;
  }

  openPopup() {
    this.togglePopupVisibility(true);
  }

  onPopupCancel() {
    this.togglePopupVisibility(false);
  }

  ngOnDestroy() {
    // if (this.sub) this.sub.unsubscribe();
  }

}
