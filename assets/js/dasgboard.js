// 制作饼形图
// 封装函数
function setpie(arr){
    let mychart = echarts.init(document.querySelector('.pie'))
let option = {
    // 图例组件删除
    // 工具栏删除
    title:{
      text:"籍贯 Hometown",
      textStyle:{
        color:"#6d767e"
      }
      
    },
    // 提示框组件
    tooltip:{
        formatter: '{a}: {b}<br />人数{c},百分比 {d}%'
      
    },
      series: [
        {
          name: '各地人员分布',
          type: 'pie',
          // 圆形半径
          radius: ["10%", "60%"],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 9
          },
          // data: [
          //   { value: 50, name: '湖北省' },
          //   { value: 38, name: '湖南省' },
          //   { value: 32, name: '河北省 ' },
          //   { value: 30, name: '河南省' },
          //   { value: 28, name: '广东省' },
          //   { value: 26, name: '广西省' },
          //   { value: 22, name: '海南省' },
          //   { value: 18, name: '四川省' }
          // ]
          data: arr
        }
      ]
    };

mychart.setOption(option)

}
// 调用饼行图函数
// setpie()


// 制作折线图
// 封装函数
function setline(obj){
  let mychart = echarts.init(document.querySelector('.line'))
   
    // 删除data数据
  let  option = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    }
  },
  title: {
    left: 'left',
    text: '薪资 Salary'
  },
// 删除工具栏，增加图例组件
legend:{
  top:20,
},

  xAxis: {
    type: 'category',     //类别
    boundaryGap: false,   //两侧留白
    // data: ["张三","李四","王五","老李","小谢","小满",]
    data:obj.name
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '50%'] //y轴留白,影响到最大值最小值
  },
  //播放组件
  dataZoom: [
    {
      //inside鼠标滚轮实现缩放，slider通过滑动条实现缩放
      type: 'inside',
      start: 0, //起始位置
      end: 100 //结束位置
    },
    {
      start: 0,
      end: 10
    }
  ],
  series: [
    {
      name: '期望薪资',
      type: 'line',
      symbol: 'none',
      smooth:true, //转折点是否平滑
      sampling: 'lttb',
      itemStyle: {
        color: 'rgb(255, 70, 131)'
      },
     
      // data: ["8888","9999","12000","15000","18000","14000",]
      data:obj.salary
    },
    {
      name: ' 实际薪资',
      type: 'line',
      symbol: 'none',
         smooth:true, //转折点是否平滑
      sampling: 'lttb',
      itemStyle: {
        color: 'blue'
      },
     
      // data: ["9000","8000","10000","14000","16000","15000",]
      data:obj.truesalary
    },
    
  ]
  
  
};

  mychart.setOption(option)
}
// 调用折线图
// setline()


// 制作柱形图封装函数
function setbar (obj){
  let mychart = echarts.init(document.querySelector('.barChart'))
  let option = {
    grid: {
      top: 30, bottom: 30, left: '7%', right: '7%'
  },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
   //删除工具栏
    legend: {
      // data: ['Evaporation', '分数', 'Temperature']
    },
    xAxis: [
      {
        type: 'category',
        data: obj.group,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '分数',
        min: 0,
        max: 100,
        interval: 10,
        axisLabel: {
          formatter: '{value} 分'
        }
      },
      {
        type: 'value',
        name: '人数',
        min: 0,
        max: 10,
        interval: 1,
        axisLabel: {
          formatter: '{value} 人'
        }
      }
    ],
    series: [
      {
        name: '平均分',
        type: 'bar',
        yAxisIndex: 0,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 分';
          }
        },
        data: obj.avgScore
      },
      {
        name: '低于60分人数',
        type: 'bar',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 人';
          }
        },
        data: obj.lt60
      },
       {
        name: '60到80分之间',
        type: 'bar',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 人';
          }
        },
        data: obj.gt60
      },
       {
        name: '高于80分人数',
        type: 'bar',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 人';
          }
        },
        data:obj.gt80
      },
      
    ]
  };

  mychart.setOption(option)
}
// 调用柱形图
// setbar()



