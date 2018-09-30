import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // properties
  user: User = {
    firstName: '',
    lastName: '',
    email: ''
  };
  users: User[];
  showExtended: Boolean = true;
  loaded: Boolean = false;
  enableAdd: Boolean = false;
  showUserForm: Boolean = false;
  @ViewChild('userForm') form: any;
  data: any;

  constructor(private dataService: UserService) {}

  ngOnInit() {
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
      this.loaded = true;
    });
  }

  toggleHide(user: User) {
     user.hide = !user.hide;
  }

  onSubmit({value, valid}: {value: User, valid: Boolean}) {
    if (!valid) {
      console.log('Form is not valid');
    } else {
      value.isActive = true;
      value.registered = Date.now();
      value.hide = true;
      this.dataService.addUser(value);
      this.form.reset();
    }
  }
}
