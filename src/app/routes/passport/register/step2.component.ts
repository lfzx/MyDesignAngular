import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TransferService } from './transfer.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step2Component implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, public item: TransferService, public http: HttpClient) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      personalNumber: [null, [Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
      avatar: [null],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ],
      ]
    });
  }

   //#region get form fields
   get email() {
    return this.form.controls['email'];
  }
  get personalNumber() {
    return this.form.controls['personalNumber'];
  }
  get avatar() {
    return this.form.controls['avatar'];
  }
  get password() {
    return this.form.controls['password'];
  }
  //#endregion



  _submitForm() {
    this.loading = true;
    this.item = Object.assign(this.item, this.form.value);
    setTimeout(() => {
      this.loading = false;
      console.log(this.item);
      this.http.post('passport/company/register', this.item).subscribe(() => {
        ++this.item.step;
      });
    }, 1000 * 2);
  }

  prev() {
    --this.item.step;
  }
}
