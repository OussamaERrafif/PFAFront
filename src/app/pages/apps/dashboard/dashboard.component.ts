import { Component, OnInit } from "@angular/core";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  options = {
    chart: {
      type: 'line'
    },
    series: [{
      name: 'sales',
      data: [30,40,35,50,49,60,70,91,125]
    }],
    xaxis: {
      categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
    }
  }

  async ngOnInit(): Promise<void> {
    // const apexChart = await import('apexcharts');

    // const chart = new apexChart(document.querySelector("#chart"), this.options);

    // chart.render();

  }

}
