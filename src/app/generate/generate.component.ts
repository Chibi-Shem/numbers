import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const baseUrl = 'https://devtest.bluedrive.io';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
  }

  getAuthHeader(): HttpHeaders {
    const token = 'd8efa5fb05336cda75b731ec67e375d28d092ceb';
    return new HttpHeaders().set('Authorization', `Token ${token}`);
  }

  generateNumber() {
    const randomNumAPI = this.httpClient.get(`${baseUrl}/api/v1/devtest/randominteger/generate/`, { headers: this.getAuthHeader() });
    randomNumAPI.subscribe((response: any) => {
      alert(response.value)
    });
  }
}
