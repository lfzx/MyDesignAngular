import { Component, OnInit } from '@angular/core';
import { ResumeUser } from 'app/entity/resumeUser';
import { Resume } from 'app/entity/resume';
import { Post } from 'app/entity/post';
import { Company } from 'app/entity/company';
import { Recommend } from 'app/entity/recommend';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '@core/swal.service';

@Component({
  selector: 'app-recommend-detail',
  templateUrl: './recommend-detail.component.html',
  styles: []
})
export class RecommendDetailComponent implements OnInit {

  private recommendId: string; // 定义一个变量来接收路由传递过来的productId

   user: ResumeUser;
  resume: Resume;
  post: Post;
  company: Company;
  recommend: Recommend;


  constructor(private http: HttpClient, private routeInfo: ActivatedRoute,
    private msg: SwalService, private router: Router) { }

  ngOnInit() {
     // 通过参数快照去获取到id
     this.recommendId = this.routeInfo.snapshot.params['id'];
     this.getRecommend(this.recommendId);

     this.resume = new Resume();
      this.user = new ResumeUser();
      this.post = new Post();
      this.company = new Company();
      this.recommend = new Recommend();
  }

  getRecommend(id: string) {
 this.http.get(`passport/recommend/${id}`)
          .subscribe((res: any) => {
            this.user = res.list.userModel;
            this.resume = res.list.resumeModel;
            this.company = res.list.companyUserModel;
            this.post = res.list.postModel;
            this.recommend = res.list;
          });
  }

  interview() {
    const obj: Object = {};
    obj['resumeId'] = this.resume.resumeId;
    obj['postId'] = this.post.postId;
    obj['companyId'] = this.company.companyId;
    this.http.post(`passport/delivery/register`, obj)
    .subscribe((item: any) => {
      if (item.msg === 'ok') {
        this.msg.success(item.msg + '邀请面试成功！');
        this.router.navigateByUrl(`company/inerview`) ;
      } else {
      this.msg.error('邀请面试失败!' + '/br' + item.msg);
      this.router.navigateByUrl(`company/inerview`) ;
    }
    });
  }

  return() {
    this.router.navigateByUrl(`company/employeeRecommendations`) ;
  }

}
