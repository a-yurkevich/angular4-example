import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {fadeStateTrigger} from '../shared/animations/fade.animation';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  animations: [fadeStateTrigger]
})

export class AuthComponent implements OnInit {
  @HostBinding('@fade') f = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/login']);
  }
}