function setMap(a,b) {
  let myChart = echarts.init(document.querySelector('.map'));
  // 位置 + 经纬度
  var chinaGeoCoordMap = a
      
  // var chinaDatas = [
  //     [
  //         {
  //             "name": "海拉尔区",
  //             "value": 0
  //         }
  //     ],
  //     [
  //         {
  //             "name": "市中区",
  //             "value": 0
  //         }
  //     ],
  // ];
  var chinaDatas = b

  var convertData = function (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = chinaGeoCoordMap[dataItem[0].name];
          var toCoord = [116.4551, 40.2539]; // 目标点经纬度（北京顺义校区）
          if (fromCoord && toCoord) {
              res.push([{
                  coord: fromCoord,
                  value: dataItem[0].value
              }, {
                  coord: toCoord,
              }]);
          }
      }
      return res;
  };
  var series = [];
  [['顺义校区', chinaDatas]].forEach(function (item, i) {
      series.push({
          type: 'lines',
          zlevel: 2,
          effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', //箭头图标
              symbolSize: 5, //图标大小
          },
          lineStyle: {
              normal: {
                  width: 1, //尾迹线条宽度
                  opacity: 1, //尾迹线条透明度
                  curveness: 0.2 //尾迹线条曲直度
              }
          },
          data: convertData(item[1])
      }, {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: { //涟漪特效
                  period: 4, //动画时间，值越小速度越快
                  brushType: 'stroke', //波纹绘制方式 stroke, fill
                  scale: 4 //波纹圆环最大限制，值越大波纹越大
              },
              label: {
                  normal: {
                      show: true,
                      position: 'right', //显示位置
                      offset: [5, 0], //偏移设置
                      formatter: function (params) {//圆环显示文字
                          return params.data.name;
                      },
                      fontSize: 12
                  },
                  emphasis: {
                      show: true
                  }
              },
              symbol: 'circle',
              symbolSize: function (val) {
                  return 4 + val[2] * 5; //圆环大小
              },
              itemStyle: {
                  normal: {
                      show: false,
                      color: '#f00'
                  }
              },
              data: item[1].map(function (dataItem) {
                  return {
                      name: dataItem[0].name,
                      value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                  };
              }),
          },
          //被攻击点
          {
              type: 'scatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: {
                  period: 4,
                  brushType: 'stroke',
                  scale: 4
              },
              label: {
                  normal: {
                      show: true,
                      position: 'right',
                      offset: [5, 0],
                      color: '#9eca7f', // 目标点文字颜色
                      formatter: '{b}',
                      textStyle: {
                          color: "#9eca7f"
                      }
                  },
                  emphasis: {
                      show: true,
                      color: "#f60", // 目标点鼠标移入的颜色
                  }
              },
              symbol: 'pin',
              symbolSize: 50,
              data: [{
                  name: item[0],
                  value: chinaGeoCoordMap[item[0]].concat([10]),
              }],
          }
      );
  });

  let option = {
      title: {
          text: '来京路线 From',
          textStyle: {
              color: '#6d767e'
          }
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(166, 200, 76, 0.82)',
        // borderColor: '#FFFFCC',
        showDelay: 0,
        hideDelay: 0,
        enterable: true,
        transitionDuration: 0,
        extraCssText: 'z-index:100',
        formatter: function (params, ticket, callback) {
          //根据业务自己拓展要显示的内容
          var res = "";
          var name = params.name;
          var value = params.value[params.seriesIndex + 1];
          res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
          return res;
        }
      },
      backgroundColor: "#013954",
      visualMap: { //图例值控制
        min: 0,
        max: 1,
        calculable: true,
        show: false,
        color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
        textStyle: {
          color: '#fff'
        }
      },
      geo: {
          map: 'china',
          zoom: 1.2,
          label: {
              emphasis: {
                  show: false
              }
          },
          roam: true, //是否允许缩放
          itemStyle: {
              normal: {
                  // color: 'rgba(51, 69, 89, .5)', //地图背景色
                  // color: '#5a6fc0', //地图背景色
                  // borderColor: '#516a89', //省市边界线00fcff 516a89
                  borderWidth: 1
              },
              emphasis: {
                  color: 'rgba(37, 43, 61, .5)' //悬浮背景
              }
          }
      },
      series: series
  };
  myChart.setOption(option);
}
// setMap();

// 需求1.班级概况
axios({
  url:'/student/overview',
  method:'get',
}).then(res=>{
  //成功回调
  // console.log(res)
  if(res.data.code==0){
    document.querySelector('.total').innerHTML=res.data.data.total
    document.querySelector('.avgSalary').innerHTML=res.data.data.avgSalary
    document.querySelector('.avgAge').innerHTML=res.data.data.avgAge
    document.querySelector('.proportion').innerHTML=res.data.data.proportion
  }
})

// 需求2点击按钮显示隐藏成绩区域
let btn = document.querySelector('.bar .btn')
let ul = document.querySelector('.bar ul')
btn.onclick = function () {
  if(ul.style.display == 'none'){
    ul.style.display = 'block'

  }
  else{
    ul.style.display = 'none'
  }
}

// 需求3获取a标签，绑定点击事件
let as = ul.querySelectorAll('a')
// 转换数组Array.from（as）
for (let i = 0; i < as.length; i++) {
  as[i].onclick = function(){
    axios({
      url:'/score/batch',
      method:'get',
      params: { batch:i+1}
    }).then(res=>{
      //成功回调
      // console.log(res)
      if(res.data.code==0){
        setbar(res.data.data)
      }
    })
  } 
  
}
as[0].onclick()


// 需求四完成折线图，饼图地图的数据渲染，三个图一个路径
axios({
  url:'/student/list',
  method:'get',
}).then(({data:res})=>{
  //成功回调
  console.log(res)
  if(res.code==0){
    // 1.折线图需要获取数据，遍历res
    let lineData={
      name:[],
      salary:[],
      truesalary:[],
    }
    // 饼图
    let pieData=[];
    // 地图
    let mapData1 = {'顺义校区': [
      116.4551,
      40.2539
  ]}
  let mapData2 =[]

  
    // 循环遍历，写到if循环里面，三个都要用到
    res.data.forEach(ele=>{
      lineData.name.push(ele.name)
      lineData.salary.push(ele.salary)
      lineData.truesalary.push(ele.truesalary)
      // 进行饼图判断
      let index = pieData.findIndex(item=>item.name==ele.province)
      if(index == -1){
        pieData.push({value:1,name:ele.province})
      }
      else{
        pieData[index].value++
      }
      // 进行地图的判断
       mapData1[ele.county]=[ele.jing,ele.wei]
      //  地图
      let i = mapData2.findIndex(item=>item[0].name==ele.county)
      if(i==-1){
        mapData2.push([{name:ele.county,value:1}])
      }
      else{
        mapData2[i][0].value++
      }
    })
    // 进行渲染
    setline(lineData)
    setpie(pieData)
    setMap(mapData1,mapData2)
    
  }
})





