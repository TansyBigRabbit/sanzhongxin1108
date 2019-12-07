<template>
<div>
<div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>综治中心系统</el-breadcrumb-item>
  <el-breadcrumb-item>综治系统统计</el-breadcrumb-item> 
  </el-breadcrumb>
</div>
<div style="margin-top: 20px"> 
	<el-card class="boxCard">
     <div v-loading="topLoading" class="topBox">
         <div>
             <div>学宣总次数：90</div>
             <div>学习总人数：90</div>
             <div>综治总人数：80</div>
         </div>
         <div  >
             <div>本月学宣总数：79</div>
             <div>本月学习总数：77</div>
             <div>本月综治总数：78</div>
         </div>
         <div>
             <div>本周学宣总数：89</div>
             <div>本周学习总数：77</div>
             <div>本周综治总数：67</div>
         </div>
     </div>   
    </el-card>
    <el-card class="boxCard" style="margin-top: 20px">
      <div> 
          <!-- 柱状图 -->
          <div class="dateBox">
           <el-select style="width: 120px;margin-right: 20px" v-model="form01.dateType" @change="selectChange('form01')">
              <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option> 
           </el-select>  
           <el-date-picker
              :editable="false"
              v-model="form01.startDate"
              :type="form01.dateType01"
              :placeholder="form01.datePlaceHolder01">
            </el-date-picker>
            <el-date-picker
              :editable="false" 
              v-model="form01.endDate"
              :type="form01.dateType01"
              :placeholder="form01.datePlaceHolder02">
            </el-date-picker>
            <el-button type="primary" @click="searchData">查询</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
        </div>
        <div class="flexBox_3"> 
        <div class="barBox" style="flex: 1">
            <div v-loading="barLoading" id="tabOneBar" style="width: 100%;height: 300px"></div>
        </div>
        <div class="pieBox" style="flex: 1">
            <div v-loading="pieLoading01" id="tabOnePie_1"></div> 
        </div> 
        </div>
         <div>
          <!-- 柱状图 -->
          <div class="dateBox">
           <el-select style="width: 120px;margin-right: 20px" v-model="form02.dateType" @change="selectChange('form02')">
              <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option> 
           </el-select>  
           <el-date-picker
              :editable="false"
              v-model="form02.startDate"
              :type="form02.dateType01"
              :placeholder="form02.datePlaceHolder01">
            </el-date-picker>
            <el-date-picker
              :editable="false" 
              v-model="form02.endDate"
              :type="form02.dateType01"
              :placeholder="form02.datePlaceHolder02">
            </el-date-picker>
            <el-button type="primary" @click="searchData">查询</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
        </div>
        <div class="flexBox_3"> 
        <div class="barBox" style="flex: 1">
            <div v-loading="barLoading" id="tabOneBar_2" style="width: 100%;height: 300px"></div>
        </div>
        <div class="pieBox" style="flex: 1">
            <div v-loading="pieLoading01" id="tabOnePie_2"></div> 
        </div> 
        </div>
        </div>
         <div>
          <!-- 柱状图 -->
          <div class="dateBox">
           <el-select style="width: 120px;margin-right: 20px" v-model="form03.dateType" @change="selectChange('form03')">
              <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option> 
           </el-select>  
           <el-date-picker
              :editable="false"
              v-model="form03.startDate"
              :type="form03.dateType01"
              :placeholder="form03.datePlaceHolder01">
            </el-date-picker>
            <el-date-picker
              :editable="false" 
              v-model="form03.endDate"
              :type="form03.dateType01"
              :placeholder="form03.datePlaceHolder02">
            </el-date-picker>
            <el-button type="primary" @click="searchData">查询</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
        </div>
        <div class="flexBox_3"> 
        <div class="barBox" style="flex: 1">
            <div v-loading="barLoading" id="tabOneBar_3" style="width: 100%;height: 300px"></div>
        </div>
        <div class="pieBox" style="flex: 1">
            <div v-loading="pieLoading01" id="tabOnePie_3"></div> 
        </div> 
        </div>
        </div>
      </div> 
    </el-card>
</div>
</div>
</template>
<script> 
    var that;
