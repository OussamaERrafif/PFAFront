import { Component, OnInit } from '@angular/core';
import { dashguard } from './dashboard.guard';
import { Router } from '@angular/router';
import { ChartModule } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [dashguard],
})
export class DashboardComponent {
  constructor(private router: Router, private dashguard: dashguard) {
    this.dashguard.canActivateChild();
  }
  pieChart= new Chart({
    chart: {
      type: 'pie',
      plotShadow: false,
  },

  credits: {
    enabled: false,
  },

  plotOptions: {
    pie: {
      innerSize: '99%',
      borderWidth: 10,
      borderColor: '',
      slicedOffset: 10,
      dataLabels: {
        connectorWidth: 0,
      },
    },
  },

  title: {
    text: ''
  },
  tooltip: {
    pointFormat: '{series.name}: <b>${point.y:.1f}</b>'
  },
  series: [
    {
      type: 'pie', // Add the type property with value 'pie'
      name: 'Data',
      data: [
        ['Social Campaign', 30000],
        ['TV Campaign', 45000],
        ['Google Ads', 25000],
        ['Email Newletter', 35000],
        ['Radio', 5000],
        ['Courses', 50000]
      ]
    }
  ]
  });
}
