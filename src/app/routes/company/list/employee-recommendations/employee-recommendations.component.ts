import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { Recommend } from 'app/entity/recommend';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SwalService } from '@core/swal.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-company-list-employee-recommendations',
  templateUrl: './employee-recommendations.component.html',
})
export class CompanyListEmployeeRecommendationsComponent implements OnInit {

  recommend: Recommend;
  rawData: any[];
  recommends: any[] = [];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;

  searchEnable: number;
  postId:string;

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

  editIsVisible = false;

  editForm: FormGroup;

  isEdit = false;

  addOrdEditLoading = false;

  constructor(
    private http: _HttpClient,
    private msg: SwalService,
    private client: HttpClient,
    private router: Router,
    private modal: NzModalService,
    private fb: FormBuilder) { }

     // 从查询参数里面去取改为从URL中去取，将原来的queryparams改为params
    ngOnInit() {
      this.editForm = this.fb.group({
        companyScore: [null]
      });

        this.getRecommend();
       }

       getRecommend(reset: boolean = false) {
        if (reset) {
          this.pageIndex = 1;
        }
        this.loading = true;

        this.http.get(`passport/company/recommend/${localStorage.getItem('uid')}`)
        .subscribe((item: any) => {
          this.loading = false;
          this.total = item.total;
          this.rawData = item.list.table;
          this.recommends = item.list.table;
        });
       }

       refreshStatus(): void {
        const allChecked = this.recommends.every(value => value.checked === true);
        const allUnChecked = this.recommends.every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        this.disabledButton = !this.recommends.some(value => value.checked);
        this.checkedNumber = this.recommends.filter(value => value.checked).length;
      }

      checkAll(value: boolean): void {
        this.recommends.forEach(data => {
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
        this.recommends = this.rawData; // 获得原始数据中的值
        this.sortName = sort.key;
        this.sortValue = sort.value;
        this.search();
      }

      updateFilter(searchEnable: number): void {
        this.recommends = this.rawData;
        this.searchEnable = searchEnable;
        this.search();
      }

      search(): void {
        /** filter data **/
        const filterFunc = item => (this.searchEnable ? item.recommendNumber == this.searchEnable : true);
        const data = this.recommends.filter(item => filterFunc(item));

        /** sort data **/
        if (this.sortName && this.sortValue) {
          this.recommends = data.sort((a, b) =>
           (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
        } else {
          this.recommends = data;
        }
      }

  // 通过id查询
  searchUseByrName(): void{
    const filterFunc = (item) => {
      return (item.recommendNumber.indexOf(this.searchValue) !== -1);
    };
    const data = this.recommends.filter(item => filterFunc(item));
    this.recommends = data.sort((a, b) =>
     (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
  }

  openDetail(recommend: any) {
    this.router.navigateByUrl(`company/recommendDetail/${recommend.recommendId}`) ;
  }

  openGrade(u?: any) {
    if (u != null || u != undefined) {
      this.isEdit = true;
      // 匹配表单的值
      this.editForm.patchValue(u);
      this.recommend = u;
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
          let id = this.recommend.recommendId;
          this.recommend = this.editForm.value;
          this.recommend.recommendId = id;
          this.client.patch(`passport/recommend/${this.recommend.recommendId}`, this.recommend).subscribe(
            (item: any) => {
              if (item.msg === 'ok') {
                this.msg.success('打分成功！' + item.msg);
                this.modal.closeAll();
                this.addOrdEditLoading = false;
                this.getRecommend(item.list.id);
              } else{
              this.msg.error('打分失败!' + '/br' + item.msg);
              this.modal.closeAll();
              this.addOrdEditLoading = false;
              this.getRecommend(item.list.id);
            }
            });
        }
      }
}
