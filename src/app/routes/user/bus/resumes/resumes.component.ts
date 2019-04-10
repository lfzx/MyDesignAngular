import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ActivatedRoute } from '@angular/router';
import { Resume } from 'app/entity/resume';
import { ResumeUser } from 'app/entity/resumeUser';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SwalService } from '@core/swal.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-bus-resumes',
  templateUrl: './resumes.component.html',
})
export class UserBusResumesComponent implements OnInit{

  // private resumeId: number; // 定义一个变量来接收路由传递过来的productId

  isShow = false;
  user: ResumeUser;
  resume: Resume;

  editIsVisible = false;
  editForm: FormGroup;
  isEdit = false;
  addOrdEditLoading = false;

  constructor(
    private http: _HttpClient,
    private msg: SwalService,
    private client: HttpClient,
    private modal: NzModalService,
    private fb: FormBuilder,
     private routeInfo: ActivatedRoute) { }

     // 从查询参数里面去取改为从URL中去取，将原来的queryparams改为params
    ngOnInit() {
      this.resume = new Resume();
      this.user = new ResumeUser();
      if (localStorage.getItem('resumeid').length != 0) {
        this.isShow = true;
        this.getResume();
      }

      this.editForm = this.fb.group({
        birth: [null],
        familyAddress: [null],
        resumeTelephoneNumber: [null],
        resumeExperience: [null],
        skill: [null],
        resumePostName: [null],
        resumeJobType: [null],
        resumeWorkPlace: [null],
        resumeSalary: [null]
      });

      // 通过参数快照去获取到id
      // this.resumeId = this.routeInfo.snapshot.params['id'];
      // console.log(this.resumeId);
       }

       getResume() {
        this.http.get(`passport/resume/${localStorage.getItem('resumeid')}`)
        .subscribe((item: any) => {
          this.resume = item.list;
          this.user = item.list.responseUserModel;
        });
       }

       // 打开添加弹出框
  openEdit(u?: any) {

    if (u != null || u != undefined) {
      this.isEdit = true;
      // 匹配表单的值
      this.editForm.patchValue(u);
      this.resume = u;
      this.editIsVisible = true;
    } else {
      this.editIsVisible = false;
    }
  }

  onAddOrEditCancel() {
      this.editIsVisible = false;
  }

  onEditSubmit() {
        if (this.editForm.valid) {
          this.addOrdEditLoading = true;
          let id = this.resume.resumeId;
          this.resume = this.editForm.value;
          this.resume.resumeId = id;
          this.client.put(`passport/resume/${this.resume.resumeId}`, this.resume).subscribe(
            (item: any) => {
              if (item.msg === 'ok') {
                this.msg.success('编辑成功！' + item.msg);
                this.modal.closeAll();
                this.addOrdEditLoading = false;
                this.getResume();
              } else{
              this.msg.error('编辑失败!' + '/br' + item.msg);
              this.modal.closeAll();
              this.addOrdEditLoading = false;
              this.getResume();
            }
            });
        }
      }

}

