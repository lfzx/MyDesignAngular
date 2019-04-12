import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TransferService } from './transfer.service';

@Component({
  selector: 'app-creat-posts',
  templateUrl: './creat-posts.component.html',
  styleUrls: ['./creat-posts.component.less'],
  providers: [TransferService]
})
export class CreatPostsComponent implements AfterViewInit {
  constructor(public item: TransferService) {}

  ngAfterViewInit() {
    console.log('item', this.item);
  }

}
