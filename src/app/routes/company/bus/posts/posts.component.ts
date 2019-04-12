import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { PostCompany } from 'app/entity/postCompany';
import { Post } from 'app/entity/post';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SwalService } from '@core/swal.service';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-bus-posts',
  templateUrl: './posts.component.html',
})
export class CompanyBusPostsComponent implements OnInit {

  isShow = false;
  post: Post;

  rawData: any[];
  posts: any[] = [];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;
  searchEnable: number;

  resetId: string;

  searchValue = '';
  // checkBox
  checkbox = true;
  allChecked = false;
  indeterminate = false;
  checkedNumber = 0;
  disabledButton = true;

  // 排序
  // tslint:disable-next-line: member-ordering
  sortValue = null;
  sortName = null;

  constructor(
    private http: _HttpClient,
    private msg: SwalService,
    private client: HttpClient,
    private router: Router) { }

     // 从查询参数里面去取改为从URL中去取，将原来的queryparams改为params
    ngOnInit() {
      this.post = new Post();
      if (localStorage.getItem('uid').length != 0) {
        this.isShow = true;
        this.getPost(localStorage.getItem('uid'));
        this.resetId = localStorage.getItem('uid');
      }
       }

       getPost(id: string, reset: boolean = false) {
        if (reset) {
          this.pageIndex = 1;
        }
        this.loading = true;
        this.http.get(`passport/company/post/${id}`)
        .subscribe((item: any) => {
          this.loading = false;
          this.total = item.total;
          this.rawData = item.list.table;
          this.posts = item.list.table;
        });
       }

       refreshStatus(): void {
        const allChecked = this.posts.every(value => value.checked === true);
        const allUnChecked = this.posts.every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        this.disabledButton = !this.posts.some(value => value.checked);
        this.checkedNumber = this.posts.filter(value => value.checked).length;
      }

      checkAll(value: boolean): void {
        this.posts.forEach(data => {
          if (!data.disabled) {
            data.checked = value;
          }
        });
        this.refreshStatus();
      }

      clearCheck() {
        this.checkedNumber = 0;
        this.allChecked = false;
        this.indeterminate = false;
        this.disabledButton = true;
      }

      sort(sort: { key: string, value: string }): void {
        this.posts = this.rawData; // 获得原始数据中的值
        this.sortName = sort.key;
        this.sortValue = sort.value;
        this.search();
      }

      updateFilter(searchEnable: number): void {
        this.posts = this.rawData;
        this.searchEnable = searchEnable;
        this.search();
      }

      search(): void {
        /** filter data **/
        const filterFunc = item => (this.searchEnable ? item.isEnable == this.searchEnable : true);
        const data = this.posts.filter(item => filterFunc(item));

        /** sort data **/
        if (this.sortName && this.sortValue) {
          this.posts = data.sort((a, b) =>
           (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
        } else {
          this.posts = data;
        }
      }


       // 删除单个数据
  delete(post: any): void {
    this.posts = this.posts.filter(h => h !== post);
    this.client
      .delete(`https://localhost:5001/api/passport/posts/${post.postId}`)
      .subscribe((item: any) =>{
        if (item.msg == 'ok') {
          this.msg.success(item.msg + '删除成功！');
          this.getPost(localStorage.getItem('uid'));
        } else {
        this.msg.error('删除失败!' + '/br' + item.msg);
        this.getPost(localStorage.getItem('uid'));
      }
    });
  }

  // 通过name查询
  searchUseByrName(): void{
    const filterFunc = (item) => {
      return (item.postName.indexOf(this.searchValue) !== -1);
    };
    const data = this.posts.filter(item => filterFunc(item));
    this.posts = data.sort((a, b) =>
     (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
  }

  openEdit(post: any) {
    this.router.navigateByUrl(`company/postDetail/${post.postId}`) ;
  }

}

