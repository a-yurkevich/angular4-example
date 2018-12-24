import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {fadeStateTrigger} from '../shared/animations/fade.animation';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  animations: [fadeStateTrigger]
})

export class SystemComponent implements OnInit {
  @HostBinding('@fade') f = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }
}
