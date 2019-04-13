import { Component, OnInit } from '@angular/core';
import { ResumeUser } from 'app/entity/resumeUser';
import { Resume } from 'app/entity/resume';
import { Post } from 'app/entity/post';
import { Company } from 'app/entity/company';
import { Recommend } from 'app/entity/recommend';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '@core/swal.service';
import { Interview } from 'app/entity/interview';

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


 constructor(private http: HttpClient, private routeInfo: ActivatedRoute,
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
   this.router.navigateByUrl(`company/inerview`) ;
 }

}

