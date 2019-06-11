import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {

  public test: any = {
    img: 'https://www.lovethegarden.com/sites/default/files/content/articles/UK_wildbirds-01-robin.jpg',
    name: `test ${Math.floor(Math.random() * 10)}`,
    xp: Math.floor(Math.random() * 10)
  };

  ngOnInit() {
  }

}
