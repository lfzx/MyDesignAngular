import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'passport-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class UserRegisterComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;
  visible = false;
  status = 'pool';
  progress = 0;
  passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    pool: 'exception',
  };

  constructor(
    fb: FormBuilder,
    private router: Router,
    public http: _HttpClient,
    public msg: NzMessageService,
  ) {
    this.form = fb.group({
      mail: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          UserRegisterComponent.checkPassword.bind(this),
        ],
      ],
      captcha: [null, [Validators.required]],
    });
  }

  static checkPassword(control: FormControl) {
    if (!control) return null;
    const self: any = this;
    self.visible = !!control.value;
    if (control.value && control.value.length > 9) {
      self.status = 'ok';
    } else if (control.value && control.value.length > 5) {
      self.status = 'pass';
    } else {
      self.status = 'pool';
    }

    if (self.visible) {
      self.progress =
        control.value.length * 10 > 100 ? 100 : control.value.length * 10;
    }
  }


  // #region fields

  get mail() {
    return this.form.controls.mail;
  }
  get password() {
    return this.form.controls.password;
  }
  get captcha() {
    return this.form.controls.captcha;
  }

   // #endregion

   switch(ret: any) {
    this.type = ret.index;
  }

  // #endregion

  // #region get captcha

  count = 0;
  interval$: any;

  getCaptcha() {
    if (this.mail.invalid) {
      this.mail.markAsDirty({ onlySelf: true });
      this.mail.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) clearInterval(this.interval$);
    }, 1000);
  }

  // #endregion

  submit() {
    this.error = '';
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.invalid) {
      return;
    }

    const data = this.form.value;
    this.http.post('passport/register', data).subscribe(() => {
      this.router.navigateByUrl('/passport/register-result', {
        queryParams: { email: data.mail },
      });
    });
  }

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
