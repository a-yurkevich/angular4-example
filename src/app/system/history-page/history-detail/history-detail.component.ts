import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EventsService} from '../../shared/services/events.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {AppEvent} from '../../shared/models/event.model';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: AppEvent;
  isLoaded = false;
  sub1: Subscription;
  sub2: Subscription;

  constructor(private route: ActivatedRoute,
              private eventService: EventsService,
              private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.sub1 = this.route.params.subscribe((params: Params) => {
      this.sub2 = this.eventService.getEventById(params['id']).subscribe((event: AppEvent) => {
        console.log(event);
        this.event = event;
        this.isLoaded = true;
      });
    });
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
    if (this.sub2) this.sub2.unsubscribe();
  }

}
