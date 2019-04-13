import { Component, OnInit } from '@angular/core';
import { ResumeUser } from 'app/entity/resumeUser';
import { Resume } from 'app/entity/resume';
import { Post } from 'app/entity/post';
import { Company } from 'app/entity/company';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '@core/swal.service';
import { Delivery } from 'app/entity/delivery';

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


  constructor(private http: HttpClient, private routeInfo: ActivatedRoute,
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
    this.router.navigateByUrl(`user/deliveries`) ;
  }

}
