import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-company-bus-posts',
  templateUrl: './posts.component.html',
})
export class CompanyBusPostsComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
