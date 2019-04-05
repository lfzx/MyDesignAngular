import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TransferService } from './transfer.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step1Component implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, public item: TransferService) {}

  ngOnInit() {
    this.form = this.fb.group({
      companyName: [null, [Validators.required, Validators.minLength(4)]],
      organizationCode: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      companyDescription: [null, [Validators.required, Validators.minLength(20)]],
      companyUrl: [null],

    });
    this.form.patchValue(this.item);
  }



   //#region get form fields
  get companyName() {
    return this.form.controls.companyName;
  }
  get organizationCode() {
    return this.form.controls.organizationCode;
  }
  get companyDescription() {
    return this.form.controls.companyDescription;
  }
  get companyUrl() {
    return this.form.controls.companyUrl;
  }
  //#endregion

  _submitForm() {
    this.item = Object.assign(this.item, this.form.value);
    ++this.item.step;
  }
}