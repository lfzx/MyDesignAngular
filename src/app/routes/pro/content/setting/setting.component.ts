import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingComponent implements AfterViewInit, OnDestroy  {

  private resize$: Subscription;
  private router$: Subscription;
  mode = 'inline';
  title: string;
  user: any;
  menus: any[] = [
    {
      key: 'base',
      title: '基本设置',
    },
    {
      key: 'security',
      title: '安全设置',
    }
  ];

  pos = 0;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
  ) {
    this.router$ = this.router.events
      .pipe(filter(e => e instanceof ActivationEnd))
      .subscribe(() => this.setActive());
  }

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    // this.menus.forEach(i => {
    //   i.selected = i.key === key;
    // });
    const idx = this.menus.findIndex(w => w.key === key);
    if (idx !== -1) this.pos = idx;
    this.title = this.menus.find(w => w.key === key).title;
  }

  to(item: any) {
    this.router.navigateByUrl(`/account/settings/${item.key}`);
  }

  private resize() {
    const el = this.el.nativeElement as HTMLElement;
    let mode = 'inline';
    const { offsetWidth } = el;
    if (offsetWidth < 641 && offsetWidth > 400) {
      mode = 'horizontal';
    }
    if (window.innerWidth < 768 && offsetWidth > 400) {
      mode = 'horizontal';
    }
    this.mode = mode;
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.resize$ = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => this.resize());
  }

  ngOnDestroy(): void {
    this.resize$.unsubscribe();
    this.router$.unsubscribe();
  }

}
