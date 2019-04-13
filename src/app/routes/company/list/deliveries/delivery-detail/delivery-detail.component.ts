import { Component, OnInit } from '@angular/core';
import { ResumeUser } from 'app/entity/resumeUser';
import { Resume } from 'app/entity/resume';
import { Post } from 'app/entity/post';
import { Company } from 'app/entity/company';
import { Delivery } from 'app/entity/delivery';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '@core/swal.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styles: []
})
export class DeliveryDetailComponent implements OnInit {
  private deliveryId: string; // 定义一个变量来接收路由传递过来的productId

  user: ResumeUser;
  resume: Resume;
  post: Post;
  company: Company;
  delivery: Delivery;


  constructor(
    private modal: NzModalService,
    private http: HttpClient, private routeInfo: ActivatedRoute,
    private msg: SwalService, private router: Router) { }

  ngOnInit() {
     // 通过参数快照去获取到id
     this.deliveryId = this.routeInfo.snapshot.params['id'];
     this.getDelivery(this.deliveryId);

     this.resume = new Resume();
      this.user = new ResumeUser();
      this.post = new Post();
      this.company = new Company();
      this.delivery = new Delivery();

  }

  getDelivery(id: string) {
      this.http.get(`passport/delivery/${id}`)
          .subscribe((res: any) => {
            this.user = res.list.userModel;
            this.resume = res.list.resumeModel;
            this.company = res.list.companyUserModel;
            this.post = res.list.postModel;
            this.delivery = res.list;
          });
  }

  return() {
    this.router.navigateByUrl(`company/deliveries`) ;
  }

  interview() {
    const obj: Object = {};
        obj['resumeId'] = this.delivery.resumeId;
        obj['postId'] = this.delivery.postId;
        obj['companyId'] = this.delivery.companyId;
    const obs: Object = {};
    obs['companyResponse'] = '1';
    this.http.post(`passport/interview/register`, obj)
              .subscribe((res: any) => {
                if (res.msg === 'ok') {
                  this.http.patch(`passport/delivery/${this.delivery.deliveryId}`, obs)
                  .subscribe((data: any) => {
                    if (data.msg === 'ok') {
                      this.msg.success('邀请面试成功！' + data.msg);
                      this.router.navigateByUrl(`company/deliveries`) ;
                    } else{
                      this.msg.success('邀请面试失败！' + res.msg);
                      this.getDelivery(this.deliveryId);
                    }
                  });
              } else{
                this.msg.success('邀请面试失败！' + res.msg);
                this.getDelivery(this.deliveryId);
              }
              });
  }

}
