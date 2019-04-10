import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransferService } from './transfer.service';
import { HttpClient } from '@angular/common/http';
import { SwalService } from '@core/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step4Component implements OnInit {

  url = 'passport/resume/register';

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    public item: TransferService,
    private msg: SwalService,
    private router: Router,
    public http: HttpClient) {}

  ngOnInit() {
    this.form = this.fb.group({
      resumePostName: [null, [Validators.required]],
      resumeJobType: [null, [Validators.required]],
      resumeSalary: [null, [Validators.required]],
      resumeWorkPlace: [null],
    });
    this.form.patchValue(this.item);
  }



   //#region get form fields
  get resumePostName() {
    return this.form.controls.resumePostName;
  }
  get resumeJobType() {
    return this.form.controls.resumeJobType;
  }
  get resumeSalary() {
    return this.form.controls.resumeSalary;
  }
  get resumeWorkPlace() {
    return this.form.controls.resumeWorkPlace;
  }
  //#endregion

  _submitForm() {
    this.item = Object.assign(this.item, this.form.value);
    this.item = Object.assign(this.item, this.form.value);
    setTimeout(() => {
      this.loading = true;
      console.log(this.item);
      this.http.post(this.url, this.item).subscribe((item: any) =>{
        if (item.msg === 'ok') {
          this.msg.success(item.msg + '创建成功！');
          localStorage.setItem('resumeid', item.list.id);
          this.router.navigateByUrl(`user/resumes`) ;
        } else {
        this.msg.error('创建失败!' + '/br' + item.msg);
        this.item.step = 0;
      }
    });
      // ++this.item.step;
    }, 300);
  }

  prev() {
    --this.item.step;
  }

}


