import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {
  SocialService,
  SocialOpenType,
  ITokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { StartupService } from '@core';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;
  student = 'student';
  company = 'company';
  roles = 'student';

  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required,  Validators.email]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.email]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
    modalSrv.closeAll();
  }

  // #region fields

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }

  // #endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  selecltUser(role: any){
    this.roles = role;
  }

  // #region get captcha

  count = 0;
  interval$: any;

  // #endregion

  submit() {
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) return;
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) return;
    }

    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    if (this.roles !== 'student') {
      this.http
      .post('passport/company/login', {
        email: this.mobile.value,
        password: this.captcha.value,
      })
      .subscribe((res: any) => {
        if (res.msg !== 'ok') {
          this.error = res.msg;
          return;
        }
        localStorage.setItem('uid', res.list.id);
        localStorage.setItem('name', res.list.name);
        localStorage.setItem('avatar', res.list.avatar);
        localStorage.setItem('email', res.list.email);
        localStorage.setItem('appUrl', res.list.appurl);
        localStorage.setItem('roleid', res.list.roleid);
        localStorage.setItem('code', res.list.organizationCode);
        localStorage.setItem('description', res.list.companyDescription);
        localStorage.setItem('url', res.list.companyUrl);
        localStorage.setItem('appurl', 'companyapp');
        // 清空路由复用信息
        this.reuseTabService.clear();
        // 设置用户Token信息
        this.tokenService.set({
          token: res.list.token,
        });
        // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
        this.startupSrv.load().then(() => {
          this.router.navigate(['/']);
        });
      });
    } else {
      this.http
      .post('passport/login', {
        email: this.userName.value,
        password: this.password.value,
      })
      .subscribe((res: any) => {
        if (res.msg !== 'ok') {
          this.error = res.msg;
          return;
        }
        localStorage.setItem('uid', res.list.id);
        localStorage.setItem('name', res.list.name);
        localStorage.setItem('avatar', res.list.avatar);
        localStorage.setItem('email', res.list.email);
        localStorage.setItem('roleid', res.list.roleid);
        localStorage.setItem('resumeid', res.list.resumeid);
        localStorage.setItem('gender', res.list.gender);
        localStorage.setItem('school', res.list.school);
        localStorage.setItem('entranceTime', res.list.entranceTime);
        localStorage.setItem('graduationTime', res.list.graduationTime);
        localStorage.setItem('profession', res.list.profession);
        localStorage.setItem('academic', res.list.academic);
        localStorage.setItem('appurl', 'app');
        // 清空路由复用信息
        this.reuseTabService.clear();
        // 设置用户Token信息
        this.tokenService.set({
          token: res.list.token,
        });
        // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
        this.startupSrv.load().then(() => {
          this.router.navigate(['/']);
        });
      });
    }
  }

  // #endregion

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
