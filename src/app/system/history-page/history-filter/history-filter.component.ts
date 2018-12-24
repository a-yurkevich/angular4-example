import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() onPopupCancel = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  closePopup() {
    this.onPopupCancel.emit();
  }

}
