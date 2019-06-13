import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public avatarSource =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPxOAXqa96ewc_EUYvIjO6oefUTlGg1qo_AMJv7qQQlhP3vns2IA';
  public userName = "Taras Shevchenko";
  public status = "I love Alpacas!";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onOpenProfileSettings() {
    this.router.navigate(['/profile-settings']);
  }
}
