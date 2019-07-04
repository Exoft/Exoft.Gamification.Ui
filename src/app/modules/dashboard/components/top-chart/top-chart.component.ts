import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialog } from '@angular/material';
import { OtherUserProfileComponent } from '../other-user-profile/other-user-profile.component';
import { RequestService } from 'src/app/services/dashboardequest.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-top-chart',
  templateUrl: './top-chart.component.html',
  styleUrls: ['./top-chart.component.scss']
})
export class TopChartComponent implements OnInit {
  constructor(public dialog: MatDialog,
    private requestService: RequestService,
    private dialogService: DialogService) { }
  public pageData: any = [];
  public title = 'Gamification';
  public BarChart = [];
  public response: any = [];
  public maxXp: number;
  public xpValue: number;
  ngOnInit() {
    this.loadData();

  }

  private loadData() {
    this.requestService.getAllUsers().subscribe(response => {
      this.pageData = response.data;
      this.setupChart(this.pageData.map(s => s.xp));
      this.getMaxXp(this.pageData[0].xp);
    });
  }

  public getMaxXp(xp: number) {
    this.maxXp = xp;
  }

  public getXpValue(value: number){
   return  (value * 100) / this.pageData[0].xp;
    
  }

  public openUserDetails(userId: any) {
    this.dialogService.openInfoModal(userId);
  }

  public AvatarId(avatarId: any) {
    return 'http://localhost:5000/api/files/' + avatarId;
  }

  private setupChart(xp: any) {
    this.BarChart = new Chart('barChart', {
      type: 'horizontalBar',
      data: {
        labels: ['', '', '', '', ''],
        datasets: [{
          label: 'Total XP',
          data: [...xp, 0],
          backgroundColor: [
            '#1398E6',
            '#9336C2',
            '#DB871A',
            '#37E9E4',
            '#E71A1A'],
          borderWidth: 0
        }]
      },
      responsive: true,
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
            display: false,
            barPercentage: 0.3
          }],
        }
      }
    });
  }

}
