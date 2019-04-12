import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { SwalService } from '@core/swal.service';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'app/entity/post';
import { PostCompany } from 'app/entity/postCompany';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styles: []
})
export class PostDetailComponent implements OnInit {

  private postId: number; // 定义一个变量来接收路由传递过来的productId

  post: Post;
  company: PostCompany;

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

       // 通过参数快照去获取到id
       this.postId = this.routeInfo.snapshot.params['id'];
       console.log(this.postId);

       this.getPost(this.postId);

      this.post = new Post();
      this.company = new PostCompany();

      this.editForm = this.fb.group({
        postName: [null, [Validators.required]],
        postWorkPlace: [null, [Validators.required]],
        postJobType: [null, [Validators.required]],
        academicRequirements: [null, [Validators.required]],
        postExperience: [null, [Validators.required]],
        postEmail: [null, [Validators.required]],
        postSalary: [null, [Validators.required]],
        numberOfRecruits: [null, [Validators.required]],
        postTelephoneNumber: [null, [Validators.required]],
        postDescription: [null, [Validators.required]],
        city: [null]
      });
       }

       getPost(id: number) {
        this.http.get(`passport/posts/${id}`)
        .subscribe((item: any) => {
          this.post = item.list;
          this.company = item.list.company;
        });
       }

       // 打开添加弹出框
  openEdit(u?: any) {

    if (u != null || u != undefined) {
      this.isEdit = true;
      // 匹配表单的值
      this.editForm.patchValue(u);
      this.post = u;
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
          let id = this.post.postId;
          this.post = this.editForm.value;
          this.post.postId = id;
          this.client.put(`passport/posts/${this.post.postId}`, this.post).subscribe(
            (item: any) => {
              if (item.msg === 'ok') {
                this.msg.success('编辑成功！' + item.msg);
                this.modal.closeAll();
                this.addOrdEditLoading = false;
                this.getPost(item.id);
              } else{
              this.msg.error('编辑失败!' + '/br' + item.msg);
              this.modal.closeAll();
              this.addOrdEditLoading = false;
              this.getPost(item.id);
            }
            });
        }
      }

}
