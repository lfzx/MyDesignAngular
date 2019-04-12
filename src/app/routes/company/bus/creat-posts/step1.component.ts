import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransferService } from './transfer.service';

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
      city: [null, [Validators.required]]
    });
    this.form.patchValue(this.item);
  }



   //#region get form fields
  get city() {
    return this.form.controls.city;
  }
  //#endregion

  _submitForm() {
    this.item = Object.assign(this.item, this.form.value);
    ++this.item.step;
  }
}

