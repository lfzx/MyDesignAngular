import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityComponent implements OnInit {

  data = [{}];

  constructor(public msg: NzMessageService) {}

  ngOnInit() {
  }

}
