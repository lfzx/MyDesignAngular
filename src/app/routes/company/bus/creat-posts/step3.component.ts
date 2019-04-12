import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwalService } from '@core/swal.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TransferService } from './transfer.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step3Component implements OnInit {

  url = 'passport/posts/register';

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
      academicRequirements: [null, [Validators.required]],
      postExperience: [null, [Validators.required]],
      postDescription: [null, [Validators.required]],
      postEmail: [null, [Validators.required,Validators.email]],
      postTelephoneNumber: [null]

    });
    this.form.patchValue(this.item);
  }



   //#region get form fields
  get academicRequirements() {
    return this.form.controls.academicRequirements;
  }
  get postExperience() {
    return this.form.controls.postExperience;
  }
  get postDescription() {
    return this.form.controls.postDescription;
  }
  get postEmail() {
    return this.form.controls.postEmail;
  }
  get postTelephoneNumber() {
    return this.form.controls.postTelephoneNumber;
  }
  //#endregion

  _submitForm() {
    this.item = Object.assign(this.item, this.form.value);
    this.item = Object.assign(this.item, this.form.value);
    setTimeout(() => {
      this.loading = true;
      this.http.post(this.url, this.item).subscribe((item: any) =>{
        if (item.msg === 'ok') {
          this.msg.success(item.msg + '创建成功！');
          this.router.navigateByUrl(`company/posts`) ;
        } else {
        this.msg.error('创建失败!' + '/br' + item.msg);
        this.item.step = 0;
      }
    });
      // ++this.item.step;
    }, 100);
  }

  prev() {
    --this.item.step;
  }

}



