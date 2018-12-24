import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent {
  view: any[] = [700, 400];
  @Input() data;
}
