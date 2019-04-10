import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransferService } from './transfer.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step3Component implements OnInit{
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, public item: TransferService) {}

  ngOnInit() {
    this.form = this.fb.group({
      resumeExperience: [null, [Validators.required, Validators.minLength(4)]],
      skill: [null, [Validators.required]]
    });
    this.form.patchValue(this.item);
  }

  //#region get form fields
  get resumeExperience() {
    return this.form.controls.resumeExperience;
  }
  get skill() {
    return this.form.controls.skill;
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


