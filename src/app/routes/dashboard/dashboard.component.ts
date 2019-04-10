import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { HttpClient } from '@angular/common/http';

declare const echarts: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {

  optionsFirst: {};
  optionsSecond: {};

  constructor(private http: HttpClient) {
  }


  ngOnInit() {
    this.testPie();
  }

  testPie(){
    this.optionsFirst = {
      backgroundColor: new echarts.graphic['RadialGradient'](0.3, 0.3, 0.8, [{
        offset: 0,
        color: '#f7f8fa'
      }, {
        offset: 1,
        color: '#cdd0d5'
      }]),

      tooltip : {
        trigger: 'axis'
      },

      xAxis : [
        {
          boundaryGap : false,
          data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis : [
        {
          splitLine: {
            show: false
          },
          axisLine: {
            show: true
          },
          splitArea: {
            show: false
          },
          type : 'value',
          name: '风险指数',
        }
      ],
      dataZoom: [{
        startValue: '周一'
      }, {
        type: 'inside'
      }],
      visualMap: {
        top: 1,
        right: 10,
        type: 'piecewise', // continuous连续，piecewise分段
        inverse: false, // 是否反转
        align: 'left', // 指定组件中图形（比如小方块）和文字的摆放关系
        orient: 'horizontal', // 水平（'horizontal'）或者竖直（'vertical'）
        itemGap: 20, // 两个图元之间的间隔距离
        controller: {
          outOfRange: {
            symbol: 'rect',
          }
        },
        textGap: 5,
        formatter: function(value) {
          if (value < 20) {
            return '五级预警(2.0)'; // 范围标签显示内容
          }
          if (value < 30) {
            return '四级预警(4.0)';
          }
          if (value < 40) {
            return '三级预警(6.0)';
          }
          if (value < 50) {
            return '二级预警(8.0)';
          } else {
            return '一级预警(10.0)';
          }
        },
        textStyle: {
          color: '#94969c',
          fontStyle: 'normal',
          fontFamily: '微软雅黑',
          fontSize: 24,
        },
        itemWidth: 20,
        itemHeight: 16,
        pieces: [{
          gt: 0,
          lte: 20,
          color: '#0084ff',
        }, {
          gt: 20,
          lte: 30,
          color: '#824ae4'
        }, {
          gt: 30,
          lte: 40,
          color: '#ff2ad9'
        }, {
          gt: 40,
          lte: 50,
          color: '#ef0e55'
        }, {
          gt: 50,
          color: '#d70000'
        }],
        outOfRange: {
          color: '#00d67f'
        },
      },
      series : [
        {
          name: '预警',
          type: 'line',
          stack: '总量',
          areaStyle: { // 区域填充样式。
            normal: {
              opacity: 0.5,
              pieces: [{
                gt: 0,
                lte: 20,
                color: '#0084ff',
              }, {
                gt: 20,
                lte: 30,
                color: '#824ae4'
              }, {
                gt: 30,
                lte: 40,
                color: '#ff2ad9'
              }, {
                gt: 40,
                lte: 50,
                color: '#ef0e55'
              }, {
                gt: 50,
                color: '#d70000'
              }],
              outOfRange: {
                color: '#00d67f'
              },
            }
          },
          data: [10, 20, 13, 45, 25, 37, 60]
        }
      ]
    };

    this.optionsSecond = {
      grid: [{
        y: '50%',
        width: '90%',
        height: '45%'
      } ],
      tooltip : {
        trigger: 'axis',
        formatter: '{b}<br> {a}: {c}'
      },
      legend: {
        x: '55%',
        data: ['2018-01-04', '2018-01-05', '2018-01-06', '2018-01-07']
      },
      xAxis: {
        data: ['2018-01-04', '2018-01-05', '2018-01-06', '2018-01-07']
      },
      yAxis: {name: '次数'},
      series: [
        {
          name: '告警次数',
          type: 'bar',
          barWidth: '45%',
          barGap: '-100%',
          data: [5, 20, 15, 10, ],
          itemStyle: {
            normal: {
              color: '#005fa6'
            }
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: '{a}: {c}次'
            }
          },
        },
        {
          name: '',
          type: 'bar',
          barWidth: '45%',
          data: [4, 19, 14, 9],
          itemStyle: {
            normal: {
              color: '#dbf0fc'
            },
            emphasis: {
              color: '#dbf0fc'
            }
          }
        },
        {
          name: '告警',
          type: 'pie',
          tooltip : {
            formatter: '{b}<br> {a}: {c}'
          },
          radius : '40%',
          center: ['25%', '24%'],
          data: [
            {value: 5, name: '2018-01-04', itemStyle: {color: '#86c9f4'}},
            {value: 20, name: '2018-01-05', itemStyle: {color: '#005fa6'}},
            {value: 15, name: '2018-01-06', itemStyle: {color: '#3a91d2'}},
            {value: 10, name: '2018-01-07', itemStyle: {color: '#4da8ec'}},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

  }

}
