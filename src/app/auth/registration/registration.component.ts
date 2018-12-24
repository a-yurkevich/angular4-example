import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router,
              private usersService: UsersService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbddenEmails.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    const {name, email, password} = this.form.value;
    const user = new User(name, email, password);

    this.usersService.createNewUser(user).subscribe((user: User) => {
      console.log(user);
      this.router.navigate(['/login'], {
        queryParams: {
          canLogin: true
        }
      });
    });
  }

  forbddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value).subscribe((user: User) => {
        if (user[0]) {
          resolve({forbiddenEmail: true});
        } else {
          resolve(null);
        }
      })
    });
  }

}
