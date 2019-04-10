import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
      birth: [null, [Validators.required]],
      familyAddress: [null, [Validators.required]],
      resumeAvatar: [null],
      resumeTelephoneNumber: [null, [Validators.required]],
    });
    this.form.patchValue(this.item);
  }



   //#region get form fields
  get birth() {
    return this.form.controls.birth;
  }
  get familyAddress() {
    return this.form.controls.familyAddress;
  }
  get resumeAvatar() {
    return this.form.controls.resumeAvatar;
  }
  get resumeTelephoneNumber() {
    return this.form.controls.resumeTelephoneNumber;
  }
  //#endregion

  _submitForm() {
    this.item = Object.assign(this.item, this.form.value);
    ++this.item.step;
  }
}
