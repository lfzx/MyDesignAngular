import { Component, ChangeDetectionStrategy, OnInit, Inject } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { SwalService } from '@core/swal.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Company } from 'app/entity/company';
import { User } from '@delon/theme';
import { Admin } from 'app/entity/admin';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityComponent implements OnInit {

  data = [{}];
  role = +localStorage.getItem('roleid');
  email = localStorage.getItem('email');

  editIsVisible = false;
  editForm: FormGroup;
  isEdit = false;
  addOrdEditLoading = false;
  userEdit: User;
  adminEdit: Admin;
  companyEdit: Company;

  constructor(
    private router: Router,
    private modal: NzModalService,
    private swal: SwalService,
    private fb: FormBuilder,
    private client: HttpClient,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    ) {}

  ngOnInit() {
    this.editForm = this.fb.group({
      email: [null],
      password: [null],
      newPassword: [null],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  openEdit(u?: any) {
      this.isEdit = true;
      // 匹配表单的值
      this.editForm.patchValue(localStorage);
      this.userEdit = localStorage;
      this.editIsVisible = true;
  }

  onAddOrEditCancel() {
      this.editIsVisible = false;
  }

  onEditUserSubmit() {
        if (this.editForm.valid) {
          this.addOrdEditLoading = true;
          let id = localStorage.getItem('uid');
          this.userEdit = this.editForm.value;
          this.userEdit.id = id;
          this.client.put(`passport/password/${this.userEdit.id}`, this.userEdit).subscribe(
            (item: any) => {
              if (item.msg === 'ok') {
                  this.swal.success('修改成功！请重新登录' + item.msg);
                  this.modal.closeAll();
                  this.addOrdEditLoading = false;
                  this.tokenService.clear();
                  localStorage.clear();
                  this.router.navigateByUrl(this.tokenService.login_url);
              } else {
              this.swal.error('修改失败!' + '/br' + item.msg);
              this.modal.closeAll();
              this.addOrdEditLoading = false;
              this.router.navigateByUrl('/account/settings/security');
            }
            });
        }
      }

  onEditCompanySubmit() {
        if (this.editForm.valid) {
          this.addOrdEditLoading = true;
          let id = localStorage.getItem('uid');
          this.userEdit = this.editForm.value;
          this.companyEdit.companyId = id;
          this.client.patch(`passport/company/password/${this.companyEdit.companyId}`, this.userEdit).subscribe(
            (item: any) => {
              if (item.msg === 'ok') {
                this.swal.success('修改成功！请重新登录' + item.msg);
                  this.modal.closeAll();
                  this.addOrdEditLoading = false;
                  this.tokenService.clear();
                  localStorage.clear();
                  this.router.navigateByUrl(this.tokenService.login_url);
            } else {
            this.swal.error('修改失败!' + '/br' + item.msg);
            this.modal.closeAll();
            this.addOrdEditLoading = false;
            this.router.navigateByUrl('/account/settings/security');
          }
            });
        }
      }

  onEditAdminSubmit() {
        if (this.editForm.valid) {
          this.addOrdEditLoading = true;
          let id = localStorage.getItem('uid');
          this.userEdit = this.editForm.value;
          this.adminEdit.adminId = id;
          this.client.patch(`passport/administrator/password/${this.adminEdit.adminId}`, this.userEdit).subscribe(
            (item: any) => {
              if (item.msg === 'ok') {
                this.swal.success('修改成功！请重新登录' + item.msg);
                  this.modal.closeAll();
                  this.addOrdEditLoading = false;
                  this.tokenService.clear();
                  localStorage.clear();
                  this.router.navigateByUrl(this.tokenService.login_url);
            } else {
            this.swal.error('修改失败!' + '/br' + item.msg);
            this.modal.closeAll();
            this.addOrdEditLoading = false;
            this.router.navigateByUrl('/account/settings/security');
          }
            });
        }
      }

      confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
          return { required: true };
        } else if (control.value !== this.editForm.controls.newPassword.value) {
          return { confirm: true, error: true };
        }
        return {};
      }


}
