import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TransferService } from './transfer.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step2Component implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, public item: TransferService) {}

  ngOnInit() {
    this.form = this.fb.group({
      postName: [null, [Validators.required, Validators.minLength(4)]],
      postWorkPlace: [null, [Validators.required]],
      postSalary: [null, [Validators.required]],
      numberOfRecruits: [null, [Validators.required]],
      postJobType: [null, [Validators.required]]
    });
    this.form.patchValue(this.item);
  }

  //#region get form fields
  get postName() {
    return this.form.controls.postName;
  }
  get postWorkPlace() {
    return this.form.controls.postWorkPlace;
  }
  get postSalary() {
    return this.form.controls.postSalary;
  }
  get numberOfRecruits() {
    return this.form.controls.numberOfRecruits;
  }
  get postJobType() {
    return this.form.controls.postJobType;
  }
  //#endregion

  _submitForm() {
    this.item = Object.assign(this.item, this.form.value);
    ++this.item.step;
  }

  prev() {
    --this.item.step;
  }
}



