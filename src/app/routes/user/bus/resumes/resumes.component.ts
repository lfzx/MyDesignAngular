import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-user-bus-resumes',
  templateUrl: './resumes.component.html',
})
export class UserBusResumesComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
