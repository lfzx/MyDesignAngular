import { Component, OnInit } from '@angular/core';
import { ResumeUser } from 'app/entity/resumeUser';
import { Resume } from 'app/entity/resume';
import { Post } from 'app/entity/post';
import { Company } from 'app/entity/company';
import { Interview } from 'app/entity/interview';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '@core/swal.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-interview-detail',
  templateUrl: './interview-detail.component.html',
  styles: []
})
export class InterviewDetailComponent implements OnInit {
  private recommendId: string; // 定义一个变量来接收路由传递过来的productId

  user: ResumeUser;
  resume: Resume;
  post: Post;
  company: Company;
  interviews: Interview;

  editIsVisible = false;
  editForm: FormGroup;
  isEdit = false;
  addOrdEditLoading = false;

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private modal: NzModalService,
     private routeInfo: ActivatedRoute,
    private msg: SwalService, private router: Router) { }

  ngOnInit() {
     // 通过参数快照去获取到id
     this.recommendId = this.routeInfo.snapshot.params['id'];
     this.getInterview(this.recommendId);

     this.resume = new Resume();
      this.user = new ResumeUser();
      this.post = new Post();
      this.company = new Company();
      this.interviews = new Interview();

      this.editForm = this.fb.group({
        userResponse: [null]
      });
  }

  getInterview(id: string) {
 this.http.get(`passport/interview/${id}`)
          .subscribe((res: any) => {
            this.user = res.list.userModel;
            this.resume = res.list.resumeModel;
            this.company = res.list.companyUserModel;
            this.post = res.list.postModel;
            this.interviews = res.list;
          });
  }

  return() {
    this.router.navigateByUrl(`user/interview`) ;
  }

  openGrade(u?: any) {
    if (u != null || u != undefined) {
      this.isEdit = true;
      // 匹配表单的值
      this.editForm.patchValue(u);
      this.interviews = u;
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
          let id = this.interviews.interviewId;
          this.interviews = this.editForm.value;
          this.interviews.interviewId = id;
          this.http.patch(`passport/interview/${this.interviews.interviewId}`, this.interviews).subscribe(
            (item: any) => {
              if (item.msg === 'ok') {
                  this.msg.success('回复成功！' + item.msg);
                  this.modal.closeAll();
                  this.addOrdEditLoading = false;
                  this.router.navigateByUrl(`user/interview`) ;
                } else {
              this.msg.error('回复失败!' + '/br' + item.msg);
              this.modal.closeAll();
              this.addOrdEditLoading = false;
              this.getInterview(this.recommendId);
            }
            });
        }
      }

  }

