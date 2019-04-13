import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Interview } from 'app/entity/interview';
import { Router } from '@angular/router';
import { SwalService } from '@core/swal.service';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
})
export class InterviewComponent implements OnInit {

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private modal: NzModalService,
    private msg: SwalService,
    private fb: FormBuilder,
    private client: HttpClient) {


}

rawData: any[];
interviews: any[] = [];
pageIndex = 1;
pageSize = 10;
total = 1;
loading = true;

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
// tslint:disable-next-line: member-ordering
searchEnable: number;
filterEnable = [
  {text: '参加', value: '1', byDefault: true},
  {text: '不参加', value: '2'},
  {text: '未回复', value: '0'},
];

editIsVisible = false;
  editForm: FormGroup;
  isEdit = false;
  addOrdEditLoading = false;
  interviewEdit: Interview;


ngOnInit() {
  if (localStorage.getItem('resumeid').length != 0) {
    this.getInterviews();
  }
  this.editForm = this.fb.group({
    userResponse: [null]
  });
}

refreshStatus(): void {
const allChecked = this.interviews.every(value => value.checked === true);
const allUnChecked = this.interviews.every(value => !value.checked);
this.allChecked = allChecked;
this.indeterminate = (!allChecked) && (!allUnChecked);
this.disabledButton = !this.interviews.some(value => value.checked);
this.checkedNumber = this.interviews.filter(value => value.checked).length;
}

checkAll(value: boolean): void {
this.interviews.forEach(data => {
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


// 获取数据
getInterviews(reset: boolean = false): void {
if (reset) {
this.pageIndex = 1;
}
this.loading = true;
this.client.get(`passport/resume/interview/${localStorage.getItem('resumeid')}`).subscribe((data: any) => {
this.loading = false;
this.total = data.total;
this.rawData = data.list.table;
this.interviews = data.list.table; // 初始化
});
}

sort(sort: { key: string, value: string }): void {
this.interviews = this.rawData; // 获得原始数据中的值
this.sortName = sort.key;
this.sortValue = sort.value;
this.search();
}

updateFilter(searchEnable: number): void {
this.interviews = this.rawData;
this.searchEnable = searchEnable;
this.search();
}

search(): void {
/** filter data **/
const filterFunc = item => (this.searchEnable ? item.userResponse == this.searchEnable : true);
const data = this.interviews.filter(item => filterFunc(item));

/** sort data **/
if (this.sortName && this.sortValue) {
this.interviews = data.sort((a, b) =>
(this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
} else {
this.interviews = data;
}
}


// 通过name查询
searchUseByrName(): void{
const filterFunc = (item) => {
return (item.userResponse.indexOf(this.searchValue) !== -1);
};
const data = this.interviews.filter(item => filterFunc(item));
this.interviews = data.sort((a, b) =>
(this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
}

openDetail(interviews: any) {
  this.router.navigateByUrl(`user/interviewDetail/${interviews.interviewId}`) ;
}

openGrade(u?: any) {
  if (u != null || u != undefined) {
    this.isEdit = true;
    // 匹配表单的值
    this.editForm.patchValue(u);
    this. interviewEdit = u;
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
        let id = this.interviewEdit.interviewId;
        this.interviewEdit = this.editForm.value;
        this.interviewEdit.interviewId = id;
        this.client.patch(`passport/interview/${this.interviewEdit.interviewId}`, this.interviewEdit).subscribe(
          (item: any) => {
            if (item.msg === 'ok') {
                this.msg.success('回复成功！' + item.msg);
                this.modal.closeAll();
                this.addOrdEditLoading = false;
                this.getInterviews();
            } else {
            this.msg.error('回复失败!' + '/br' + item.msg);
            this.modal.closeAll();
            this.addOrdEditLoading = false;
            this.getInterviews();
          }
          });
      }
    }

}