import echarts from '../../../echarts/echarts'
export default{
	data(){
		return{
         activeName:'first', 
         form01:{
            dateType:0, 
            dateType01:"date",//month year
           datePlaceHolder01:"选择查询开始日期",
           datePlaceHolder02:"选择查询结束日期",
         },
          form02:{
            dateType:0, 
            dateType01:"date",//month year
           datePlaceHolder01:"选择查询开始日期",
           datePlaceHolder02:"选择查询结束日期",
         },
          form03:{
            dateType:0, 
            dateType01:"date",//month year
           datePlaceHolder01:"选择查询开始日期",
           datePlaceHolder02:"选择查询结束日期",
         },
         options: [{
          value: 0,
          label: '按日查询'
        }, {
          value: 1,
          label: '按月查询', 
        }, {
          value: 2,
          label: '按年查询'
        }],
        //
        topLoading:true,
        pieLoading01:true,
        pieLoading02:true,
        barLoading:true,
        topData:{
         total:0,
         proportionProcessed:0,
         processedPercent:0,
         totalMonth:0,
         totalMonthProcessed:0,
         monthProcessedPercent:0,
         totalWeek:0,
         totalWeekProcessed:0,
         weekProcessedPercent:0
        },
		}
	},
	mounted(){
        that = this;
        that.getCurrentDate();
        that.getTopData(); 
	},
	methods:{
        //获取当前时间
        getCurrentDate(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        if(month<10){
            month = "0"+month
        }
        var day = date.getDate();
        if(day<10){
            day = "0"+day
        } 
        that.$set(that.form01,'startDate',year+"-"+month+"-"+day);
        that.$set(that.form01,'endDate',year+"-"+month+"-"+day);
        that.$set(that.form02,'startDate',year+"-"+month+"-"+day);
        that.$set(that.form02,'endDate',year+"-"+month+"-"+day);
        that.$set(that.form03,'startDate',year+"-"+month+"-"+day);
        that.$set(that.form03,'endDate',year+"-"+month+"-"+day);
        //
        that.getBarData();
        that.getTerminalData(); 
        },
        getTopData(){
           //1117
           that.topLoading = false;
         // that.$http.get(that.$ports.letterStatistics.topData,{}).then(res=>{
         //    console.log(res);
         //    if(res.data.code==0){
         //        var data = res.data.data;
         //        that.topData = data;
         //      if(data.total!=0){
         //        that.topData.processedPercent = ((data.proportionProcessed/data.total)*100).toFixed(2);
         //      }
         //      if(data.totalMonth!=0){
         //        that.topData.monthProcessedPercent = ((data.totalMonthProcessed/data.totalMonth)*100).toFixed(2);
         //      }
         //      if(data.totalWeek!=0){
         //        that.topData.weekProcessedPercent = ((data.totalWeekProcessed/data.totalWeek)*100).toFixed(2);
         //      }
         //      that.topLoading = false;
         //    }else{
         //        that.$message.error("数据获取失败");
         //        that.topLoading = false;
         //        return
         //    }
         // });
        },
        getBarData(){
          that.getTabOneBar({},'tabOneBar','学宣数柱状图');
          that.getTabOneBar({},'tabOneBar_2','学习人数柱状图');
          that.getTabOneBar({},'tabOneBar_3','综治数柱状图');
          that.barLoading = false;
         // that.$http.get(that.$ports.letterStatistics.barData,that.form).then(res=>{
         //    console.log(res);
         //    if(res.data.code==0){
         //      that.getTabOneBar(res.data.data);
         //      that.barLoading = false;
         //    }else{
         //       that.$message.error(res.data.msg);
         //        that.barLoading = false;
         //        return
         //    }
         // });
        },
        getTerminalData(){
          that.getTabOnePie_1({},'tabOnePie_1','学宣终端占比');
          that.getTabOnePie_1({},'tabOnePie_2','学习终端占比');
          that.getTabOnePie_1({},'tabOnePie_3','综治终端占比');
            that.pieLoading01 = false;
         // that.$http.get(that.$ports.letterStatistics.terminalData,that.form).then(res=>{
         //    console.log(res);
         //    if(res.data.code==0){
         //    that.getTabOnePie_1(res.data.data);
         //    that.pieLoading01 = false;
         //    }else{
         //        that.$message.error(res.data.msg);
         //        that.pieLoading01 = false;
         //        return
         //    }
         // });
        }, 
		getTabOneBar(data,id,name){
        let myChart01 = echarts.init(document.getElementById(id));
        // 绘制图表
        myChart01.setOption({
            title: { text: name },
            tooltip: {},
            xAxis: {
               //1117
               // data: data.date
               data:['2018-10-12','2018-10-13','2018-10-14','2018-10-15',]
            },
            yAxis: {},
            series: [{
                itemStyle:{
                normal:{
                  color:'#1890F5'
                  }
                },
                name: '信访数',
                type: 'bar',
                //1117
                //data: data.data
                 data:['12','13','15','7']
            }]
        });
		},
		//总次数与本月次数
		getTabOnePie_1(data,id,name){
        var pieData = [];
        // for(let i=0;i<data.date.length;i++){
        // var obj ={};
        // obj.name = data.date[i];
        // obj.value = data.data[i];
        // pieData.push(obj);
        // }
        let myPie01 = echarts.init(document.getElementById(id));
        myPie01.setOption({
        title : {
            text: name,
           // subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
        orient: 'vertical',
        x: 'left',
        //1117data: data.date, 
        data:['2018-12-17','2018-12-18']
    },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
               //1117 data:pieData,
               data:[{
                date:'2018-10-12',
                value:20
               },{
                date:'2018-10-13',
                value:27
               }],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
});
		},   
		handleClick(tab, event) {
        console.log(tab, event);
       },
        //select改变触发事件
        selectChange(name){
            if(that[name].dateType==0){
                console.log("日");
                that[name].dateType01 = "date";
                that[name].datePlaceHolder01 = "选择查询开始日期";
                that[name].datePlaceHolder01 = "选择查询结束日期";
            }else if(that[name].dateType==1){
                console.log("月");
                that[name].dateType01 = "month";
                that[name].datePlaceHolder01 = "选择查询开始月份";
                that[name].datePlaceHolder01 = "选择查询结束月份";
            }else{
                console.log("年");
                that[name].dateType01 = "year";
                that[name].datePlaceHolder01 = "选择查询开始年份";
                that[name].datePlaceHolder01 = "选择查询结束年份";
            }
        },
        //查询
        searchData(){
        if(that.form.startDate==null){
            that.$message.error("请选择开始时间");
            return
        }
        if(that.form.endDate==null){
            that.$message.error("请选择结束时间");
            return
        }
        that.getBarData();
        that.getTypeData();
        that.getTerminalData();
        },
        //重置
        resetForm(){
            that.form={
                dateType:0
            }
        }
	}
}
</script>
<style>
	.topBox{
     display: flex;
     flex-wrap: wrap;
     width:80%;
     margin: 0 auto;
     justify-content: space-between;
    }
    .topBox>div>div{
        padding: 5px 0;
    }
    .barBox{
        margin: 20px 0
    }
    #tabOneBar{
        width: 80%; 
        height: 500px
    }
    .pieBox>div{
        height: 300px;
        width: 100%;
    }
    .flexBox_3{
      display: flex;
      justify-content: space-between;
    } 
</style>