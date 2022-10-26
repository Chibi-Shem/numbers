import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const baseUrl = 'https://devtest.bluedrive.io';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  numbers:any = []
  nextPage = `${baseUrl}/api/v1/devtest/randominteger/?limit=10&offset=10`
  prevPage = `${baseUrl}/api/v1/devtest/randominteger/?limit=10`

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getList(`${baseUrl}/api/v1/devtest/randominteger/`)
  }

  getAuthHeader(): HttpHeaders {
    const token = 'd8efa5fb05336cda75b731ec67e375d28d092ceb';
    return new HttpHeaders().set('Authorization', `Token ${token}`);
  }

  getList(url:string){
    const randomNumAPI = this.httpClient.get(url, { headers: this.getAuthHeader() });
    randomNumAPI.subscribe((response: any) => {
      if(response.next){
        this.nextPage=response.next
      }
      if(response.previous){
        this.prevPage=response.previous
      }
      this.numbers = response.results
    });
  }
}
