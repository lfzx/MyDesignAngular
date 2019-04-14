import { Component, Inject, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'header-user',
  styleUrls: ['./personal.component.less'],
  template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown>
      <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
      {{settings.user.name}}
    </div>
    <div nz-menu class="width-sm">
      <div nz-menu-item (click)="openCard()"><i nz-icon type="user" class="mr-sm"></i>
        个人中心
      </div>
      <div nz-menu-item routerLink="/account/settings"><i nz-icon type="setting" class="mr-sm"></i>
        个人设置
      </div>
      <li nz-menu-divider></li>
      <div nz-menu-item (click)="logout()"><i nz-icon type="logout" class="mr-sm"></i>
        退出登录
      </div>
    </div>
  </nz-dropdown>

  <nz-modal [(nzVisible)]="openIsVisible" nzWidth="800px" nzTitle="个人资料"
                     (nzOnCancel)="onOpenCancel()"  [nzContent]='modalContent' [nzFooter]='modalFooter'>

  <ng-template #modalContent>
      <div nz-row nzGutter="24" class="plg">
          <div nz-col nzMd="24" nzLg="24">
            <nz-card [nzBordered]="false" class="mb-lg" [nzLoading]="!user">
              <div *ngIf="role == 1">
                <ng-container *ngIf="user">
                  <div class="avatarHolder">
                    <img src="{{user.avatar}}">
                    <div class="name">{{user.name}}</div>
                    <div>{{user.school}}</div>
                  </div>
                </ng-container>
              </div>

              <div *ngIf="role == 2">
                <ng-container *ngIf="user">
                  <div class="avatarHolder">
                    <img src="{{user.avatar}}">
                    <div class="name">{{user.name}}</div>
                    <div>{{user.school}}</div>
                  </div>
                  <div class="detail">
                    <p><i class="title"></i>{{user.profession}}</p>
                    <p><i class="group"></i>{{user.academic}}</p>
                    <p>
                      <i class="address"></i>
                      {{user.entranceTime}}——{{user.graduationTime}}
                    </p>
                  </div>
                </ng-container>
              </div>

              <div *ngIf="role == 3">
                <ng-container *ngIf="user">
                  <div class="avatarHolder">
                    <img src="{{user.avatar}}">
                    <div class="name">{{user.name}}</div>
                    <div>{{user.organizationCode}}</div>
                  </div>
                  <div class="detail">
                    <p><i class="title"></i>{{user.companyUrl}}</p>
                    <p><i class="group"></i>{{user.companyDescription}}</p>
                  </div>
                </ng-container>
              </div>

            </nz-card>
          </div>
        </div>
      </ng-template>
      <ng-template #modalFooter>
          <button style="color: dodgerblue ; border: 0;
      " nz-button nzType="default" routerLink="/account/settings" (click)="onOpenCancel()">
            <u>点此修改>></u></button>
        </ng-template>

      </nz-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserComponent implements OnInit{
  user: any;

  userLoading = true;
  avatarUrl: string;
  role = +localStorage.getItem('roleid');
  openIsVisible = false;

  constructor(
    private client: HttpClient,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  ngOnInit(): void {
    if (this.role == 1) {
      this.getAdmin();
    } else if (this.role  == 2){
     this.getUser();
    } else {
      this.getCompany();
    }
  }

  getUser(){
    this.client.get(`passport/${localStorage.getItem('uid')}`)
    .subscribe((item: any) => {
      this.settings.setUser(item.list);
      this.user = this.settings.user;
      this.avatarUrl = this.settings.user.avatar;
    this.userLoading = false;
    this.cdr.detectChanges();
    });
  }

  getCompany(){
    this.client.get(`passport/company/${localStorage.getItem('uid')}`)
      .subscribe((item: any) => {
      this.settings.setUser(item.list);
      this.user = this.settings.user;
      this.avatarUrl = this.settings.user.avatar;
    this.userLoading = false;
    this.cdr.detectChanges();
  });
}

getAdmin(){
  this.client.get(`passport/administrator/${localStorage.getItem('uid')}`)
  .subscribe((data: any) => {
    this.settings.setUser(data.list);
    this.user = this.settings.user;
    this.avatarUrl = this.settings.user.avatar;
    this.userLoading = false;
    this.cdr.detectChanges();
});
}

 // 打开个人资料弹框
 openCard() {
  this.openIsVisible = true;
}

onOpenCancel() {
  this.openIsVisible = false;
}

  logout() {
    this.tokenService.clear();
    localStorage.clear();
    this.router.navigateByUrl(this.tokenService.login_url);
  }
}
