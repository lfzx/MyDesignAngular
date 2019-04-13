import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Subscription, zip } from 'rxjs';
import { Router, ActivationEnd } from '@angular/router';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalComponent implements OnInit {

  private router$: Subscription;
  user: any;

  constructor(
    private router: Router,
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    zip(this.http.get('/user/current'))
    .subscribe((user: any) => {
      this.user = user;
      this.cdr.detectChanges();
    });
  }
}
