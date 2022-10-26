import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
const baseUrl = 'https://devtest.bluedrive.io';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Numbers',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  lineChartLegend = true;
  isGraphReady = false;
  listData:any = [];
  numbers:any = [];
  dates:any = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getList(`${baseUrl}/api/v1/devtest/randominteger/?limit=20`)
  }

  getAuthHeader(): HttpHeaders {
    const token = 'd8efa5fb05336cda75b731ec67e375d28d092ceb';
    return new HttpHeaders().set('Authorization', `Token ${token}`);
  }

  getList(url:string){
    const randomNumAPI = this.httpClient.get(url, { headers: this.getAuthHeader() });
    randomNumAPI.subscribe((response: any) => {
      this.listData = response.results
      this.listData.map((data: any) => {
        this.dates.push(new Date(data.created).toLocaleDateString());
        this.numbers.push(data.value);
      });
      this.lineChartData.datasets[0].data = this.numbers
      this.lineChartData.labels = this.dates
      this.isGraphReady = true;
    });
  }
}
