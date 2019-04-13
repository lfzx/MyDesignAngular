import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import { _HttpClient} from '@delon/theme';
import { SwalService } from '@core/swal.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list-deliveries',
  templateUrl: './deliveries.component.html',
})
export class UserListDeliveriesComponent implements OnInit {

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private msg: SwalService,
    private client: HttpClient) {


}

rawData: any[];
deliveries: any[] = [];
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
  {text: '接收', value: '1', byDefault: true},
  {text: '退回', value: '2'},
  {text: '未回复', value: '0'},
];

ngOnInit() {
  if (localStorage.getItem('resumeid').length != 0) {
    this.getDeliveries();
  }
}

refreshStatus(): void {
const allChecked = this.deliveries.every(value => value.checked === true);
const allUnChecked = this.deliveries.every(value => !value.checked);
this.allChecked = allChecked;
this.indeterminate = (!allChecked) && (!allUnChecked);
this.disabledButton = !this.deliveries.some(value => value.checked);
this.checkedNumber = this.deliveries.filter(value => value.checked).length;
}

checkAll(value: boolean): void {
this.deliveries.forEach(data => {
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
getDeliveries(reset: boolean = false): void {
if (reset) {
this.pageIndex = 1;
}
this.loading = true;
this.client.get(`passport/resume/delivery/${localStorage.getItem('resumeid')}`).subscribe((data: any) => {
this.loading = false;
this.total = data.total;
this.rawData = data.list.table;
this.deliveries = data.list.table; // 初始化
});
}

sort(sort: { key: string, value: string }): void {
this.deliveries = this.rawData; // 获得原始数据中的值
this.sortName = sort.key;
this.sortValue = sort.value;
this.search();
}

updateFilter(searchEnable: number): void {
this.deliveries = this.rawData;
this.searchEnable = searchEnable;
this.search();
}

search(): void {
/** filter data **/
const filterFunc = item => (this.searchEnable ? item.deliveryUpdateTime == this.searchEnable : true);
const data = this.deliveries.filter(item => filterFunc(item));

/** sort data **/
if (this.sortName && this.sortValue) {
this.deliveries = data.sort((a, b) =>
(this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
} else {
this.deliveries = data;
}
}


// 删除单个数据
delete(delivery: any): void {
this.deliveries = this.deliveries.filter(h => h !== delivery);
this.client
.delete(`https://localhost:5001/api/passport/delivery/${delivery.deliveryId}`)
.subscribe((item: any) => {
if (item.msg === 'ok') {
this.msg.success(item.msg + '删除成功！');
this.getDeliveries();
} else {
this.msg.error('删除失败!' + '/br' + item.msg);
this.getDeliveries();
}
});
}


// 通过name查询
searchUseByrName(): void{
const filterFunc = (item) => {
return (item.resumeId.indexOf(this.searchValue) !== -1);
};
const data = this.deliveries.filter(item => filterFunc(item));
this.deliveries = data.sort((a, b) =>
(this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
}

openDetail(delivery: any) {
  this.router.navigateByUrl(`user/deliveryDetail/${delivery.deliveryId}`) ;
}

}
