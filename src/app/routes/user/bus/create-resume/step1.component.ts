import { Component, AfterViewInit } from '@angular/core';
import { TransferService } from './transfer.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./create-resume.component.less'],
  providers: [TransferService]
})
export class Step1Component implements AfterViewInit {
  constructor(public item: TransferService) {}

  ngAfterViewInit() {
    console.log('item', this.item);
  }
}
