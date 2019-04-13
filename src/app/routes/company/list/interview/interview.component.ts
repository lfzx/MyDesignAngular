import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SwalService } from '@core/swal.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styles: []
})
export class InterviewComponent implements OnInit {

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private msg: SwalService,
    private client: HttpClient) {


}

rawData: any[];
interview: any[] = [];
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

ngOnInit() {
  if (localStorage.getItem('uid').length != 0) {
    this.getInterview();
  }
}

refreshStatus(): void {
const allChecked = this.interview.every(value => value.checked === true);
const allUnChecked = this.interview.every(value => !value.checked);
this.allChecked = allChecked;
this.indeterminate = (!allChecked) && (!allUnChecked);
this.disabledButton = !this.interview.some(value => value.checked);
this.checkedNumber = this.interview.filter(value => value.checked).length;
}

checkAll(value: boolean): void {
this.interview.forEach(data => {
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
getInterview(reset: boolean = false): void {
if (reset) {
this.pageIndex = 1;
}
this.loading = true;
this.client.get(`passport/company/interview/${localStorage.getItem('uid')}`).subscribe((data: any) => {
this.loading = false;
this.total = data.total;
this.rawData = data.list.table;
this.interview = data.list.table; // 初始化
});
}

sort(sort: { key: string, value: string }): void {
this.interview = this.rawData; // 获得原始数据中的值
this.sortName = sort.key;
this.sortValue = sort.value;
this.search();
}

updateFilter(searchEnable: number): void {
this.interview = this.rawData;
this.searchEnable = searchEnable;
this.search();
}

search(): void {
/** filter data **/
const filterFunc = item => (this.searchEnable ? item.deliveryUpdateTime == this.searchEnable : true);
const data = this.interview.filter(item => filterFunc(item));

/** sort data **/
if (this.sortName && this.sortValue) {
this.interview = data.sort((a, b) =>
(this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
} else {
this.interview = data;
}
}


// 删除单个数据
delete(interview: any): void {
this.interview = this.interview.filter(h => h !== interview);
this.client
.delete(`https://localhost:5001/api/passport/interview/${interview.interviewId}`)
.subscribe((item: any) => {
if (item.msg === 'ok') {
this.msg.success(item.msg + '删除成功！');
this.getInterview();
} else {
this.msg.error('删除失败!' + '/br' + item.msg);
this.getInterview();
}
});
}


// 通过name查询
searchUseByrName(): void{
const filterFunc = (item) => {
return (item.userResponse.indexOf(this.searchValue) !== -1);
};
const data = this.interview.filter(item => filterFunc(item));
this.interview = data.sort((a, b) =>
(this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
}

openDetail(interview: any) {
  this.router.navigateByUrl(`company/interviewDetail/${interview.interviewId}`) ;
}

}

