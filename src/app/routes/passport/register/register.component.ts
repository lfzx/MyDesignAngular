import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

import { TransferService } from './transfer.service';


@Component({
  selector: 'passport-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  providers: [TransferService],
})
export class UserRegisterComponent implements AfterViewInit {
  constructor(public item: TransferService) {}

  ngAfterViewInit() {
    console.log('item', this.item);
  }
}