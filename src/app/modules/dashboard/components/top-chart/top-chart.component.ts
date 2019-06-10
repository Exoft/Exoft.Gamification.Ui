import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-top-chart',
  templateUrl: './top-chart.component.html',
  styleUrls: ['./top-chart.component.scss']
})
export class TopChartComponent implements OnInit {

  public pageData: any = [];
  public title = 'Gamification';
  public BarChart = [];

  ngOnInit() {

    for (let index = 0; index < 5; index++) {
      this.pageData.push(this.userInfo());
    }
    this.dataSort();
    this.setupChart(this.pageData);
  }

  private userInfo() {
    return {
      img: 'https://www.lovethegarden.com/sites/default/files/content/articles/UK_wildbirds-01-robin.jpg',
      name: `Name Surname ${Math.floor(Math.random() * 10)}`,
      xp: Math.floor(Math.random() * 100)
    }
  }

  public dataSort() {
    return this.pageData.sort(this.compare).reverse();
  }
  private compare(a, b) {
    if (a.xp < b.xp) {
      return -1;
    }
    if (a.xp > b.xp) {
      return 1;
    }
    return 0;
  }


  private setupChart(pageData: any) {
    this.BarChart = new Chart('barChart', {
      type: 'horizontalBar',
      data: {
        labels: ['', '', '', '', ''],
        datasets: [{
          label: 'Total XP',
          data: pageData.map(s => s.xp).sort().reverse(),
          backgroundColor: [
            '#1398E6',
            '#9336C2',
            '#DB871A',
            '#37E9E4',
            '#E71A1A'],
          borderWidth: 0
        }]
      },
      options: {
        legend: {
          display: false
        },
        title: {
          display: true
        },
        scales: {
          yAxes: [{
            barThickness: 10,
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero: true,
              fontColor: '#FFFFFF'
            }
          }],
          xAxes: [{
            beginAtZero: true,
           display: false
          }]
        }
      }
    });
  }


}



