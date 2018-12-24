import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Bill} from '../shared/models/bill.model';
import {Category} from '../shared/models/category.model';
import {AppEvent} from '../shared/models/event.model';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {
  isLoaded = false;
  sub: Subscription;
  bill: Bill;
  categories: Category[] = [];
  events: AppEvent[] = [];

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventsServise: EventsService) {
  }

  ngOnInit() {
    this.sub = combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsServise.getEvents()
    ).subscribe((data: [Bill, Category[], AppEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    });
  }

  private getPercent(category: Category): number {
    const percent = (100 * this.getCategoryCost(category) / category.capacity);
    return percent > 100 ? 100 : percent;
  }

  getCategoryPercent(category): string {
    return this.getPercent(category) + '%';
  }

  getCategoryCost(category: Category): number {
    const categoryEvents = this.events.filter(e => e.category === category.id && e.type === 'outcome');
    return categoryEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  getCategoryColorClass(category: Category): string {
    const percent = this.getPercent(category);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

}
